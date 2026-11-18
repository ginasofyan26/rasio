import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { ProductArtwork } from '../components/ProductArtwork';
import { useGame } from '../context/GameContext';
import { getCategoryById, getProductById } from '../data/products';
import { formatCategoryAmount, formatRupiah } from '../utils/format';

export function CartScreen() {
  const {
    cart,
    budget,
    totalSpent,
    remainingBudget,
    missionProgress,
    fulfilledMissionCount,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    setScreen,
    checkoutAndEvaluate,
  } = useGame();

  const [confirmIncomplete, setConfirmIncomplete] = useState(false);

  const isOverBudget = totalSpent > budget;
  const isAllMissionsFulfilled =
    fulfilledMissionCount === missionProgress.length;
  const isCartEmpty = cart.length === 0;

  const handleCheckoutClick = () => {
    if (isCartEmpty || isOverBudget) return;
    if (!isAllMissionsFulfilled && !confirmIncomplete) {
      setConfirmIncomplete(true);
      return;
    }
    checkoutAndEvaluate();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setScreen('marketplace')}
          className="inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-200/70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Kembali ke Marketplace</span>
        </button>

        {!isCartEmpty && (
          <button
            type="button"
            onClick={() => {
              setConfirmIncomplete(false);
              clearCart();
            }}
            className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 rounded-xl text-sm font-bold text-rose-700 hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            <span>Kosongkan Keranjang</span>
          </button>
        )}
      </div>

      <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
        Keranjang Belanja & Checkout
      </h1>

      {/* Peringatan jika melebihi modal */}
      {isOverBudget && (
        <div
          role="alert"
          className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 flex items-start gap-3"
        >
          <AlertTriangle
            className="w-6 h-6 text-rose-600 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <p className="font-bold text-base">
              Total belanjamu melebihi modal {formatRupiah(budget)}!
            </p>
            <p className="text-sm mt-0.5">
              Kamu kelebihan {formatRupiah(totalSpent - budget)}. Kurangi jumlah
              paket atau ganti dengan penawaran yang lebih hemat sebelum
              membayar.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Daftar Barang di Keranjang */}
        <section
          aria-labelledby="cart-items-heading"
          className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-4"
        >
          <h2
            id="cart-items-heading"
            className="font-display text-xl font-bold text-slate-900"
          >
            Daftar Barang di Keranjang
          </h2>

          {isCartEmpty ? (
            <div className="py-10 px-4 text-center space-y-4">
              <Mascot mood="thinking" size="md" />
              <div className="space-y-1">
                <p className="font-display text-xl font-bold text-slate-900">
                  Keranjangmu Masih Kosong
                </p>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Yuk kembali ke Marketplace untuk memilih barang-barang sesuai
                  daftar misimu!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setScreen('marketplace')}
                className="min-h-[48px] px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors inline-flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span>Belanja di Marketplace</span>
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-slate-200">
              {cart.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                const category = getCategoryById(product.categoryId);
                const subtotal = product.price * item.quantity;
                const totalContent = product.contentAmount * item.quantity;

                return (
                  <li
                    key={item.productId}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <ProductArtwork
                        productId={product.id}
                        name={product.name}
                        fallbackEmoji={product.emoji}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-500">
                          {product.storeName} · {category?.name}
                        </p>
                        <h3 className="font-bold text-slate-900 text-base">
                          {product.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-teal-800 mt-0.5">
                          {product.packLabel} × {item.quantity} ={' '}
                          {category
                            ? formatCategoryAmount(totalContent, category)
                            : totalContent}
                        </p>
                        <p className="text-xs font-mono text-slate-500 mt-0.5 tabular-nums">
                          {formatRupiah(product.price)} / paket
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 shrink-0">
                      <p className="font-mono font-extrabold text-lg text-slate-900 tabular-nums">
                        {formatRupiah(subtotal)}
                      </p>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmIncomplete(false);
                            updateCartQuantity(
                              item.productId,
                              item.quantity - 1
                            );
                          }}
                          className="min-h-[44px] min-w-[44px] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors"
                          aria-label={`Kurangi ${product.name}`}
                        >
                          <Minus className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <span className="font-mono font-bold text-base w-9 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmIncomplete(false);
                            updateCartQuantity(
                              item.productId,
                              item.quantity + 1
                            );
                          }}
                          className="min-h-[44px] min-w-[44px] rounded-xl bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition-colors"
                          aria-label={`Tambah ${product.name}`}
                        >
                          <Plus className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmIncomplete(false);
                            removeFromCart(item.productId);
                          }}
                          className="min-h-[44px] min-w-[44px] rounded-xl text-slate-500 hover:text-rose-700 hover:bg-rose-50 flex items-center justify-center transition-colors"
                          aria-label={`Hapus ${product.name} dari keranjang`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Kolom Kanan: Cek Misi & Ringkasan Pembayaran */}
        <aside className="lg:col-span-5 space-y-5">
          {/* Cek Kelengkapan Misi */}
          <section
            aria-labelledby="mission-check-heading"
            className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-4"
          >
            <div className="flex items-center justify-between gap-2">
              <h2
                id="mission-check-heading"
                className="font-display text-lg font-bold text-slate-900"
              >
                Cek Kelengkapan Misi
              </h2>
              <span
                className={`text-xs font-extrabold tabular-nums ${
                  isAllMissionsFulfilled
                    ? 'text-emerald-700'
                    : 'text-amber-700'
                }`}
              >
                {fulfilledMissionCount} / {missionProgress.length} selesai
              </span>
            </div>

            <ul className="space-y-2.5">
              {missionProgress.map((item) => (
                <li
                  key={item.category.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-sm ${
                    item.isFulfilled
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span aria-hidden="true">{item.category.emoji}</span>
                    <div className="min-w-0">
                      <p className="font-bold truncate">{item.category.name}</p>
                      <p className="text-xs font-semibold opacity-80 tabular-nums">
                        {formatCategoryAmount(item.boughtAmount, item.category)}{' '}
                        /{' '}
                        {formatCategoryAmount(
                          item.requirement.targetAmount,
                          item.category
                        )}
                      </p>
                    </div>
                  </div>
                  {item.isFulfilled ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 shrink-0">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      Lengkap
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-amber-800 shrink-0 tabular-nums">
                      Kurang{' '}
                      {formatCategoryAmount(
                        item.remainingAmount,
                        item.category
                      )}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Ringkasan Pembayaran */}
          <section
            aria-labelledby="payment-summary-heading"
            className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-4"
          >
            <h2
              id="payment-summary-heading"
              className="font-display text-lg font-bold text-slate-900"
            >
              Ringkasan Pembayaran
            </h2>

            <dl className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-600 font-semibold">Modal Awal</dt>
                <dd className="font-mono font-bold text-slate-900 tabular-nums">
                  {formatRupiah(budget)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-600 font-semibold">Total Belanja</dt>
                <dd
                  className={`font-mono font-extrabold text-base tabular-nums ${
                    isOverBudget ? 'text-rose-700' : 'text-slate-900'
                  }`}
                >
                  {formatRupiah(totalSpent)}
                </dd>
              </div>
              <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between">
                <dt className="font-bold text-slate-900 text-base">
                  Sisa Saldo
                </dt>
                <dd
                  className={`font-mono font-extrabold text-xl tabular-nums ${
                    isOverBudget ? 'text-rose-700' : 'text-teal-700'
                  }`}
                >
                  {formatRupiah(remainingBudget)}
                </dd>
              </div>
            </dl>

            {/* Peringatan ramah jika misi belum lengkap */}
            {confirmIncomplete && !isAllMissionsFulfilled && !isCartEmpty && (
              <div
                role="status"
                className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm space-y-2"
              >
                <p className="font-bold">
                  Beberapa kebutuhan misimu belum terpenuhi!
                </p>
                <p className="leading-relaxed">
                  Kamu bisa kembali ke Marketplace untuk melengkapinya agar skor
                  pemenuhan misi maksimal, atau klik tombol bayar sekali lagi
                  jika ingin langsung melihat penilaian.
                </p>
              </div>
            )}

            <button
              type="button"
              disabled={isCartEmpty || isOverBudget}
              onClick={handleCheckoutClick}
              className="w-full min-h-[52px] px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:text-slate-500 text-white font-display font-bold text-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" aria-hidden="true" />
              <span>
                {confirmIncomplete && !isAllMissionsFulfilled
                  ? 'Tetap Bayar & Lihat Hasil'
                  : 'Bayar & Lihat Hasil'}
              </span>
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
}
