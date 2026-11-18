import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { useGame } from '../context/GameContext';
import { PRACTICE_QUESTIONS } from '../data/products';
import { playSound } from '../utils/sound';

export function PracticeScreen() {
  const {
    setScreen,
    startNewSession,
    setCalculatorOpen,
    unlockPracticeBadge,
    isMuted,
  } = useGame();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = PRACTICE_QUESTIONS[currentIndex];
  const isCorrect =
    isSubmitted && selectedOptionId === currentQuestion.correctOptionId;

  const handleSubmit = () => {
    if (!selectedOptionId || isSubmitted) return;
    setIsSubmitted(true);
    if (selectedOptionId === currentQuestion.correctOptionId) {
      playSound('success', isMuted);
      setCorrectCount((prev) => prev + 1);
    } else {
      playSound('warning', isMuted);
    }
  };

  const handleNext = () => {
    playSound('tap', isMuted);
    if (currentIndex + 1 < PRACTICE_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsSubmitted(false);
      setShowHint(false);
    } else {
      setIsFinished(true);
      if (correctCount === PRACTICE_QUESTIONS.length) {
        unlockPracticeBadge();
        playSound('fanfare', isMuted);
      }
    }
  };

  const handleRestart = () => {
    playSound('tap', isMuted);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setShowHint(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const perfect = correctCount === PRACTICE_QUESTIONS.length;
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-center space-y-6">
          <Mascot mood={perfect ? 'celebrating' : 'happy'} size="lg" />

          <div className="space-y-2">
            <p className="text-sm font-bold text-teal-700">
              Latihan Singkat Selesai
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Skor Latihanmu: {correctCount} / {PRACTICE_QUESTIONS.length}
            </h1>
            <p className="text-slate-600 text-base leading-relaxed max-w-md mx-auto">
              {perfect
                ? 'Luar biasa! Semua soal rasio kamu jawab dengan tepat. Kamu mendapatkan lencana "Juara Latihan" dan siap berbelanja bijak di Marketplace!'
                : 'Bagus! Kamu sudah berlatih membandingkan harga satuan. Sekarang ayo terapkan langsung saat belanja di Marketplace!'}
            </p>
          </div>

          {perfect && (
            <div className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-sm font-bold">
              <span aria-hidden="true" className="text-xl">
                ⭐
              </span>
              <span>Lencana Terbuka: Juara Latihan</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="w-full sm:w-auto min-h-[48px] px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm transition-colors inline-flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Ulangi Latihan</span>
            </button>
            <button
              type="button"
              onClick={() => startNewSession()}
              className="w-full sm:w-auto min-h-[48px] px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>Mulai Belanja Sekarang</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setScreen('home')}
          className="inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-200/70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          type="button"
          onClick={() => setCalculatorOpen(true)}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-sm transition-colors"
        >
          <Calculator className="w-4 h-4 text-teal-700" aria-hidden="true" />
          <span>Kalkulator Bantu</span>
        </button>
      </div>

      {/* Kartu Soal */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3 text-sm font-bold text-teal-700">
            <span>{currentQuestion.title}</span>
            <span className="tabular-nums text-slate-500">
              Benar: {correctCount}
            </span>
          </div>

          {/* Bilah Progres */}
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-600 transition-all duration-300"
              style={{
                width: `${
                  ((currentIndex + (isSubmitted ? 1 : 0.35)) /
                    PRACTICE_QUESTIONS.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
          {currentQuestion.story}
        </p>

        {/* Pilihan Jawaban */}
        <div className="space-y-3" role="radiogroup" aria-label="Pilihan jawaban">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isOptionCorrect = opt.id === currentQuestion.correctOptionId;

            let cardStyle =
              'bg-white border-slate-300 hover:bg-slate-50 text-slate-900';
            if (isSubmitted) {
              if (isOptionCorrect) {
                cardStyle =
                  'bg-emerald-50 border-emerald-500 text-emerald-950';
              } else if (isSelected && !isOptionCorrect) {
                cardStyle = 'bg-rose-50 border-rose-500 text-rose-950';
              } else {
                cardStyle = 'bg-slate-50 border-slate-200 text-slate-500';
              }
            } else if (isSelected) {
              cardStyle = 'bg-teal-50 border-teal-600 text-teal-950';
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isSubmitted}
                onClick={() => {
                  playSound('tap', isMuted);
                  setSelectedOptionId(opt.id);
                }}
                role="radio"
                aria-checked={isSelected}
                className={`w-full min-h-[56px] p-4 rounded-2xl border-2 text-left transition-colors flex items-center justify-between gap-3 ${cardStyle}`}
              >
                <div>
                  <p className="font-bold text-base">{opt.label}</p>
                  <p className="text-xs sm:text-sm opacity-80 mt-0.5">
                    {opt.detail}
                  </p>
                </div>
                {isSubmitted && isOptionCorrect && (
                  <CheckCircle2
                    className="w-6 h-6 text-emerald-600 shrink-0"
                    aria-label="Jawaban benar"
                  />
                )}
                {isSubmitted && isSelected && !isOptionCorrect && (
                  <XCircle
                    className="w-6 h-6 text-rose-600 shrink-0"
                    aria-label="Jawaban belum tepat"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Petunjuk Opsional */}
        {!isSubmitted && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShowHint((prev) => !prev)}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-xl text-sm font-bold text-amber-800 hover:bg-amber-50 transition-colors"
            >
              <Lightbulb className="w-4 h-4" aria-hidden="true" />
              <span>{showHint ? 'Sembunyikan Petunjuk' : 'Butuh Petunjuk?'}</span>
            </button>

            {showHint && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-950 leading-relaxed">
                <strong className="font-bold">Petunjuk:</strong>{' '}
                {currentQuestion.hint}
              </div>
            )}
          </div>
        )}

        {/* Umpan Balik Pembahasan */}
        {isSubmitted && (
          <div
            className={`p-5 rounded-2xl border space-y-1.5 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
            aria-live="polite"
          >
            <p className="font-display font-bold text-lg">
              {isCorrect
                ? 'Tepat sekali! Kamu menghitung rasio dengan benar.'
                : 'Belum tepat, yuk lihat cara menghitungnya:'}
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Tombol Aksi */}
        <div className="flex justify-end pt-2">
          {!isSubmitted ? (
            <button
              type="button"
              disabled={!selectedOptionId}
              onClick={handleSubmit}
              className="w-full sm:w-auto min-h-[48px] px-7 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold text-base transition-colors"
            >
              Periksa Jawaban
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="w-full sm:w-auto min-h-[48px] px-7 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>
                {currentIndex + 1 < PRACTICE_QUESTIONS.length
                  ? 'Soal Berikutnya'
                  : 'Lihat Hasil Latihan'}
              </span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
