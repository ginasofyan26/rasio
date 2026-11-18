import {
  INITIAL_BUDGET,
  PRODUCT_CATEGORIES,
  PRODUCT_OFFERS,
  getCategoryById,
  getOffersByCategory,
  getProductById,
} from '../data/products';
import type {
  BadgeId,
  CartItem,
  CategoryEvaluation,
  DifficultyLevel,
  EfficiencyStatus,
  MissionRequirement,
  OfferEvaluation,
  ProductCategory,
  ProductOffer,
  ScoreReport,
} from '../types';
import { formatNumber, formatRupiah } from './format';

/**
 * ============================================================================
 * LOGIKA PENILAIAN & PERHITUNGAN RASIO (FUNGSI MURNI)
 * ============================================================================
 * Seluruh fungsi di file ini bersifat murni (pure functions) dan menggunakan
 * pembulatan bilangan bulat pada perhitungan uang untuk menghindari galat
 * floating-point JavaScript.
 */

/**
 * Menghitung harga satuan ternormalisasi (bilangan bulat Rupiah) untuk satu penawaran.
 * Contoh:
 * - Biskuit Rp9.000 isi 10 biji (divisor 1) -> (9000 * 1) / 10 = Rp900 / biji
 * - Air Mineral Rp3.000 isi 600 ml (divisor 1000) -> (3000 * 1000) / 600 = Rp5.000 / liter
 * - Sabun Rp9.600 isi 240 g (divisor 100) -> (9600 * 100) / 240 = Rp4.000 / 100 g
 */
export function calculateUnitPrice(
  price: number,
  contentAmount: number,
  unitDivisor: number
): number {
  if (contentAmount <= 0) return 0;
  return Math.round((price * unitDivisor) / contentAmount);
}

/**
 * Membuat teks rumus perhitungan rasio yang mudah dipahami siswa kelas 6 SD.
 */
export function buildFormulaText(
  product: ProductOffer,
  category: ProductCategory
): string {
  const unitPrice = calculateUnitPrice(
    product.price,
    product.contentAmount,
    category.unitDivisor
  );
  const normalizedQty = product.contentAmount / category.unitDivisor;

  if (category.unitDivisor === 1) {
    return `${formatRupiah(product.price)} ÷ ${formatNumber(
      normalizedQty
    )} ${category.normalizedUnitLabel} = ${formatRupiah(unitPrice)} / ${
      category.normalizedUnitLabel
    }`;
  }

  if (category.unitDivisor === 1000) {
    return `${formatRupiah(product.price)} ÷ ${formatNumber(
      normalizedQty
    )} ${category.normalizedUnitLabel} = ${formatRupiah(unitPrice)} / ${
      category.normalizedUnitLabel
    }`;
  }

  // Untuk normalisasi per 100 g / 100 ml
  return `${formatRupiah(product.price)} ÷ ${formatNumber(
    normalizedQty
  )} (×${category.normalizedUnitLabel}) = ${formatRupiah(unitPrice)} / ${
    category.normalizedUnitLabel
  }`;
}

/**
 * Menentukan penawaran dengan harga satuan paling murah pada suatu kategori.
 */
export function findCheapestOffer(
  category: ProductCategory,
  offers: ProductOffer[] = getOffersByCategory(category.id)
): { offer: ProductOffer; unitPrice: number } {
  let cheapest = offers[0];
  let lowestPrice = calculateUnitPrice(
    cheapest.price,
    cheapest.contentAmount,
    category.unitDivisor
  );

  for (const offer of offers) {
    const unitPrice = calculateUnitPrice(
      offer.price,
      offer.contentAmount,
      category.unitDivisor
    );
    if (
      unitPrice < lowestPrice ||
      (unitPrice === lowestPrice && offer.price < cheapest.price)
    ) {
      cheapest = offer;
      lowestPrice = unitPrice;
    }
  }

  return { offer: cheapest, unitPrice: lowestPrice };
}

/**
 * Menghitung biaya optimal minimum (bilangan bulat Rupiah) untuk memenuhi target
 * satu kategori menggunakan opsi dengan harga satuan termurah.
 */
export function calculateOptimalCategoryCost(
  category: ProductCategory,
  targetAmount: number
): number {
  const { offer: cheapestOffer } = findCheapestOffer(category);
  const packsNeeded = Math.ceil(targetAmount / cheapestOffer.contentAmount);
  return packsNeeded * cheapestOffer.price;
}

/**
 * Mengacak daftar kebutuhan belanja (misi) sesuai tingkat kesulitan sambil
 * memastikan total biaya optimal tetap wajar terhadap modal Rp300.000.
 */
