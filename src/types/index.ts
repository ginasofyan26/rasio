export type ScreenName =
  | 'home'
  | 'practice'
  | 'mission'
  | 'marketplace'
  | 'cart'
  | 'result';

export type DifficultyLevel = 'mudah' | 'sedang' | 'sulit';

export type MarketplaceGroupId =
  | 'semua'
  | 'makanan-ringan'
  | 'minuman'
  | 'alat-tulis'
  | 'sembako'
  | 'kebersihan';

export interface MarketplaceGroup {
  id: MarketplaceGroupId;
  label: string;
  emoji: string;
}

export interface ProductOffer {
  id: string;
  categoryId: string;
  storeName: string;
  name: string;
  packLabel: string;
  /** Jumlah isi dalam satuan dasar kategori (misal: biji, ml, gram, buah, batang) */
  contentAmount: number;
  /** Harga paket dalam bilangan bulat Rupiah */
  price: number;
  emoji: string;
  /** Catatan pemasaran di kartu produk (misal promo/bonus/ukuran) */
  promoNote?: string;
  /** Penanda internal untuk edukasi pada layar hasil jika penawaran ini bersifat menjebak */
  trapReason?: string;
}

export interface ProductCategory {
  id: string;
  group: Exclude<MarketplaceGroupId, 'semua'>;
  name: string;
  emoji: string;
  /** Satuan dasar untuk perhitungan bilangan bulat (biji, ml, gram, buah, batang) */
  baseUnit: string;
  /** Pembagi normalisasi untuk menghitung harga satuan (1, 100, atau 1000) */
  unitDivisor: number;
  /** Label satuan setelah dinormalisasi (misal: "biji", "liter", "100 ml", "kg", "100 g") */
  normalizedUnitLabel: string;
  /** Pembagi tampilan target misi (misal: 1000 untuk liter/kg, 1 untuk gram/biji/buah) */
  missionDisplayDivisor: number;
  /** Label satuan untuk ditampilkan di daftar misi (misal: "biji", "liter", "kg", "gram") */
  missionUnitLabel: string;
  /** Petunjuk konseptual tanpa langsung membocorkan jawaban termurah */
  hint: string;
  /** Tingkat kesulitan minimal kategori ini sering muncul */
  difficultyTier: DifficultyLevel;
  /** Pilihan target jumlah dalam satuan dasar per tingkat kesulitan */
  missionTargets: Record<DifficultyLevel, number[]>;
}

export interface MissionRequirement {
  categoryId: string;
  /** Target minimal yang harus dibeli dalam satuan dasar */
  targetAmount: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type EfficiencyStatus = 'hemat' | 'kurang-hemat' | 'boros' | 'belum-dibeli';

export interface OfferEvaluation {
  product: ProductOffer;
  unitPrice: number;
  isCheapest: boolean;
  formulaText: string;
}

export interface CategoryEvaluation {
  category: ProductCategory;
  isMissionCategory: boolean;
  targetAmount: number;
  boughtAmount: number;
  isFulfilled: boolean;
  totalSpent: number;
  studentUnitPrice: number | null;
  bestUnitPrice: number;
  cheapestOffer: ProductOffer;
  purchasedOffers: Array<{
    product: ProductOffer;
    quantity: number;
    subtotal: number;
    unitPrice: number;
  }>;
  allOffers: OfferEvaluation[];
  diffPercent: number;
  categoryScore: number;
  status: EfficiencyStatus;
  wastedMoney: number;
}

export interface ScoreReport {
  finalScore: number;
  stars: number;
  predicate: string;
  accuracyScore: number;
  missionScore: number;
  efficiencyScore: number;
  totalSpent: number;
  remainingBudget: number;
  optimalMissionCost: number;
  totalPotentialSavings: number;
  fulfilledMissionCount: number;
  totalMissionCount: number;
  categoryEvaluations: CategoryEvaluation[];
  narrativeFeedback: string;
  tips: string[];
  newlyUnlockedBadges: BadgeId[];
}

export type BadgeId =
  | 'detektif-harga'
  | 'hemat-maksimal'
  | 'misi-tuntas'
  | 'juara-latihan'
  | 'penakluk-sulit'
  | 'pembelanja-bijak';

export interface BadgeInfo {
  id: BadgeId;
  name: string;
  description: string;
  emoji: string;
}

export interface SessionHistoryEntry {
  id: string;
  studentName: string;
  dateIso: string;
  difficulty: DifficultyLevel;
  finalScore: number;
  stars: number;
  predicate: string;
  totalSpent: number;
  remainingBudget: number;
  fulfilledMissions: number;
  totalMissions: number;
}

export interface PracticeQuestion {
  id: string;
  title: string;
  story: string;
  options: Array<{
    id: string;
    label: string;
    detail: string;
  }>;
  correctOptionId: string;
  hint: string;
  explanation: string;
}
