import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { INITIAL_BUDGET, getProductById } from '../data/products';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type {
  BadgeId,
  CartItem,
  DifficultyLevel,
  MissionRequirement,
  ScoreReport,
  ScreenName,
  SessionHistoryEntry,
} from '../types';
import { formatRupiah } from '../utils/format';
import {
  calculateCartTotal,
  evaluateMissionProgress,
  evaluateShoppingSession,
  generateMission,
} from '../utils/scoring';
import { playSound } from '../utils/sound';

interface GameContextValue {
  screen: ScreenName;
  setScreen: (screen: ScreenName) => void;
  studentName: string;
  setStudentName: (name: string) => void;
  difficulty: DifficultyLevel;
  setDifficulty: (level: DifficultyLevel) => void;
  mission: MissionRequirement[];
  cart: CartItem[];
  budget: number;
  totalSpent: number;
  remainingBudget: number;
  totalCartPacks: number;
  missionProgress: ReturnType<typeof evaluateMissionProgress>;
  fulfilledMissionCount: number;
  scoreReport: ScoreReport | null;
  history: SessionHistoryEntry[];
  unlockedBadges: BadgeId[];
  isMuted: boolean;
  toggleMute: () => void;
  toastMessage: { text: string; type: 'info' | 'warning' | 'success' } | null;
  clearToast: () => void;
  isCalculatorOpen: boolean;
  setCalculatorOpen: (open: boolean) => void;
  isHowToPlayOpen: boolean;
  setHowToPlayOpen: (open: boolean) => void;
  hintCategoryId: string | null;
  setHintCategoryId: (categoryId: string | null) => void;
  startNewSession: (selectedDifficulty?: DifficultyLevel) => void;
  rerollMission: () => void;
  replaySameMission: () => void;
  addToCart: (productId: string) => void;
  updateCartQuantity: (productId: string, nextQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkoutAndEvaluate: () => boolean;
  unlockPracticeBadge: () => void;
  clearHistory: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreenState] = useState<ScreenName>('home');
  const [studentName, setStudentName] = useLocalStorage<string>(
    'bbm_student_name',
    ''
  );
  const [difficulty, setDifficulty] = useLocalStorage<DifficultyLevel>(
    'bbm_difficulty',
    'sedang'
  );
  const [history, setHistory] = useLocalStorage<SessionHistoryEntry[]>(
    'bbm_score_history',
    []
  );
  const [unlockedBadges, setUnlockedBadges] = useLocalStorage<BadgeId[]>(
    'bbm_unlocked_badges',
    []
  );
  const [isMuted, setIsMuted] = useLocalStorage<boolean>('bbm_muted', false);

