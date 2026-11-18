import { useCallback, useState } from 'react';

/**
 * Hook penyimpanan localStorage yang aman lintas browser (termasuk mode privat Safari).
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue =
          value instanceof Function ? value(prev) : value;
        try {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(nextValue));
          }
        } catch {
          // Abaikan galat kuota/mode privat agar aplikasi tetap berjalan mulus
        }
        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
