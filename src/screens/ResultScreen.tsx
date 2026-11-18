import {
  AlertCircle,
  AlertTriangle,
  Award,
  BookOpen,
  CheckCircle2,
  Printer,
  RefreshCw,
  RotateCcw,
  Star,
} from 'lucide-react';
import { ConfettiCanvas } from '../components/ConfettiCanvas';
import { Mascot } from '../components/Mascot';
import { ProductArtwork } from '../components/ProductArtwork';
import { useGame } from '../context/GameContext';
import { BADGE_LIST } from '../data/products';
import type { EfficiencyStatus } from '../types';
import { formatCategoryAmount, formatDateId, formatRupiah } from '../utils/format';

function getStatusMeta(status: EfficiencyStatus): {
  label: string;
  classes: string;
  icon: 'check' | 'warn' | 'danger';
} {
  switch (status) {
    case 'hemat':
      return {
        label: 'Hemat',
        classes: 'text-emerald-800 bg-emerald-50 border-emerald-300',
        icon: 'check',
      };
    case 'kurang-hemat':
      return {
        label: 'Kurang Hemat',
        classes: 'text-amber-900 bg-amber-50 border-amber-300',
        icon: 'warn',
      };
    case 'boros':
      return {
        label: 'Boros',
        classes: 'text-rose-800 bg-rose-50 border-rose-300',
        icon: 'danger',
      };
    case 'belum-dibeli':
      return {
        label: 'Belum Dibeli',
        classes: 'text-slate-700 bg-slate-100 border-slate-300',
        icon: 'warn',
      };
  }
}

