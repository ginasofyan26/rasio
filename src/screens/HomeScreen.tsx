import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
  Lock,
  Star,
  Trash2,
} from 'lucide-react';
import { Mascot } from '../components/Mascot';
import { useGame } from '../context/GameContext';
import { BADGE_LIST, INITIAL_BUDGET } from '../data/products';
import type { DifficultyLevel } from '../types';
import { formatDateId, formatRupiah } from '../utils/format';

const DIFFICULTY_OPTIONS: Array<{
  id: DifficultyLevel;
  label: string;
  summary: string;
}> = [
  {
    id: 'mudah',
    label: 'Mudah',
    summary: '4 kebutuhan · satuan sederhana',
  },
  {
    id: 'sedang',
    label: 'Sedang',
    summary: '5 kebutuhan · campuran liter & kg',
  },
  {
    id: 'sulit',
    label: 'Sulit',
    summary: '6 kebutuhan · banyak promo jebakan',
  },
];

export function HomeScreen() {
  const {
    studentName,
    setStudentName,
    difficulty,
    setDifficulty,
    startNewSession,
    setScreen,
    setHowToPlayOpen,
    unlockedBadges,
    history,
    clearHistory,
  } = useGame();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Bagian Utama (Hero & Pengaturan Mulai) */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Kolom Kiri: Pengantar & Maskot */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-700">
              <span>Matematika Kelas 6 SD</span>
              <span aria-hidden="true">·</span>
              <span>Rasio & Harga Satuan</span>
              <span aria-hidden="true">·</span>
              <span>Modal {formatRupiah(INITIAL_BUDGET)}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Mascot mood="happy" size="lg" />
              <div className="space-y-2">
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                  Belanja Bijak di Marketplace
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  Yuk bantu Bibo memenuhi daftar belanja keluarga! Bandingkan
                  harga per satuan memakai konsep rasio agar pengeluaranmu
                  paling hemat.
                </p>
              </div>
            </div>

            {/* Tujuan belajar ringkas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-900 text-sm">
                  1. Hitung Harga Satuan
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Cari harga per biji, per liter, per kg, atau per 100 gram.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-900 text-sm">
                  2. Bandingkan Penawaran
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Temukan produk termurah dan kenali promo yang menjebak.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-slate-900 text-sm">
                  3. Kelola Anggaran
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Penuhi semua misi dengan modal {formatRupiah(INITIAL_BUDGET)}.
                </p>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Formulir Mulai Belanja */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5">
            <div>
              <label
                htmlFor="student-name-input"
                className="block text-sm font-bold text-slate-800 mb-1.5"
              >
                Nama Siswa (Opsional)
              </label>
              <input
                id="student-name-input"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                maxLength={40}
                placeholder="Contoh: Aisyah atau Bima"
                className="w-full min-h-[48px] px-4 rounded-xl bg-white border border-slate-300 text-slate-900 text-base font-semibold placeholder:text-slate-400 focus:border-teal-600"
              />
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-bold text-slate-800 mb-1">
                Pilih Tingkat Kesulitan
              </legend>
              <div className="grid grid-cols-1 gap-2">
                {DIFFICULTY_OPTIONS.map((opt) => {
                  const isSelected = difficulty === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDifficulty(opt.id)}
                      aria-pressed={isSelected}
                      className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl border text-left transition-colors flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-teal-600 border-teal-700 text-white shadow-sm'
                          : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-bold text-base whitespace-nowrap">
                        {opt.label}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-semibold ${
                          isSelected ? 'text-teal-50' : 'text-slate-500'
                        }`}
                      >
                        {opt.summary}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={() => startNewSession(difficulty)}
                className="w-full min-h-[52px] px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-display font-bold text-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Mulai Belanja</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setScreen('practice')}
                  className="min-h-[46px] px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Latihan Singkat</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHowToPlayOpen(true)}
                  className="min-h-[46px] px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <HelpCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Cara Bermain</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Papan Lencana & Riwayat Skor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Papan Lencana */}
        <section
          aria-labelledby="badge-board-title"
          className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 space-y-4"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Award className="w-6 h-6 text-amber-600 shrink-0" aria-hidden="true" />
              <h2
                id="badge-board-title"
                className="font-display text-xl sm:text-2xl font-bold text-slate-900"
              >
                Papan Lencana
              </h2>
            </div>
            <span className="text-sm font-bold text-slate-500 tabular-nums">
              {unlockedBadges.length} / {BADGE_LIST.length} terbuka
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BADGE_LIST.map((badge) => {
              const isUnlocked = unlockedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-colors flex items-start gap-3.5 ${
                    isUnlocked
                      ? 'bg-amber-50/70 border-amber-300'
                      : 'bg-slate-50 border-slate-200 opacity-80'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                      isUnlocked ? 'bg-white border border-amber-200' : 'bg-slate-200/70 grayscale'
                    }`}
                    aria-hidden="true"
                  >
                    {badge.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-900 text-sm truncate">
                        {badge.name}
                      </h3>
                      {isUnlocked ? (
                        <CheckCircle2
                          className="w-4 h-4 text-emerald-600 shrink-0"
                          aria-label="Lencana terbuka"
                        />
                      ) : (
                        <Lock
                          className="w-3.5 h-3.5 text-slate-400 shrink-0"
                          aria-label="Belum terbuka"
                        />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Riwayat Skor Terakhir */}
        <section
          aria-labelledby="history-title"
          className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between space-y-4"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-teal-700 shrink-0" aria-hidden="true" />
                <h2
                  id="history-title"
                  className="font-display text-xl sm:text-2xl font-bold text-slate-900"
                >
                  Riwayat Skor
                </h2>
              </div>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={clearHistory}
                  className="inline-flex items-center gap-1 min-h-[40px] px-2.5 rounded-lg text-xs font-bold text-slate-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                  aria-label="Hapus riwayat skor"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Bersihkan</span>
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <p className="text-3xl" aria-hidden="true">
                  📝
                </p>
                <p className="font-bold text-slate-800 text-sm">
                  Belum ada riwayat belanja
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Selesaikan satu sesi belanja untuk melihat catatan skor dan
                  perkembangan belajarmu di sini.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-200">
                {history.slice(0, 5).map((entry) => (
                  <li
                    key={entry.id}
                    className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-sm truncate">
                        {entry.studentName} ·{' '}
                        <span className="capitalize text-slate-600 font-semibold">
                          {entry.difficulty}
                        </span>
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {entry.predicate} · {formatDateId(entry.dateIso)}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono font-bold text-lg text-teal-700 tabular-nums">
                        {entry.finalScore}
                      </p>
                      <div
                        className="flex items-center justify-end gap-0.5"
                        aria-label={`${entry.stars} dari 5 bintang`}
                      >
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3.5 h-3.5 ${
                              idx < entry.stars
                                ? 'text-amber-500 fill-amber-400'
                                : 'text-slate-300'
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