export function generateMission(
  difficulty: DifficultyLevel,
  randomFn: () => number = Math.random
): MissionRequirement[] {
  const targetCount =
    difficulty === 'mudah' ? 4 : difficulty === 'sedang' ? 5 : 6;
  const maxOptimalBudget =
    difficulty === 'mudah' ? 185000 : difficulty === 'sedang' ? 215000 : 240000;

  // Prioritaskan kategori yang sesuai tingkat kesulitan namun tetap bervariasi
  const primaryPool =
    difficulty === 'mudah'
      ? PRODUCT_CATEGORIES.filter((c) => c.difficultyTier !== 'sulit')
      : difficulty === 'sedang'
      ? PRODUCT_CATEGORIES
      : [
          ...PRODUCT_CATEGORIES.filter((c) => c.difficultyTier !== 'mudah'),
          ...PRODUCT_CATEGORIES.filter((c) => c.difficultyTier === 'mudah'),
        ];

  const shuffle = <T,>(items: T[]): T[] => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(randomFn() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  for (let attempt = 0; attempt < 40; attempt++) {
    const shuffled =
      difficulty === 'sulit'
        ? [
            ...shuffle(
              PRODUCT_CATEGORIES.filter((c) => c.difficultyTier === 'sulit')
            ),
            ...shuffle(
              PRODUCT_CATEGORIES.filter((c) => c.difficultyTier !== 'sulit')
            ),
          ]
        : shuffle(primaryPool);

    const pickedCategories = shuffled.slice(0, targetCount);
    const mission: MissionRequirement[] = pickedCategories.map((cat) => {
      const possibleTargets = cat.missionTargets[difficulty];
      const chosenTarget =
        possibleTargets[Math.floor(randomFn() * possibleTargets.length)];
      return {
        categoryId: cat.id,
        targetAmount: chosenTarget,
      };
    });

    const optimalTotal = mission.reduce((sum, req) => {
      const cat = getCategoryById(req.categoryId);
      if (!cat) return sum;
      return sum + calculateOptimalCategoryCost(cat, req.targetAmount);
    }, 0);

    if (optimalTotal <= maxOptimalBudget && optimalTotal >= 65000) {
      return mission;
    }
  }

  // Fallback aman yang terjamin wajar terhadap modal Rp300.000
  return [
    { categoryId: 'biskuit', targetAmount: 20 },
    { categoryId: 'air-mineral', targetAmount: 6000 },
    { categoryId: 'buku-tulis', targetAmount: 10 },
    { categoryId: 'beras', targetAmount: 5000 },
  ];
}

/**
 * Menghitung total belanja keranjang saat ini dalam bilangan bulat Rupiah.
 */
export function calculateCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => {
    if (item.quantity <= 0) return total;
    const product = getProductById(item.productId);
    if (!product) return total;
    return total + product.price * item.quantity;
  }, 0);
}

/**
 * Menghitung total isi yang sudah masuk keranjang untuk setiap kategori.
 */
export function calculateCategoryAmountsInCart(
  cart: CartItem[]
): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const item of cart) {
    if (item.quantity <= 0) continue;
    const product = getProductById(item.productId);
    if (!product) continue;
    totals[product.categoryId] =
      (totals[product.categoryId] || 0) + product.contentAmount * item.quantity;
  }
  return totals;
}

/**
 * Mengevaluasi status pemenuhan misi berdasarkan isi keranjang.
 */