export function ResultScreen() {
  const {
    scoreReport,
    studentName,
    difficulty,
    replaySameMission,
    startNewSession,
    setScreen,
  } = useGame();

  if (!scoreReport) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-4">
        <p className="font-display text-2xl font-bold text-slate-900">
          Belum ada hasil belanja untuk ditampilkan.
        </p>
        <button
          type="button"
          onClick={() => setScreen('home')}
          className="min-h-[48px] px-6 py-2.5 rounded-xl bg-teal-600 text-white font-bold"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const displayName = studentName.trim() || 'Siswa Hebat';
  const showConfetti = scoreReport.finalScore >= 75;
  const newlyUnlockedBadgeInfos = BADGE_LIST.filter((b) =>
    scoreReport.newlyUnlockedBadges.includes(b.id)
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <ConfettiCanvas active={showConfetti} />

      {/* Header Khusus Cetak (Print-only) */}
      <div className="hidden print-only border-b-2 border-slate-800 pb-3 mb-4">
        <h1 className="font-display text-2xl font-extrabold text-slate-900">
          Laporan Hasil Belajar — Belanja Bijak di Marketplace
        </h1>
        <p className="text-sm text-slate-700 mt-1">
          Materi: Rasio (Perbandingan) & Harga Satuan Kelas 6 SD · Nama:{' '}
          <strong>{displayName}</strong> · Tingkat:{' '}
          <strong className="capitalize">{difficulty}</strong> · Tanggal:{' '}
          {formatDateId(new Date().toISOString())}
        </p>
      </div>

      {/* Kartu Skor Utama */}
      <section className="print-clean-card bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Mascot
              mood={scoreReport.finalScore >= 75 ? 'celebrating' : 'happy'}
              size="lg"
            />
            <div className="space-y-1.5">
              <p className="text-xs sm:text-sm font-bold text-teal-700 capitalize">
                Hasil Penilaian · {displayName} · Tingkat {difficulty}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                {scoreReport.predicate}
              </h1>
              {/* Bintang 1-5 */}
              <div
                className="flex items-center gap-1 pt-1"
                aria-label={`Mendapatkan ${scoreReport.stars} dari 5 bintang`}
              >
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-7 h-7 ${
                      idx < scoreReport.stars
                        ? 'text-amber-500 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-2 text-sm font-bold text-slate-600 tabular-nums">
                  ({scoreReport.stars} / 5 Bintang)
                </span>
              </div>
            </div>
          </div>

          {/* Nilai Akhir 0-100 */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl px-6 py-4 text-center min-w-[160px] shrink-0">
            <p className="text-xs font-bold text-teal-800">Skor Akhir</p>
            <p className="font-mono text-5xl font-extrabold text-teal-900 tabular-nums leading-tight">
              {scoreReport.finalScore}
            </p>
            <p className="text-xs font-bold text-teal-700">dari 100</p>
          </div>
        </div>

        {/* Lencana Baru */}
        {newlyUnlockedBadgeInfos.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-2 print-break-inside-avoid">
            <div className="flex items-center gap-2 font-bold text-amber-950 text-sm">
              <Award className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
              <span>Selamat! Kamu membuka lencana baru:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {newlyUnlockedBadgeInfos.map((badge) => (
                <div
                  key={badge.id}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-amber-200 text-sm font-bold text-slate-900"
                >
                  <span aria-hidden="true">{badge.emoji}</span>
                  <span>{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3 Aspek Penilaian (60% / 25% / 15%) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Ketepatan Harga Satuan</span>
              <span>Bobot 60%</span>
            </div>
            <p className="font-mono text-2xl font-extrabold text-slate-900 tabular-nums">
              {scoreReport.accuracyScore} / 100
            </p>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-600"
                style={{ width: `${scoreReport.accuracyScore}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Pemenuhan Misi</span>
              <span>Bobot 25%</span>
            </div>
            <p className="font-mono text-2xl font-extrabold text-slate-900 tabular-nums">
              {scoreReport.missionScore} / 100
            </p>
            <p className="text-xs font-semibold text-slate-500 tabular-nums">
              {scoreReport.fulfilledMissionCount} dari{' '}
              {scoreReport.totalMissionCount} kebutuhan terpenuhi
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Efisiensi Anggaran</span>
              <span>Bobot 15%</span>
            </div>
            <p className="font-mono text-2xl font-extrabold text-slate-900 tabular-nums">
              {scoreReport.efficiencyScore} / 100
            </p>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600"
                style={{ width: `${scoreReport.efficiencyScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Ringkasan Uang & Penghematan */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200">
          <div>
            <p className="text-xs font-bold text-slate-500">Total Belanja</p>
            <p className="font-mono text-xl font-extrabold text-slate-900 tabular-nums mt-0.5">
              {formatRupiah(scoreReport.totalSpent)}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">Sisa Saldo</p>
            <p className="font-mono text-xl font-extrabold text-teal-800 tabular-nums mt-0.5">
              {formatRupiah(scoreReport.remainingBudget)}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">
              Potensi Penghematan Tambahan
            </p>
            <p
              className={`font-mono text-xl font-extrabold tabular-nums mt-0.5 ${
                scoreReport.totalPotentialSavings === 0
                  ? 'text-emerald-700'
                  : 'text-amber-700'
              }`}
            >
              {scoreReport.totalPotentialSavings === 0
                ? 'Rp0 (Sudah Paling Hemat!)'
                : formatRupiah(scoreReport.totalPotentialSavings)}
            </p>
          </div>
        </div>

        {/* Umpan Balik Naratif */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <p className="text-base font-bold text-slate-900 leading-relaxed">
            {scoreReport.narrativeFeedback}
          </p>
          <ul className="space-y-1.5 text-sm text-slate-700 list-disc pl-5">
            {scoreReport.tips.map((tip, index) => (
              <li key={index} className="leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Rincian Penilaian Per Kategori */}
      <section
        aria-labelledby="detail-eval-heading"
        className="space-y-4"
      >
        <div>
          <h2
            id="detail-eval-heading"
            className="font-display text-2xl font-extrabold text-slate-900"
          >
            Rincian Perhitungan Harga Satuan per Kategori
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Bandingkan pilihanmu dengan penawaran yang memiliki harga satuan
            paling murah.
          </p>
        </div>

        <div className="space-y-4">
          {scoreReport.categoryEvaluations.map((ev) => {
            const statusMeta = getStatusMeta(ev.status);

            return (
              <article
                key={ev.category.id}
                className="print-clean-card print-break-inside-avoid bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4"
              >
                {/* Header Kategori */}
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl" aria-hidden="true">
                        {ev.category.emoji}
                      </span>
                      <h3 className="font-display text-xl font-bold text-slate-900">
                        {ev.category.name}
                      </h3>
                      {!ev.isMissionCategory && (
                        <span className="text-xs font-bold text-slate-500">
                          · Di luar misi
                        </span>
                      )}
                    </div>
                    {ev.isMissionCategory && (
                      <p className="text-xs sm:text-sm text-slate-600 font-semibold tabular-nums">
                        Target misi:{' '}
                        {formatCategoryAmount(ev.targetAmount, ev.category)} ·
                        Dibeli:{' '}
                        {formatCategoryAmount(ev.boughtAmount, ev.category)} (
                        {ev.isFulfilled ? 'Terpenuhi' : 'Belum terpenuhi'})
                      </p>
                    )}
                  </div>

                  {/* Indikator Hemat / Kurang Hemat / Boros + Skor Kategori */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-extrabold ${statusMeta.classes}`}
                    >
                      {statusMeta.icon === 'check' && (
                        <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                      )}
                      {statusMeta.icon === 'warn' && (
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      )}
                      {statusMeta.icon === 'danger' && (
                        <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      )}
                      <span>{statusMeta.label}</span>
                    </div>
                    <span className="font-mono text-sm font-extrabold text-slate-700 tabular-nums">
                      Skor {ev.categoryScore}
                    </span>
                  </div>
                </div>

                {/* Perbandingan Pilihan Siswa vs Termurah */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <p className="text-xs font-bold text-slate-500">
                      Pilihanmu
                    </p>
                    {ev.purchasedOffers.length === 0 ? (
                      <p className="text-sm font-bold text-slate-700">
                        Belum membeli produk di kategori ini.
                      </p>
                    ) : (
                      <>
                        <ul className="space-y-2">
                          {ev.purchasedOffers.map((p) => (
                            <li
                              key={p.product.id}
                              className="flex items-center gap-3 text-sm font-bold text-slate-900"
                            >
                              <ProductArtwork
                                productId={p.product.id}
                                name={p.product.name}
                                fallbackEmoji={p.product.emoji}
                                size="sm"
                              />
                              <span className="leading-snug">
                                {p.quantity}× {p.product.name} (
                                {p.product.packLabel}) —{' '}
                                <span className="font-mono tabular-nums">
                                  {formatRupiah(p.subtotal)}
                                </span>
                              </span>
                            </li>
                          ))}
                        </ul>
                        {ev.studentUnitPrice !== null && (
                          <p className="text-sm font-mono font-bold text-teal-800 pt-1 tabular-nums">
                            Harga satuan pilihanmu:{' '}
                            {formatRupiah(ev.studentUnitPrice)} /{' '}
                            {ev.category.normalizedUnitLabel}
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                    <p className="text-xs font-bold text-emerald-800">
                      Penawaran Paling Hemat
                    </p>
                    <div className="flex items-center gap-3">
                      <ProductArtwork
                        productId={ev.cheapestOffer.id}
                        name={ev.cheapestOffer.name}
                        fallbackEmoji={ev.cheapestOffer.emoji}
                        size="sm"
                      />
                      <div className="space-y-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 leading-snug">
                          {ev.cheapestOffer.name} ({ev.cheapestOffer.storeName}) —{' '}
                          {ev.cheapestOffer.packLabel}
                        </p>
                        <p className="text-sm font-mono font-extrabold text-emerald-800 tabular-nums">
                          Harga satuan termurah: {formatRupiah(ev.bestUnitPrice)} /{' '}
                          {ev.category.normalizedUnitLabel}
                        </p>
                      </div>
                    </div>
                    {ev.wastedMoney > 0 && (
                      <p className="text-xs font-bold text-rose-700 pt-0.5 tabular-nums">
                        Selisih uang yang terbuang: {formatRupiah(ev.wastedMoney)}{' '}
                        ({ev.diffPercent}% lebih mahal per{' '}
                        {ev.category.normalizedUnitLabel})
                      </p>
                    )}
                  </div>
                </div>

                {/* Penjelasan Jebakan jika siswa memilih produk jebakan */}
                {ev.purchasedOffers
                  .filter((p) => Boolean(p.product.trapReason))
                  .map((p) => (
                    <div
                      key={`trap-${p.product.id}`}
                      className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950"
                    >
                      <strong className="font-bold">Catatan Cermat:</strong>{' '}
                      {p.product.trapReason}
                    </div>
                  ))}

                {/* Tabel Rumus Seluruh Penawaran di Kategori Ini */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="py-2 pr-3 font-bold">Penawaran</th>
                        <th className="py-2 pr-3 font-bold">Perhitungan Rasio</th>
                        <th className="py-2 font-bold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ev.allOffers.map((offerEv) => {
                        const wasChosen = ev.purchasedOffers.some(
                          (p) => p.product.id === offerEv.product.id
                        );
                        return (
                          <tr
                            key={offerEv.product.id}
                            className={
                              offerEv.isCheapest
                                ? 'bg-emerald-50/50 font-semibold'
                                : ''
                            }
                          >
                            <td className="py-2 pr-3 text-slate-900">
                              <span className="font-bold">
                                {offerEv.product.name}
                              </span>{' '}
                              <span className="text-slate-500">
                                ({offerEv.product.packLabel})
                              </span>
                            </td>
                            <td className="py-2 pr-3 font-mono text-slate-800 tabular-nums whitespace-nowrap">
                              {offerEv.formulaText}
                            </td>
                            <td className="py-2 text-right whitespace-nowrap">
                              {offerEv.isCheapest && (
                                <span className="text-emerald-700 font-bold">
                                  Termurah
                                </span>
                              )}
                              {wasChosen && (
                                <span className="text-teal-700 font-bold ml-2">
                                  {offerEv.isCheapest
                                    ? '· Pilihanmu'
                                    : 'Pilihanmu'}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Kotak Konsep Matematika */}
      <section
        aria-labelledby="concept-box-heading"
        className="print-clean-card print-break-inside-avoid bg-teal-50 rounded-3xl border border-teal-200 p-6 sm:p-7 space-y-3"
      >
        <div className="flex items-center gap-2.5 text-teal-900">
          <BookOpen className="w-6 h-6 shrink-0" aria-hidden="true" />
          <h2
            id="concept-box-heading"
            className="font-display text-xl sm:text-2xl font-extrabold"
          >
            Ingat Konsep Rasio & Harga Satuan!
          </h2>
        </div>

        <p className="font-mono text-base sm:text-lg font-extrabold text-teal-950 bg-white border border-teal-200 rounded-xl px-4 py-3 inline-block">
          Rasio Harga : Jumlah = Harga per Satuan
        </p>

        <p className="text-sm sm:text-base text-teal-950 leading-relaxed">
          Untuk mengetahui penawaran yang paling hemat, selalu bagi{' '}
          <strong>harga paket</strong> dengan <strong>jumlah isinya</strong>{' '}
          pada satuan yang sama (misalnya per biji, per buah, per liter, per kg,
          atau per 100 gram). Penawaran dengan hasil pembagian paling kecil
          adalah yang paling hemat!
        </p>
      </section>

      {/* Tombol Aksi Akhir */}
      <div className="no-print flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={replaySameMission}
            className="min-h-[48px] px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm sm:text-base transition-colors inline-flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Main Lagi</span>
          </button>

          <button
            type="button"
            onClick={() => startNewSession()}
            className="min-h-[48px] px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm sm:text-base transition-colors inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Coba Skenario Baru</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="min-h-[48px] px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm sm:text-base transition-colors inline-flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Unduh / Cetak Hasil</span>
        </button>
      </div>
    </div>
  );
}
