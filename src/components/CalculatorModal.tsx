import { Delete, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { playSound } from '../utils/sound';

type Operator = '+' | '-' | '×' | '÷' | null;

/**
 * Kalkulator sederhana untuk membantu siswa menghitung harga satuan sendiri
 * (contoh: Harga ÷ Jumlah = Harga per Satuan).
 */
export function CalculatorModal() {
  const { isCalculatorOpen, setCalculatorOpen, isMuted } = useGame();
  const [display, setDisplay] = useState('0');
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [expressionHint, setExpressionHint] = useState('');

  useEffect(() => {
    if (!isCalculatorOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCalculatorOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isCalculatorOpen, setCalculatorOpen]);

  if (!isCalculatorOpen) return null;

  const inputDigit = (digit: string) => {
    playSound('tap', isMuted);
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay((prev) =>
        prev === '0' ? digit : prev.length < 12 ? prev + digit : prev
      );
    }
  };

  const inputDecimal = () => {
    playSound('tap', isMuted);
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  };

  const clearAll = () => {
    playSound('tap', isMuted);
    setDisplay('0');
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setExpressionHint('');
  };

  const backspace = () => {
    playSound('tap', isMuted);
    if (waitingForOperand) return;
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const compute = (a: number, b: number, op: Operator): number | null => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return b === 0 ? null : a / b;
      default:
        return b;
    }
  };

  const formatResult = (val: number): string => {
    if (!Number.isFinite(val)) return 'Tidak valid';
    const rounded = Math.round(val * 100) / 100;
    return String(rounded);
  };

  const chooseOperator = (nextOp: Exclude<Operator, null>) => {
    playSound('tap', isMuted);
    const inputValue = parseFloat(display);
    if (Number.isNaN(inputValue)) return;

    if (storedValue === null) {
      setStoredValue(inputValue);
      setExpressionHint(`${inputValue} ${nextOp}`);
    } else if (operator && !waitingForOperand) {
      const result = compute(storedValue, inputValue, operator);
      if (result === null) {
        setDisplay('Tidak bisa ÷ 0');
        setStoredValue(null);
        setOperator(null);
        setExpressionHint('');
        setWaitingForOperand(true);
        return;
      }
      const formatted = formatResult(result);
      setDisplay(formatted);
      setStoredValue(result);
      setExpressionHint(`${formatted} ${nextOp}`);
    } else {
      setExpressionHint(`${storedValue} ${nextOp}`);
    }

    setWaitingForOperand(true);
    setOperator(nextOp);
  };

  const evaluateEquals = () => {
    playSound('tap', isMuted);
    if (operator === null || storedValue === null) return;
    const inputValue = parseFloat(display);
    if (Number.isNaN(inputValue)) return;

    const result = compute(storedValue, inputValue, operator);
    if (result === null) {
      setDisplay('Tidak bisa ÷ 0');
      setExpressionHint('');
    } else {
      const formatted = formatResult(result);
      setExpressionHint(`${storedValue} ${operator} ${inputValue} =`);
      setDisplay(formatted);
    }

    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const keys: Array<{
    label: string;
    onClick: () => void;
    variant?: 'num' | 'op' | 'action' | 'equals';
    spanTwo?: boolean;
  }> = [
    { label: 'C', onClick: clearAll, variant: 'action' },
    { label: '⌫', onClick: backspace, variant: 'action' },
    { label: '÷', onClick: () => chooseOperator('÷'), variant: 'op' },
    { label: '×', onClick: () => chooseOperator('×'), variant: 'op' },
    { label: '7', onClick: () => inputDigit('7'), variant: 'num' },
    { label: '8', onClick: () => inputDigit('8'), variant: 'num' },
    { label: '9', onClick: () => inputDigit('9'), variant: 'num' },
    { label: '-', onClick: () => chooseOperator('-'), variant: 'op' },
    { label: '4', onClick: () => inputDigit('4'), variant: 'num' },
    { label: '5', onClick: () => inputDigit('5'), variant: 'num' },
    { label: '6', onClick: () => inputDigit('6'), variant: 'num' },
    { label: '+', onClick: () => chooseOperator('+'), variant: 'op' },
    { label: '1', onClick: () => inputDigit('1'), variant: 'num' },
    { label: '2', onClick: () => inputDigit('2'), variant: 'num' },
    { label: '3', onClick: () => inputDigit('3'), variant: 'num' },
    { label: '=', onClick: evaluateEquals, variant: 'equals' },
    { label: '0', onClick: () => inputDigit('0'), variant: 'num', spanTwo: true },
    { label: '000', onClick: () => { inputDigit('0'); inputDigit('0'); inputDigit('0'); }, variant: 'num' },
    { label: '.', onClick: inputDecimal, variant: 'num' },
  ];

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 p-4 safe-bottom"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calc-modal-title"
      onClick={() => setCalculatorOpen(false)}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div>
            <h2
              id="calc-modal-title"
              className="font-display text-lg font-bold text-slate-900"
            >
              Kalkulator Bantu
            </h2>
            <p className="text-xs font-semibold text-slate-600">
              Rumus: Harga ÷ Jumlah = Harga per Satuan
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCalculatorOpen(false)}
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl text-slate-600 hover:bg-slate-200 transition-colors"
            aria-label="Tutup kalkulator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Layar tampilan angka */}
          <div className="bg-slate-900 text-white rounded-xl px-4 py-3 text-right">
            <div className="text-xs font-mono text-teal-300 min-h-[18px] tabular-nums">
              {expressionHint}
            </div>
            <div
              className="text-2xl sm:text-3xl font-mono font-bold tracking-tight tabular-nums truncate"
              aria-live="polite"
            >
              {display}
            </div>
          </div>

          {/* Tombol angka & operator */}
          <div className="grid grid-cols-4 gap-2">
            {keys.map((key) => {
              const baseClasses =
                'min-h-[48px] rounded-xl font-bold text-lg transition-transform active:scale-95 flex items-center justify-center';
              const styleClasses =
                key.variant === 'equals'
                  ? 'bg-teal-600 hover:bg-teal-700 text-white'
                  : key.variant === 'op'
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                  : key.variant === 'action'
                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-900';

              return (
                <button
                  key={key.label}
                  type="button"
                  onClick={key.onClick}
                  className={`${baseClasses} ${styleClasses} ${
                    key.spanTwo ? 'col-span-2' : ''
                  }`}
                  aria-label={
                    key.label === '⌫'
                      ? 'Hapus satu digit'
                      : key.label === 'C'
                      ? 'Hapus semua'
                      : key.label
                  }
                >
                  {key.label === '⌫' ? (
                    <Delete className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    key.label
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
