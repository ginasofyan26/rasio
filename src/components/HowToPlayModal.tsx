import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useGame } from '../context/GameContext';

export function HowToPlayModal() {
  const { isHowToPlayOpen, setHowToPlayOpen } = useGame();

  useEffect(() => {
    if (!isHowToPlayOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setHowToPlayOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isHowToPlayOpen, setHowToPlayOpen]);

  if (!isHowToPlayOpen) return null;

  const steps = [
    {
      num: '01.',
      title: 'Cek Modal & Daftar Kebutuhan',
      desc: 'Kamu diberi modal belanja Rp300.000 beserta daftar kebutuhan (misi) yang harus dipenuhi, misalnya 20 biji biskuit, 6 liter air mineral, dan lainnya.',
    },
    {
      num: '02.',
      title: 'Bandingkan Harga per Satuan',
      desc: 'Di Marketplace, setiap produk punya isi dan harga berbeda. Hitung harga satuannya memakai rasio (Harga ÷ Isi). Hati-hati, kemasan jumbo atau bonus belum tentu paling murah!',
    },
    {
      num: '03.',
      title: 'Gunakan Kalkulator & Petunjuk',
      desc: 'Jika kesulitan menghitung, buka Kalkulator Bantu atau tombol Petunjuk kapan saja. Ingat konversi satuan: 1 liter = 1.000 ml dan 1 kg = 1.000 gram.',
    },
    {
      num: '04.',
      title: 'Bayar & Lihat Penilaian',
      desc: 'Pastikan total belanja tidak melebihi Rp300.000 dan semua misi terpenuhi. Setelah checkout, kamu akan melihat skor, bintang, rincian perhitungan, dan lencana!',
    },
  ];

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 p-4 safe-bottom"
      role="dialog"
      aria-modal="true"
      aria-labelledby="howto-title"
      onClick={() => setHowToPlayOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-h-[88dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2
            id="howto-title"
            className="font-display text-xl font-extrabold text-slate-900"
          >
            Cara Bermain Belanja Bijak
          </h2>
          <button
            type="button"
            onClick={() => setHowToPlayOpen(false)}
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl text-slate-600 hover:bg-slate-200 transition-colors"
            aria-label="Tutup panduan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          <ol className="space-y-4">
            {steps.map((step) => (
              <li key={step.num} className="flex gap-3.5 items-start">
                <span className="font-display font-extrabold text-teal-700 text-lg shrink-0 mt-0.5 tabular-nums">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-950">
            <p className="font-bold mb-1">Aspek Penilaian Otomatis:</p>
            <p className="leading-relaxed">
              Ketepatan memilih harga satuan termurah (60%) · Pemenuhan daftar
              kebutuhan (25%) · Efisiensi sisa anggaran (15%).
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={() => setHowToPlayOpen(false)}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors"
          >
            Saya Paham!
          </button>
        </div>
      </div>
    </div>
  );
}