  const [mission, setMission] = useState<MissionRequirement[]>(() =>
    generateMission('sedang')
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [scoreReport, setScoreReport] = useState<ScoreReport | null>(null);

  const [isCalculatorOpen, setCalculatorOpen] = useState(false);
  const [isHowToPlayOpen, setHowToPlayOpen] = useState(false);
  const [hintCategoryId, setHintCategoryId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'info' | 'warning' | 'success';
  } | null>(null);

  const showToast = useCallback(
    (text: string, type: 'info' | 'warning' | 'success' = 'info') => {
      setToastMessage({ text, type });
    },
    []
  );

  const clearToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  const setScreen = useCallback(
    (next: ScreenName) => {
      playSound('tap', isMuted);
      setToastMessage(null);
      setScreenState(next);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [isMuted]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, [setIsMuted]);

  const budget = INITIAL_BUDGET;

  const totalSpent = useMemo(() => calculateCartTotal(cart), [cart]);
  const remainingBudget = budget - totalSpent;

  const totalCartPacks = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const missionProgress = useMemo(
    () => evaluateMissionProgress(mission, cart),
    [mission, cart]
  );

  const fulfilledMissionCount = useMemo(
    () => missionProgress.filter((entry) => entry.isFulfilled).length,
    [missionProgress]
  );

  const startNewSession = useCallback(
    (selectedDifficulty?: DifficultyLevel) => {
      const activeDifficulty = selectedDifficulty ?? difficulty;
      if (selectedDifficulty) {
        setDifficulty(selectedDifficulty);
      }
      const nextMission = generateMission(activeDifficulty);
      setMission(nextMission);
      setCart([]);
      setScoreReport(null);
      setToastMessage(null);
      playSound('success', isMuted);
      setScreenState('mission');
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [difficulty, isMuted, setDifficulty]
  );

  const rerollMission = useCallback(() => {
    const nextMission = generateMission(difficulty);
    setMission(nextMission);
    setCart([]);
    setScoreReport(null);
    playSound('tap', isMuted);
    showToast('Daftar kebutuhan baru sudah disiapkan!', 'info');
  }, [difficulty, isMuted, showToast]);

  const replaySameMission = useCallback(() => {
    setCart([]);
    setScoreReport(null);
    setToastMessage(null);
    playSound('tap', isMuted);
    setScreenState('marketplace');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isMuted]);

  const addToCart = useCallback(
    (productId: string) => {
      const product = getProductById(productId);
      if (!product) return;

      const currentTotal = calculateCartTotal(cart);
      if (currentTotal + product.price > budget) {
        playSound('warning', isMuted);
        showToast(
          `Wah, saldo tidak cukup! Sisa saldomu ${formatRupiah(
            budget - currentTotal
          )}, sedangkan harga paket ini ${formatRupiah(product.price)}.`,
          'warning'
        );
        return;
      }

      setCart((prev) => {
        const existing = prev.find((item) => item.productId === productId);
        if (existing) {
          return prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { productId, quantity: 1 }];
      });

      playSound('add', isMuted);
      showToast(
        `${product.name} ditambahkan ke keranjang (${formatRupiah(
          product.price
        )}).`,
        'success'
      );
    },
    [budget, cart, isMuted, showToast]
  );

  const updateCartQuantity = useCallback(
    (productId: string, nextQuantity: number) => {
      const product = getProductById(productId);
      if (!product) return;

      if (nextQuantity <= 0) {
        setCart((prev) => prev.filter((item) => item.productId !== productId));
        playSound('remove', isMuted);
        return;
      }

      const currentItem = cart.find((item) => item.productId === productId);
      const currentQty = currentItem ? currentItem.quantity : 0;
      const delta = nextQuantity - currentQty;

      if (delta > 0) {
        const currentTotal = calculateCartTotal(cart);
        const additionalCost = delta * product.price;
        if (currentTotal + additionalCost > budget) {
          playSound('warning', isMuted);
          showToast(
            `Ups, total belanja tidak boleh melebihi modal ${formatRupiah(
              budget
            )}! Kurangi barang lain terlebih dahulu.`,
            'warning'
          );
          return;
        }
      }

      setCart((prev) => {
        const exists = prev.some((item) => item.productId === productId);
        if (!exists) {
          return [...prev, { productId, quantity: nextQuantity }];
        }
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: nextQuantity }
            : item
        );
      });

      playSound(delta >= 0 ? 'add' : 'remove', isMuted);
    },
    [budget, cart, isMuted, showToast]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      playSound('remove', isMuted);
    },
    [isMuted]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    playSound('remove', isMuted);
    showToast('Keranjang sudah dikosongkan.', 'info');
  }, [isMuted, showToast]);

  const checkoutAndEvaluate = useCallback((): boolean => {
    const validCart = cart.filter((item) => item.quantity > 0);
    if (validCart.length === 0) {
      playSound('warning', isMuted);
      showToast(
        'Keranjangmu masih kosong! Yuk pilih barang di Marketplace terlebih dahulu.',
        'warning'
      );
      return false;
    }

    const spent = calculateCartTotal(validCart);
    if (spent > budget) {
      playSound('warning', isMuted);
      showToast(
        `Total belanja (${formatRupiah(spent)}) melebihi modal ${formatRupiah(
          budget
        )}. Kurangi beberapa paket terlebih dahulu ya!`,
        'warning'
      );
      return false;
    }

    const report = evaluateShoppingSession({
      cart: validCart,
      mission,
      difficulty,
      budget,
      existingBadges: unlockedBadges,
    });

    setScoreReport(report);

    if (report.newlyUnlockedBadges.length > 0) {
      setUnlockedBadges((prev) =>
        Array.from(new Set([...prev, ...report.newlyUnlockedBadges]))
      );
    }

    const newEntry: SessionHistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      studentName: studentName.trim() || 'Siswa Hebat',
      dateIso: new Date().toISOString(),
      difficulty,
      finalScore: report.finalScore,
      stars: report.stars,
      predicate: report.predicate,
      totalSpent: report.totalSpent,
      remainingBudget: report.remainingBudget,
      fulfilledMissions: report.fulfilledMissionCount,
      totalMissions: report.totalMissionCount,
    };

    setHistory((prev) => [newEntry, ...prev].slice(0, 12));

    playSound(report.finalScore >= 75 ? 'fanfare' : 'success', isMuted);
    setScreenState('result');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return true;
  }, [
    budget,
    cart,
    difficulty,
    isMuted,
    mission,
    setHistory,
    setUnlockedBadges,
    showToast,
    studentName,
    unlockedBadges,
  ]);

  const unlockPracticeBadge = useCallback(() => {
    setUnlockedBadges((prev) =>
      prev.includes('juara-latihan') ? prev : [...prev, 'juara-latihan']
    );
  }, [setUnlockedBadges]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    playSound('remove', isMuted);
  }, [isMuted, setHistory]);

  const value: GameContextValue = {
    screen,
    setScreen,
    studentName,
    setStudentName,
    difficulty,
    setDifficulty,
    mission,
    cart,
    budget,
    totalSpent,
    remainingBudget,
    totalCartPacks,
    missionProgress,
    fulfilledMissionCount,
    scoreReport,
    history,
    unlockedBadges,
    isMuted,
    toggleMute,
    toastMessage,
    clearToast,
    isCalculatorOpen,
    setCalculatorOpen,
    isHowToPlayOpen,
    setHowToPlayOpen,
    hintCategoryId,
    setHintCategoryId,
    startNewSession,
    rerollMission,
    replaySameMission,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    checkoutAndEvaluate,
    unlockPracticeBadge,
    clearHistory,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error('useGame harus digunakan di dalam GameProvider');
  }
  return ctx;
}
