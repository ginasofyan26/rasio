import {
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  ShoppingBag,
  Wallet,
} from 'lucide-react';
import { Mascot } from '../components/Mascot';
import { useGame } from '../context/GameContext';
import { formatCategoryAmount, formatRupiah } from '../utils/format';

export function MissionScreen() {
  const {
    studentName,
    difficulty,
    budget,
    remainingBudget,
    totalSpent,
    missionProgress,
    fulfilledMissionCount,
    rerollMission,
    setScreen,
  } = useGame();

  const displayName = studentName.trim() || 'Pembelanja Hebat';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header Misi & Modal */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <Mascot mood="happy" size="md" />
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-bold text-teal-700 capitalize">
                Misi Belanja · Tingkat {difficulty}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                Halo {displayName}, Ini Daftar Belanjamu!
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl">
                Penuhi semua kebutuhan di bawah ini dengan memilih penawaran
                yang harga satuannya paling murah.
              </p>
            </div>
          </div>

          {/* Kartu Modal Real-Time */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 sm:p-5 min-w-[230px] shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800">
              <Wallet className="w-4 h-4" aria-hidden="true" />
              <span>{totalSpent > 0 ? 'Sisa Saldo Saat Ini' : 'Modal Belanja'}</span>
            </div>
            <p className="font-mono text-2xl sm:text-3xl font-extrabold text-teal-900 mt-1 tabular-nums">
              {formatRupiah(remainingBudget)}
            </p>
            {totalSpent > 0 ? (
              <p className="text-xs font-semibold text-teal-800 mt-1 tabular-nums">
                Terpakai {formatRupiah(totalSpent)} dari {formatRupiah(budget)}
              </p>
            ) : (
              <p className="text-xs font-semibold text-teal-800 mt-1">
                Saldo berkurang otomatis saat belanja
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Daftar Kebutuhan */}
      <section
        aria-labelledby="mission-list-heading"
        className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              id="mission-list-heading"
              className="font-display text-xl sm:text-2xl font-bold text-slate-900"
            >
              Daftar Kebutuhan ({fulfilledMissionCount}/{missionProgress.length}{' '}
              Terpenuhi)
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Kamu boleh membeli beberapa paket untuk mencapai jumlah minimal
              yang diminta.
            </p>
          </div>

          <button
            type="button"
            onClick={rerollMission}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm transition-colors whitespace-nowrap"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span>Acak Misi Lain</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {missionProgress.map((item, idx) => (
            <div
              key={item.category.id}
              className={`p-4 rounded-2xl border transition-colors flex items-start gap-3.5 ${
                item.isFulfilled
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div
                className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shrink-0"
                aria-hidden="true"
              >
                {item.category.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-500">
                    Misi {idx + 1}
                  </span>
                  {item.isFulfilled && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      Terpenuhi
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-900 text-base mt-0.5">
                  {item.category.name}
                </h3>
                <p className="text-sm font-extrabold text-teal-800 mt-1 tabular-nums">
                  Minimal{' '}
                  {formatCategoryAmount(
                    item.requirement.targetAmount,
                    item.category
                  )}
                </p>
                {item.boughtAmount > 0 && !item.isFulfilled && (
                  <p className="text-xs font-semibold text-amber-800 mt-1 tabular-nums">
                    Di keranjang:{' '}
                    {formatCategoryAmount(item.boughtAmount, item.category)} ·
                    Kurang{' '}
                    {formatCategoryAmount(item.remainingAmount, item.category)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tip Singkat */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="leading-relaxed">
            <strong className="font-bold">Ingat strategi Detektif Harga:</strong>{' '}
            Di Marketplace nanti harga satuan sengaja tidak ditampilkan. Hitung
            sendiri dengan <span className="font-mono font-bold">Harga ÷ Isi</span>{' '}
            atau gunakan Kalkulator Bantu!
          </p>
        </div>

        {/* Tombol Masuk ke Marketplace */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setScreen('marketplace')}
            className="min-h-[52px] px-7 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-display font-bold text-lg shadow-sm transition-all inline-flex items-center justify-center gap-2.5"
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            <span>Masuk ke Marketplace</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