export function evaluateMissionProgress(
  mission: MissionRequirement[],
  cart: CartItem[]
): Array<{
  requirement: MissionRequirement;
  category: ProductCategory;
  boughtAmount: number;
  isFulfilled: boolean;
  remainingAmount: number;
}> {
  const boughtByCategory = calculateCategoryAmountsInCart(cart);

  return mission
    .map((req) => {
      const category = getCategoryById(req.categoryId);
      if (!category) return null;
      const boughtAmount = boughtByCategory[req.categoryId] || 0;
      const isFulfilled = boughtAmount >= req.targetAmount;
      const remainingAmount = Math.max(0, req.targetAmount - boughtAmount);
      return {
        requirement: req,
        category,
        boughtAmount,
        isFulfilled,
        remainingAmount,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
}

/**
 * Menentukan jumlah bintang (1-5) dan predikat berdasarkan skor akhir (0-100).
 */
export function getStarsAndPredicate(score: number): {
  stars: number;
  predicate: string;
} {
  if (score >= 90) {
    return { stars: 5, predicate: 'Pembelanja Super Bijak' };
  }
  if (score >= 75) {
    return { stars: 4, predicate: 'Pembelanja Cermat' };
  }
  if (score >= 60) {
    return { stars: 3, predicate: 'Cukup Bijak' };
  }
  if (score >= 40) {
    return { stars: 2, predicate: 'Perlu Lebih Teliti' };
  }
  return { stars: 1, predicate: 'Ayo Berlatih Lagi' };
}

/**
 * Fungsi utama evaluasi sesi belanja.
 * Bobot penilaian:
 * - Ketepatan memilih harga satuan termurah: 60%
 * - Pemenuhan kebutuhan/misi: 25%
 * - Sisa anggaran/efisiensi belanja: 15%
 */
export function evaluateShoppingSession(params: {
  cart: CartItem[];
  mission: MissionRequirement[];
  difficulty: DifficultyLevel;
  budget?: number;
  existingBadges?: BadgeId[];
}): ScoreReport {
  const {
    cart,
    mission,
    difficulty,
    budget = INITIAL_BUDGET,
    existingBadges = [],
  } = params;

  const validCart = cart.filter((item) => item.quantity > 0);
  const totalSpent = calculateCartTotal(validCart);
  const remainingBudget = budget - totalSpent;

  const missionMap = new Map<string, number>();
  for (const req of mission) {
    missionMap.set(req.categoryId, req.targetAmount);
  }

  // Kumpulkan semua kategori yang ada di misi maupun yang dibeli siswa
  const relevantCategoryIds = new Set<string>(mission.map((m) => m.categoryId));
  for (const item of validCart) {
    const product = getProductById(item.productId);
    if (product) {
      relevantCategoryIds.add(product.categoryId);
    }
  }

  const categoryEvaluations: CategoryEvaluation[] = [];

  for (const categoryId of relevantCategoryIds) {
    const category = getCategoryById(categoryId);
    if (!category) continue;

    const offers = getOffersByCategory(categoryId);
    const { offer: cheapestOffer, unitPrice: bestUnitPrice } =
      findCheapestOffer(category, offers);

    const allOffers: OfferEvaluation[] = offers.map((offer) => {
      const unitPrice = calculateUnitPrice(
        offer.price,
        offer.contentAmount,
        category.unitDivisor
      );
      return {
        product: offer,
        unitPrice,
        isCheapest: unitPrice === bestUnitPrice,
        formulaText: buildFormulaText(offer, category),
      };
    });

    const isMissionCategory = missionMap.has(categoryId);
    const targetAmount = missionMap.get(categoryId) || 0;

    // Kumpulkan semua pembelian siswa pada kategori ini (tangani pembelian berulang/campuran)
    const purchasedOffers = validCart
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product || product.categoryId !== categoryId) return null;
        return {
          product,
          quantity: item.quantity,
          subtotal: product.price * item.quantity,
          unitPrice: calculateUnitPrice(
            product.price,
            product.contentAmount,
            category.unitDivisor
          ),
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

    const boughtAmount = purchasedOffers.reduce(
      (sum, entry) => sum + entry.product.contentAmount * entry.quantity,
      0
    );
    const categorySpent = purchasedOffers.reduce(
      (sum, entry) => sum + entry.subtotal,
      0
    );
    const isFulfilled = !isMissionCategory || boughtAmount >= targetAmount;

    let studentUnitPrice: number | null = null;
    let diffPercent = 0;
    let categoryScore = 0;
    let status: EfficiencyStatus = 'belum-dibeli';
    let wastedMoney = 0;

    if (boughtAmount > 0) {
      // Harga satuan rata-rata tertimbang jika siswa membeli lebih dari satu macam paket
      studentUnitPrice = calculateUnitPrice(
        categorySpent,
        boughtAmount,
        category.unitDivisor
      );

      diffPercent =
        bestUnitPrice > 0
          ? Math.max(
              0,
              ((studentUnitPrice - bestUnitPrice) / bestUnitPrice) * 100
            )
          : 0;

      if (diffPercent <= 0.5) {
        categoryScore = 100;
        status = 'hemat';
      } else {
        // Berkurang proporsional berdasarkan persentase selisih harga satuan
        categoryScore = Math.max(0, Math.round(100 - diffPercent * 1.5));
        status = diffPercent <= 20 ? 'kurang-hemat' : 'boros';
      }

      // Selisih uang yang terbuang dibandingkan jika membeli jumlah yang sama pada harga satuan termurah
      const idealCostForBoughtAmount = Math.round(
        (bestUnitPrice * boughtAmount) / category.unitDivisor
      );
      wastedMoney = Math.max(0, categorySpent - idealCostForBoughtAmount);
    }

    categoryEvaluations.push({
      category,
      isMissionCategory,
      targetAmount,
      boughtAmount,
      isFulfilled,
      totalSpent: categorySpent,
      studentUnitPrice,
      bestUnitPrice,
      cheapestOffer,
      purchasedOffers,
      allOffers,
      diffPercent: Math.round(diffPercent * 10) / 10,
      categoryScore,
      status,
      wastedMoney,
    });
  }

  // Urutkan agar kategori misi muncul terlebih dahulu
  categoryEvaluations.sort((a, b) => {
    if (a.isMissionCategory && !b.isMissionCategory) return -1;
    if (!a.isMissionCategory && b.isMissionCategory) return 1;
    return 0;
  });

  // 1. Aspek Ketepatan Harga Satuan (60%)
  const accuracyScore =
    categoryEvaluations.length > 0
      ? Math.round(
          categoryEvaluations.reduce((sum, ev) => sum + ev.categoryScore, 0) /
            categoryEvaluations.length
        )
      : 0;

  // 2. Aspek Pemenuhan Misi (25%)
  const missionEvals = categoryEvaluations.filter((ev) => ev.isMissionCategory);
  const fulfilledMissionCount = missionEvals.filter((ev) => ev.isFulfilled).length;
  const totalMissionCount = missionEvals.length;

  const missionScore =
    totalMissionCount > 0
      ? Math.round(
          (missionEvals.reduce(
            (sum, ev) =>
              sum + Math.min(1, ev.boughtAmount / Math.max(1, ev.targetAmount)),
            0
          ) /
            totalMissionCount) *
            100
        )
      : 0;

  // 3. Aspek Sisa Anggaran / Efisiensi Belanja (15%)
  const optimalMissionCost = mission.reduce((sum, req) => {
    const cat = getCategoryById(req.categoryId);
    if (!cat) return sum;
    return sum + calculateOptimalCategoryCost(cat, req.targetAmount);
  }, 0);

  let efficiencyScore = 0;
  if (totalSpent > 0 && missionScore > 0) {
    const overOptimal = Math.max(0, totalSpent - optimalMissionCost);
    const overRatio = overOptimal / Math.max(1, optimalMissionCost);
    const rawEfficiency = Math.max(0, Math.round(100 - overRatio * 120));
    // Skalakan dengan tingkat pemenuhan misi agar keranjang kosong/sedikit tidak mendapat nilai efisiensi penuh
    efficiencyScore = Math.round(rawEfficiency * (missionScore / 100));
  }

  // Skor akhir tertimbang (60% + 25% + 15%)
  const finalScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        accuracyScore * 0.6 + missionScore * 0.25 + efficiencyScore * 0.15
      )
    )
  );

  const { stars, predicate } = getStarsAndPredicate(finalScore);

  // Total penghematan potensial (selisih harga satuan + belanja barang di luar misi)
  const unitPriceWaste = categoryEvaluations.reduce(
    (sum, ev) => sum + ev.wastedMoney,
    0
  );
  const nonMissionSpent = categoryEvaluations
    .filter((ev) => !ev.isMissionCategory)
    .reduce((sum, ev) => sum + ev.totalSpent, 0);
  const totalPotentialSavings = unitPriceWaste + nonMissionSpent;

  // Bangun umpan balik naratif yang positif & mendidik
  const { narrativeFeedback, tips } = buildNarrativeFeedback({
    finalScore,
    fulfilledMissionCount,
    totalMissionCount,
    totalPotentialSavings,
    categoryEvaluations,
  });

  // Cek lencana baru yang berhasil diraih
  const earnedInSession: BadgeId[] = [];
  const allMissionCheapest =
    missionEvals.length > 0 &&
    missionEvals.every((ev) => ev.status === 'hemat' && ev.isFulfilled);

  if (allMissionCheapest) {
    earnedInSession.push('detektif-harga');
  }
  if (efficiencyScore >= 90 && fulfilledMissionCount === totalMissionCount) {
    earnedInSession.push('hemat-maksimal');
  }
  if (totalMissionCount > 0 && fulfilledMissionCount === totalMissionCount) {
    earnedInSession.push('misi-tuntas');
  }
  if (finalScore >= 90) {
    earnedInSession.push('pembelanja-bijak');
  }
  if (difficulty === 'sulit' && finalScore >= 80) {
    earnedInSession.push('penakluk-sulit');
  }

  const newlyUnlockedBadges = earnedInSession.filter(
    (badge) => !existingBadges.includes(badge)
  );

  return {
    finalScore,
    stars,
    predicate,
    accuracyScore,
    missionScore,
    efficiencyScore,
    totalSpent,
    remainingBudget,
    optimalMissionCost,
    totalPotentialSavings,
    fulfilledMissionCount,
    totalMissionCount,
    categoryEvaluations,
    narrativeFeedback,
    tips,
    newlyUnlockedBadges,
  };
}

