import {
  Calculator,
  CheckCircle2,
  ClipboardList,
  Lightbulb,
  Minus,
  Plus,
  ShoppingCart,
  Store,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { ProductArtwork } from '../components/ProductArtwork';
import { useGame } from '../context/GameContext';
import {
  MARKETPLACE_GROUPS,
  PRODUCT_CATEGORIES,
  getOffersByCategory,
} from '../data/products';
import type { MarketplaceGroupId } from '../types';
import { formatCategoryAmount, formatRupiah } from '../utils/format';

export function MarketplaceScreen() {
  const {
    remainingBudget,
    budget,
    totalCartPacks,
    cart,
    mission,
    missionProgress,
    fulfilledMissionCount,
    addToCart,
    updateCartQuantity,
    setScreen,
    setCalculatorOpen,
    setHintCategoryId,
  } = useGame();

  const [activeGroup, setActiveGroup] = useState<MarketplaceGroupId>('semua');
  const [onlyMissionItems, setOnlyMissionItems] = useState(false);

  const missionCategoryIds = useMemo(
    () => new Set(mission.map((m) => m.categoryId)),
    [mission]
  );

  const missionProgressMap = useMemo(() => {
    const map = new Map<string, (typeof missionProgress)[number]>();
    for (const item of missionProgress) {
      map.set(item.category.id, item);
    }
    return map;
  }, [missionProgress]);

  const cartQuantityMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of cart) {
      map.set(item.productId, item.quantity);
    }
    return map;
  }, [cart]);

  const visibleCategories = useMemo(() => {
    return PRODUCT_CATEGORIES.filter((cat) => {
      if (activeGroup !== 'semua' && cat.group !== activeGroup) return false;
      if (onlyMissionItems && !missionCategoryIds.has(cat.id)) return false;
      return true;
    });
  }, [activeGroup, onlyMissionItems, missionCategoryIds]);

  const isLowBalance = remainingBudget < 35000;

  return (
    <div className="pb-10">
      {/* Bilah Status Belanja Real-Time (ramping agar nyaman di layar HP) */}
      <div className="sticky top-0 md:top-16 z-20 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Saldo & Progres Misi */}
          <div className="flex items-center gap-3 sm:gap-5 min-w-0">
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-500 leading-none">
                Sisa Saldo
              </p>
              <p
                className={`font-mono text-base sm:text-xl font-extrabold tabular-nums truncate mt-0.5 ${
                  isLowBalance ? 'text-rose-700' : 'text-teal-800'
                }`}
              >
                {formatRupiah(remainingBudget)}
              </p>
            </div>

            <div className="h-7 w-px bg-slate-200 hidden xs:block" aria-hidden="true" />

            <button
              type="button"
              onClick={() => setScreen('mission')}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-2.5 sm:px-3 rounded-xl hover:bg-slate-100 text-left transition-colors shrink-0"
              aria-label="Lihat daftar misi belanja"
            >
              <ClipboardList className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
              <div className="leading-tight">
                <p className="text-[11px] font-bold text-slate-500">Misi</p>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 tabular-nums">
                  {fulfilledMissionCount}/{missionProgress.length}
                </p>
              </div>
            </button>
          </div>

          {/* Alat Bantu & Keranjang */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setCalculatorOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-2.5 sm:px-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm transition-colors whitespace-nowrap"
              aria-label="Buka Kalkulator Bantu"
              title="Kalkulator Bantu"
            >
              <Calculator className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Kalkulator</span>
            </button>

            <button
              type="button"
              onClick={() => setHintCategoryId('all')}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-2.5 sm:px-3.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs sm:text-sm transition-colors whitespace-nowrap"
              aria-label="Lihat Petunjuk"
              title="Petunjuk Rasio"
            >
              <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Petunjuk</span>
            </button>

            <button
              type="button"
              onClick={() => setScreen('cart')}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 sm:px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm transition-colors whitespace-nowrap"
              aria-label={`Buka Keranjang, ${totalCartPacks} paket`}
            >
              <ShoppingCart className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Keranjang</span>
              <span className="font-mono font-extrabold tabular-nums">
                ({totalCartPacks})
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Konten Utama Marketplace */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Ringkasan Misi Cepat */}
        <section
          aria-label="Ringkasan daftar kebutuhan"
          className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                Marketplace Belanja Bijak
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Bandingkan isi dan harga setiap toko sebelum memasukkan ke
                keranjang. Modal awal {formatRupiah(budget)}.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOnlyMissionItems((prev) => !prev)}
              aria-pressed={onlyMissionItems}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
                onlyMissionItems
                  ? 'bg-teal-600 border-teal-700 text-white'
                  : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
              }`}
            >
              {onlyMissionItems
                ? 'Menampilkan Kebutuhan Misi'
                : 'Filter: Hanya Kebutuhan Misi'}
            </button>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1 border-t border-slate-100 text-xs sm:text-sm">
            {missionProgress.map((item) => (
              <div
                key={item.category.id}
                className={`inline-flex items-center gap-1.5 font-semibold ${
                  item.isFulfilled ? 'text-emerald-700' : 'text-slate-700'
                }`}
              >
                <span aria-hidden="true">{item.category.emoji}</span>
                <span>{item.category.name}:</span>
                <span className="font-mono font-bold tabular-nums">
                  {formatCategoryAmount(item.boughtAmount, item.category)} /{' '}
                  {formatCategoryAmount(
                    item.requirement.targetAmount,
                    item.category
                  )}
                </span>
                {item.isFulfilled && (
                  <CheckCircle2
                    className="w-4 h-4 text-emerald-600 shrink-0"
                    aria-label="Terpenuhi"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Tab Kategori Produk */}
        <div
          role="tablist"
          aria-label="Filter kategori marketplace"
          className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {MARKETPLACE_GROUPS.map((group) => {
            const isActive = activeGroup === group.id;
            return (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveGroup(group.id)}
                className={`inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl text-sm font-bold transition-colors whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-teal-600 border-teal-700 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span aria-hidden="true">{group.emoji}</span>
                <span>{group.label}</span>
              </button>
            );
          })}
        </div>

        {/* Daftar Kategori & Grid Produk */}
        {visibleCategories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <p className="text-3xl" aria-hidden="true">
              🔍
            </p>
            <p className="font-bold text-slate-900">
              Tidak ada kebutuhan misi pada tab kategori ini.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveGroup('semua');
                setOnlyMissionItems(false);
              }}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors"
            >
              Tampilkan Semua Produk
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {visibleCategories.map((category) => {
              const offers = getOffersByCategory(category.id);
              const missionEntry = missionProgressMap.get(category.id);

              return (
                <section
                  key={category.id}
                  aria-labelledby={`cat-heading-${category.id}`}
                  className="space-y-4"
                >
                  {/* Header Kategori */}
                  <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" aria-hidden="true">
                          {category.emoji}
                        </span>
                        <h2
                          id={`cat-heading-${category.id}`}
                          className="font-display text-xl sm:text-2xl font-extrabold text-slate-900"
                        >
                          {category.name}
                        </h2>
                      </div>

                      {missionEntry ? (
                        <p
                          className={`text-sm font-bold flex items-center gap-1.5 ${
                            missionEntry.isFulfilled
                              ? 'text-emerald-700'
                              : 'text-teal-800'
                          }`}
                        >
                          {missionEntry.isFulfilled && (
                            <CheckCircle2
                              className="w-4 h-4 shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          <span>
                            Kebutuhan Misi: minimal{' '}
                            {formatCategoryAmount(
                              missionEntry.requirement.targetAmount,
                              category
                            )}{' '}
                            · Di keranjang:{' '}
                            {formatCategoryAmount(
                              missionEntry.boughtAmount,
                              category
                            )}
                          </span>
                        </p>
                      ) : (
                        <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                          Tidak termasuk daftar misi sesi ini
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setHintCategoryId(category.id)}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs sm:text-sm transition-colors whitespace-nowrap"
                    >
                      <Lightbulb className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Petunjuk {category.name}</span>
                    </button>
                  </div>

                  {/* Grid Kartu Produk — PENTING: Harga satuan TIDAK ditampilkan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {offers.map((offer) => {
                      const qtyInCart = cartQuantityMap.get(offer.id) || 0;
                      const cannotAffordMore = offer.price > remainingBudget;

                      return (
                        <article
                          key={offer.id}
                          className={`bg-white rounded-2xl border p-4 flex flex-col justify-between transition-colors ${
                            qtyInCart > 0
                              ? 'border-teal-500 ring-1 ring-teal-500/20'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="space-y-3">
                            {/* Ilustrasi Unik Setiap Produk */}
                            <ProductArtwork
                              productId={offer.id}
                              name={offer.name}
                              fallbackEmoji={offer.emoji}
                              size="lg"
                            />

                            {/* Info Toko & Produk (tanpa pill, tanpa harga satuan) */}
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                <Store
                                  className="w-3.5 h-3.5 shrink-0"
                                  aria-hidden="true"
                                />
                                <span className="truncate">{offer.storeName}</span>
                              </p>
                              <h3 className="font-bold text-slate-900 text-base leading-snug">
                                {offer.name}
                              </h3>
                              <p className="text-sm font-bold text-teal-800">
                                {offer.packLabel}
                              </p>
                              {offer.promoNote && (
                                <p className="text-xs font-bold text-amber-800 pt-0.5">
                                  Catatan toko: {offer.promoNote}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Harga Paket & Tombol Keranjang */}
                          <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-slate-500">
                                Harga Paket
                              </p>
                              <p className="font-mono text-xl font-extrabold text-slate-900 tabular-nums">
                                {formatRupiah(offer.price)}
                              </p>
                            </div>

                            {qtyInCart === 0 ? (
                              <button
                                type="button"
                                onClick={() => addToCart(offer.id)}
                                className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-1.5 ${
                                  cannotAffordMore
                                    ? 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                                }`}
                                aria-label={`Tambah ${offer.name} ke keranjang`}
                              >
                                <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                                <span>Keranjang</span>
                              </button>
                            ) : (
                              <div className="flex items-center justify-between gap-2 bg-teal-50 border border-teal-200 rounded-xl p-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateCartQuantity(offer.id, qtyInCart - 1)
                                  }
                                  className="min-h-[44px] min-w-[44px] rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center transition-colors"
                                  aria-label={`Kurangi jumlah ${offer.name}`}
                                >
                                  <Minus className="w-4 h-4" aria-hidden="true" />
                                </button>
                                <span
                                  className="font-mono font-extrabold text-base text-teal-900 tabular-nums px-2"
                                  aria-live="polite"
                                >
                                  {qtyInCart} paket
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateCartQuantity(offer.id, qtyInCart + 1)
                                  }
                                  className="min-h-[44px] min-w-[44px] rounded-lg bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition-colors"
                                  aria-label={`Tambah jumlah ${offer.name}`}
                                >
                                  <Plus className="w-4 h-4" aria-hidden="true" />
                                </button>
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Ajakan Checkout di Bagian Bawah */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg font-bold text-slate-900">
              Sudah selesai memilih belanjaan?
            </p>
            <p className="text-sm text-slate-600">
              Periksa kelengkapan misi dan sisa saldo di halaman Keranjang
              sebelum membayar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setScreen('cart')}
            className="min-h-[48px] px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
          >
            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
            <span>Lihat Keranjang ({totalCartPacks})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
