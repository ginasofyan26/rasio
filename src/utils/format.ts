import type { ProductCategory } from '../types';

const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 2,
});

/**
 * Memformat bilangan bulat menjadi format mata uang Rupiah (contoh: Rp15.000).
 */
export function formatRupiah(amount: number): string {
  const safeInteger = Math.round(amount);
  return rupiahFormatter.format(safeInteger).replace(/\s+/g, '');
}

/**
 * Memformat angka dengan pemisah ribuan Indonesia (contoh: 1.500 atau 1,5).
 */
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/**
 * Memformat jumlah barang dalam satuan tampilan misi kategori
 * (contoh: 6000 ml -> "6 liter", 5000 gram -> "5 kg", 20 biji -> "20 biji").
 */
export function formatCategoryAmount(
  amountInBaseUnit: number,
  category: ProductCategory
): string {
  const displayValue = amountInBaseUnit / category.missionDisplayDivisor;
  return `${formatNumber(displayValue)} ${category.missionUnitLabel}`;
}

/**
 * Memformat tanggal ISO menjadi format lokal Bahasa Indonesia yang mudah dibaca.
 */
export function formatDateId(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}