function buildNarrativeFeedback(params: {
  finalScore: number;
  fulfilledMissionCount: number;
  totalMissionCount: number;
  totalPotentialSavings: number;
  categoryEvaluations: CategoryEvaluation[];
}): { narrativeFeedback: string; tips: string[] } {
  const {
    finalScore,
    fulfilledMissionCount,
    totalMissionCount,
    totalPotentialSavings,
    categoryEvaluations,
  } = params;

  const tips: string[] = [];
  const hematCount = categoryEvaluations.filter(
    (ev) => ev.status === 'hemat'
  ).length;
  const nonMissionItems = categoryEvaluations.filter(
    (ev) => !ev.isMissionCategory
  );
  const trappedItems = categoryEvaluations.filter((ev) =>
    ev.purchasedOffers.some((p) => Boolean(p.product.trapReason))
  );

  let narrativeFeedback = '';

  if (finalScore >= 90) {
    narrativeFeedback =
      'Hebat sekali! Kamu sudah sangat mahir menghitung rasio harga satuan dan memilih penawaran paling hemat. Kebiasaan teliti seperti ini sangat berguna saat berbelanja bersama keluarga!';
  } else if (finalScore >= 75) {
    narrativeFeedback =
      'Kerja bagus! Sebagian besar pilihanmu sudah cermat dan hemat. Sedikit lebih teliti lagi membandingkan satuan pada beberapa produk, kamu pasti bisa mencapai skor sempurna!';
  } else if (finalScore >= 60) {
    narrativeFeedback =
      'Usaha yang baik! Kamu sudah mulai memahami cara membandingkan harga, meski masih ada beberapa penawaran yang belum paling hemat. Coba gunakan Kalkulator Bantu di sesi berikutnya ya!';
  } else {
    narrativeFeedback =
      'Jangan menyerah, belajar rasio memang butuh latihan! Perhatikan kembali perbandingan harga satuan di tabel bawah, lalu coba lagi — kamu pasti bisa jauh lebih hemat di percobaan berikutnya!';
  }

  if (hematCount > 0) {
    tips.push(
      `Kamu sudah tepat memilih harga satuan termurah pada ${hematCount} kategori. Pertahankan ketelitianmu!`
    );
  }

  if (fulfilledMissionCount < totalMissionCount) {
    tips.push(
      `Masih ada ${
        totalMissionCount - fulfilledMissionCount
      } kebutuhan di daftar misi yang belum terpenuhi sepenuhnya. Cek selalu daftar misi sebelum membayar.`
    );
  }

  if (trappedItems.length > 0) {
    const names = trappedItems.map((t) => t.category.name).join(', ');
    tips.push(
      `Hati-hati dengan kemasan "Jumbo" atau "Bonus" pada kategori ${names} — paket besar tidak selalu lebih murah per satuannya.`
    );
  }

  if (nonMissionItems.length > 0) {
    tips.push(
      `Kamu membeli ${nonMissionItems.length} kategori di luar daftar misi. Membeli sesuai kebutuhan membantu menjaga sisa anggaran.`
    );
  }

  if (totalPotentialSavings > 0) {
    tips.push(
      `Jika memilih penawaran paling hemat sesuai daftar kebutuhan, kamu masih bisa menghemat sekitar ${formatRupiah(
        totalPotentialSavings
      )}.`
    );
  }

  if (tips.length === 0) {
    tips.push(
      'Coba tantang dirimu ke tingkat kesulitan yang lebih tinggi untuk melatih konversi satuan ml ke liter dan gram ke kilogram!'
    );
  }

  return { narrativeFeedback, tips };
}

/**
 * Helper untuk mendapatkan total produk seluruh marketplace (berguna untuk tampilan info).
 */
export function getCatalogSummary(): {
  categoryCount: number;
  offerCount: number;
} {
  return {
    categoryCount: PRODUCT_CATEGORIES.length,
    offerCount: PRODUCT_OFFERS.length,
  };
}
