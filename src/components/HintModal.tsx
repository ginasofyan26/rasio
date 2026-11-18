import { Lightbulb, X } from 'lucide-react';
import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { getCategoryById } from '../data/products';

/**
 * Modal petunjuk belajar (Hint) yang membimbing cara berpikir rasio
 * tanpa langsung membocorkan produk mana yang termurah.
 */
export function HintModal() {
  const { hintCategoryId, setHintCategoryId, mission, setCalculatorOpen } =
    useGame();

  useEffect(() => {
    if (!hintCategoryId) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setHintCategoryId(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hintCategoryId, setHintCategoryId]);

  if (!hintCategoryId) return null;

  const focusedCategory =
    hintCategoryId === 'all' ? null : getCategoryById(hintCategoryId);

  const missionCategories = mission
    .map((req) => getCategoryById(req.categoryId))
    .filter((cat): cat is NonNullable<typeof cat> => Boolean(cat));

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 p-4 safe-bottom"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hint-modal-title"
      onClick={() => setHintCategoryId(null)}
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-h-[85dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-amber-50">
          <div className="flex items-center gap-2.5">
            <Lightbulb className="w-6 h-6 text-amber-600 shrink-0" aria-hidden="true" />
            <h2
              id="hint-modal-title"
              className="font-display text-xl font-bold text-slate-900"
            >
              Petunjuk Detektif Harga
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setHintCategoryId(null)}
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl text-slate-600 hover:bg-amber-100 transition-colors"
            aria-label="Tutup petunjuk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-slate-700">
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
            <p className="text-sm font-bold text-teal-900 mb-1">
              Ingat Rumus Rasio Harga Satuan:
            </p>
            <p className="font-mono text-sm sm:text-base font-bold text-teal-800">
              Harga per Satuan = Harga Paket ÷ Isi Paket
            </p>
            <p className="text-xs sm:text-sm text-teal-800 mt-1.5">
              Sebelum membandingkan dua produk, pastikan satuannya sudah sama
              (misalnya sama-sama per biji, per liter, per kg, atau per 100 g).
            </p>
          </div>

          {focusedCategory ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-display font-bold text-lg text-slate-900">
                <span aria-hidden="true">{focusedCategory.emoji}</span>
                <span>Tips untuk {focusedCategory.name}</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed">
                {focusedCategory.hint}
              </p>
              <p className="text-xs font-semibold text-slate-500">
                Satuan pembanding: per {focusedCategory.normalizedUnitLabel}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-800">
                Petunjuk untuk kategori dalam misimu:
              </p>
              {missionCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {cat.emoji} {cat.name}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Bandingkan per {cat.normalizedUnitLabel}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {cat.hint}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setHintCategoryId(null);
              setCalculatorOpen(true);
            }}
            className="min-h-[44px] px-4 py-2 rounded-xl border border-teal-600 text-teal-700 font-bold text-sm hover:bg-teal-50 transition-colors whitespace-nowrap"
          >
            Buka Kalkulator Bantu
          </button>
          <button
            type="button"
            onClick={() => setHintCategoryId(null)}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors whitespace-nowrap"
          >
            Siap, Mengerti!
          </button>
        </div>
      </div>
    </div>
  );
}
