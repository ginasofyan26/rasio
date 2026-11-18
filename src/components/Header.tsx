import { HelpCircle, ShoppingBag, Volume2, VolumeX } from 'lucide-react';
import { useGame } from '../context/GameContext';
import type { ScreenName } from '../types';

export function Header() {
  const {
    screen,
    setScreen,
    isMuted,
    toggleMute,
    setHowToPlayOpen,
    totalCartPacks,
    scoreReport,
  } = useGame();

  const navItems: Array<{ id: ScreenName; label: string; enabled: boolean }> = [
    { id: 'home', label: 'Beranda', enabled: true },
    { id: 'practice', label: 'Latihan', enabled: true },
    { id: 'mission', label: 'Misi', enabled: true },
    { id: 'marketplace', label: 'Marketplace', enabled: true },
    {
      id: 'cart',
      label: totalCartPacks > 0 ? `Keranjang (${totalCartPacks})` : 'Keranjang',
      enabled: true,
    },
    ...(scoreReport
      ? [{ id: 'result' as ScreenName, label: 'Hasil', enabled: true }]
      : []),
  ];

  return (
    <header className="no-print relative md:sticky md:top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 safe-top">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zona 1: Brand Wordmark satu baris */}
        <button
          type="button"
          onClick={() => setScreen('home')}
          className="inline-flex items-center gap-2 font-display text-lg sm:text-xl font-extrabold text-teal-800 tracking-tight whitespace-nowrap shrink-0 min-h-[44px]"
          aria-label="Kembali ke Beranda Belanja Bijak"
        >
          <ShoppingBag className="w-5 h-5 text-teal-600 shrink-0" aria-hidden="true" />
          <span>Belanja Bijak</span>
        </button>

        {/* Zona 2: Tautan navigasi teks bersih satu baris (desktop & tablet) */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600"
        >
          {navItems.map((item) => {
            const isActive = screen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setScreen(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`py-2 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                  isActive
                    ? 'text-teal-700 border-teal-600'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zona 3: Kontrol bantuan & suara ramah sentuhan */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setHowToPlayOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
            aria-label="Cara Bermain"
          >
            <HelpCircle className="w-5 h-5 text-teal-700" aria-hidden="true" />
            <span className="hidden sm:inline">Cara Bermain</span>
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            aria-label={isMuted ? 'Aktifkan efek suara' : 'Matikan efek suara'}
            aria-pressed={isMuted}
            title={isMuted ? 'Suara dimatikan' : 'Suara aktif'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-slate-500" aria-hidden="true" />
            ) : (
              <Volume2 className="w-5 h-5 text-teal-700" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
