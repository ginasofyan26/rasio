# Belanja Bijak di Marketplace

Aplikasi web pembelajaran matematika interaktif untuk siswa **kelas 6 SD** dengan materi **Rasio (Perbandingan)** dan **Harga Satuan**. Aplikasi ini berbentuk SPA statis (React + Vite + TypeScript + Tailwind CSS) tanpa backend, tanpa database, dan tanpa API key sehingga dapat langsung di-deploy ke **Vercel**.

## Fitur Utama

- **Beranda Interaktif**: Input nama siswa (opsional), pilihan tingkat kesulitan (*Mudah*, *Sedang*, *Sulit*), panduan *Cara Bermain*, *Papan Lencana*, dan *Riwayat Skor* yang tersimpan otomatis di `localStorage`.
- **Mode Latihan Singkat**: 3 soal pemanasan rasio dengan petunjuk dan pembahasan langkah demi langkah.
- **Misi Belanja & Modal Rp300.000**: Daftar kebutuhan belanja yang diacak setiap sesi dengan saldo yang berkurang secara *real-time*.
- **Marketplace Edukatif**: 10 kategori produk (40 penawaran) termasuk beberapa kemasan "jebakan" (*paket jumbo / bonus yang tidak selalu lebih murah*). Harga satuan sengaja disembunyikan agar siswa menghitung sendiri, dilengkapi **Kalkulator Bantu** dan **Petunjuk Rasio**.
- **Keranjang & Validasi Anggaran**: Cek kelengkapan misi, cegah belanja melebihi modal Rp300.000, dan tangani pembelian berulang atau campuran pada kategori yang sama.
- **Penilaian Otomatis & Cetak Laporan**: Skor 0–100 berbobot (60% Ketepatan Harga Satuan, 25% Pemenuhan Misi, 15% Efisiensi Anggaran), bintang 1–5, rincian perhitungan rasio per kategori, umpan balik naratif yang membangun, animasi konfeti + efek suara (dengan tombol *mute*), serta tombol **Unduh / Cetak Hasil** (`window.print()`).

---

## Cara Menjalankan Secara Lokal

Pastikan **Node.js** (disarankan versi 18 atau lebih baru) sudah terpasang di komputer Anda.

1. Pasang dependensi:
   ```bash
   npm install
   ```
2. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
3. Buka browser dan kunjungi `http://localhost:3000`.
4. Untuk memeriksa kompilasi produksi:
   ```bash
   npm run build
   ```
   Hasil build statis siap deploy akan berada di folder `dist/`.

---

## Cara Menambah atau Mengubah Data Produk (Untuk Guru)

Seluruh data kategori, produk, harga, petunjuk, soal latihan, dan lencana disimpan secara terpisah di file:

```
src/data/products.ts
```

Panduan mengedit `src/data/products.ts`:

1. **Mengubah Harga atau Isi Produk**: Cari produk di array `PRODUCT_OFFERS`, lalu ubah properti `price` (bilangan bulat Rupiah) dan `contentAmount` (dalam satuan dasar kategori, misalnya `ml`, `gram`, `biji`, `buah`, atau `batang`).
2. **Menambah Kategori Baru**: Tambahkan objek baru di array `PRODUCT_CATEGORIES` dengan menentukan:
   - `baseUnit`: satuan dasar perhitungan (contoh: `'gram'`, `'ml'`, `'biji'`).
   - `unitDivisor`: pembagi normalisasi harga satuan (`1` untuk per biji/buah/batang, `100` untuk per 100 g / 100 ml, `1000` untuk per kg / liter).
   - `missionTargets`: pilihan target jumlah yang wajar untuk tingkat `mudah`, `sedang`, dan `sulit`.
3. **Menambah Penawaran Baru**: Tambahkan 3–4 objek baru ke `PRODUCT_OFFERS` dengan `categoryId` yang sesuai. Anda juga bisa menambahkan `promoNote` dan `trapReason` untuk membuat soal jebakan kritis bagi siswa.

Logika perhitungan murni berada di `src/utils/scoring.ts` sehingga perubahan data produk otomatis dihitung dengan akurat.

---

## Langkah Deploy ke Vercel

Aplikasi sudah dilengkapi `vercel.json` untuk SPA rewrite:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Langkah deploy:

1. Unggah folder proyek ini ke repositori GitHub, GitLab, atau Bitbucket.
2. Masuk ke [Vercel](https://vercel.com) dan klik **Add New → Project**.
3. Pilih repositori proyek ini, lalu pastikan pengaturan build berikut:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Tidak diperlukan *Environment Variables* apa pun.
5. Klik **Deploy**. Setelah selesai, aplikasi langsung dapat diakses oleh siswa melalui HP Android, iPhone, tablet, maupun laptop.
