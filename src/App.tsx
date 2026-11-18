import { X } from 'lucide-react';
import { useEffect } from 'react';
import { CalculatorModal } from './components/CalculatorModal';
import { Header } from './components/Header';
import { HintModal } from './components/HintModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { GameProvider, useGame } from './context/GameContext';
import { CartScreen } from './screens/CartScreen';
import { HomeScreen } from './screens/HomeScreen';
import { MarketplaceScreen } from './screens/MarketplaceScreen';
import { MissionScreen } from './screens/MissionScreen';
import { PracticeScreen } from './screens/PracticeScreen';
import { ResultScreen } from './screens/ResultScreen';

function ToastNotification() {
  const { toastMessage, clearToast } = useGame();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => {
      clearToast();
    }, 3600);
    return () => window.clearTimeout(timer);
  }, [toastMessage, clearToast]);

  if (!toastMessage) return null;

  const colorClasses =
    toastMessage.type === 'warning'
      ? 'bg-rose-700 text-white'
      : toastMessage.type === 'success'
      ? 'bg-teal-800 text-white'
      : 'bg-slate-900 text-white';

  return (
    <div
      role="status"
      aria-live="polite"
      className="no-print fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md safe-bottom"
    >
      <div
        className={`rounded-2xl shadow-lg px-4 py-3 flex items-center justify-between gap-3 text-sm font-bold ${colorClasses}`}
      >
        <span className="leading-snug">{toastMessage.text}</span>
        <button
          type="button"
          onClick={clearToast}
          className="min-h-[36px] min-w-[36px] rounded-lg hover:bg-white/15 flex items-center justify-center shrink-0"
          aria-label="Tutup pemberitahuan"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function AppContent() {
  const { screen } = useGame();

  return (
    <div className="min-h-screen-safe flex flex-col bg-[#F4F7FB] text-slate-900">
      <Header />

      <main className="flex-1">
        {screen === 'home' && <HomeScreen />}
        {screen === 'practice' && <PracticeScreen />}
        {screen === 'mission' && <MissionScreen />}
        {screen === 'marketplace' && <MarketplaceScreen />}
        {screen === 'cart' && <CartScreen />}
        {screen === 'result' && <ResultScreen />}
      </main>

      <footer className="no-print border-t border-slate-200 bg-white py-5 px-4 text-center text-xs sm:text-sm text-slate-500 safe-bottom">
        <p className="font-semibold">
          Belanja Bijak di Marketplace · Media Pembelajaran Matematika Kelas 6
          SD (Rasio & Harga Satuan)
        </p>
      </footer>

      <ToastNotification />
      <CalculatorModal />
      <HintModal />
      <HowToPlayModal />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
