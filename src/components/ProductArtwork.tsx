import type { ReactNode } from 'react';

interface ProductArtworkProps {
  productId: string;
  name: string;
  fallbackEmoji?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface ArtworkConfig {
  bg: string;
  accentCircle: string;
  render: () => ReactNode;
}

/**
 * Ilustrasi vektor unik untuk setiap penawaran produk (40 variasi kemasan).
 * Menggunakan vektor SVG murni agar tajam di semua layar, cepat dimuat tanpa
 * gambar eksternal, dan tetap jelas saat dicetak.
 *
 * Jika guru menambahkan produk baru di src/data/products.ts yang belum memiliki
 * ilustrasi khusus di sini, komponen otomatis menampilkan fallback emoji rapi.
 */
const ARTWORK_MAP: Record<string, ArtworkConfig> = {
  // =========================================================================
  // 1. BISKUIT COKELAT
  // =========================================================================
  'biskuit-5': {
    bg: '#FEF3C7',
    accentCircle: '#FDE68A',
    render: () => (
      <g>
        {/* Kemasan saku cokelat-emas */}
        <rect x="44" y="24" width="72" height="76" rx="12" fill="#92400E" stroke="#451A03" strokeWidth="3" />
        <rect x="50" y="34" width="60" height="56" rx="8" fill="#B45309" />
        <path d="M44 34L36 28V96L44 90Z" fill="#78350F" stroke="#451A03" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M116 34L124 28V96L116 90Z" fill="#78350F" stroke="#451A03" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Bintang Toko Bintang */}
        <path d="M80 40L83 47L90 48L85 53L86 60L80 56L74 60L75 53L70 48L77 47Z" fill="#FBBF24" />
        {/* 3 biskuit depan */}
        <circle cx="64" cy="76" r="10" fill="#D97706" stroke="#451A03" strokeWidth="2.5" />
        <circle cx="80" cy="79" r="10" fill="#F59E0B" stroke="#451A03" strokeWidth="2.5" />
        <circle cx="96" cy="76" r="10" fill="#D97706" stroke="#451A03" strokeWidth="2.5" />
        <circle cx="77" cy="76" r="1.8" fill="#451A03" />
        <circle cx="83" cy="81" r="1.8" fill="#451A03" />
        <circle cx="81" cy="75" r="1.5" fill="#451A03" />
        <rect x="57" y="102" width="46" height="14" rx="5" fill="#451A03" />
        <text x="80" y="112" textAnchor="middle" fill="#FEF3C7" fontSize="9" fontWeight="800">ISI 5</text>
      </g>
    ),
  },
  'biskuit-4': {
    bg: '#FFE4E6',
    accentCircle: '#FECDD3',
    render: () => (
      <g>
        {/* Bungkus mini merah cerah */}
        <rect x="50" y="30" width="60" height="66" rx="10" fill="#E11D48" stroke="#881337" strokeWidth="3" />
        <rect x="56" y="38" width="48" height="24" rx="6" fill="#FFF1F2" />
        <rect x="64" y="45" width="32" height="5" rx="2.5" fill="#E11D48" />
        <rect x="70" y="53" width="20" height="4" rx="2" fill="#FDA4AF" />
        {/* 2 biskuit bulat */}
        <circle cx="70" cy="79" r="11" fill="#B45309" stroke="#451A03" strokeWidth="2.5" />
        <circle cx="90" cy="79" r="11" fill="#D97706" stroke="#451A03" strokeWidth="2.5" />
        <circle cx="67" cy="77" r="1.8" fill="#451A03" />
        <circle cx="73" cy="82" r="1.8" fill="#451A03" />
        <circle cx="88" cy="76" r="1.8" fill="#451A03" />
        <circle cx="93" cy="81" r="1.8" fill="#451A03" />
        <rect x="57" y="101" width="46" height="14" rx="5" fill="#881337" />
        <text x="80" y="111" textAnchor="middle" fill="#FFE4E6" fontSize="9" fontWeight="800">ISI 4</text>
      </g>
    ),
  },
  'biskuit-10': {
    bg: '#CCFBF1',
    accentCircle: '#99F6E4',
    render: () => (
      <g>
        {/* Kotak keluarga lebar teal & cokelat */}
        <rect x="26" y="28" width="108" height="68" rx="12" fill="#0D9488" stroke="#134E4A" strokeWidth="3" />
        <rect x="33" y="35" width="94" height="54" rx="8" fill="#14B8A6" />
        {/* Jendela transparansi biskuit 2 baris */}
        <rect x="39" y="48" width="82" height="34" rx="6" fill="#FEF3C7" stroke="#134E4A" strokeWidth="2" />
        {[50, 65, 80, 95, 110].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="59" r="6.5" fill="#B45309" stroke="#451A03" strokeWidth="1.8" />
            <circle cx={cx} cy="72" r="6.5" fill="#D97706" stroke="#451A03" strokeWidth="1.8" />
          </g>
        ))}
        <rect x="52" y="37" width="56" height="8" rx="4" fill="#FFFFFF" />
        <rect x="53" y="101" width="54" height="14" rx="5" fill="#134E4A" />
        <text x="80" y="111" textAnchor="middle" fill="#CCFBF1" fontSize="9" fontWeight="800">ISI 10</text>
      </g>
    ),
  },
  'biskuit-12': {
    bg: '#FFEDD5',
    accentCircle: '#FED7AA',
    render: () => (
      <g>
        {/* Kotak jumbo oranye mencolok dengan pita +2 */}
        <rect x="22" y="24" width="116" height="74" rx="12" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
        <rect x="30" y="32" width="100" height="58" rx="8" fill="#F97316" />
        {/* Tumpukan biskuit */}
        <circle cx="58" cy="70" r="14" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
        <circle cx="78" cy="68" r="14" fill="#B45309" stroke="#451A03" strokeWidth="2.5" />
        <circle cx="98" cy="70" r="14" fill="#D97706" stroke="#451A03" strokeWidth="2.5" />
        <circle cx="75" cy="65" r="2" fill="#451A03" />
        <circle cx="82" cy="71" r="2" fill="#451A03" />
        <circle cx="96" cy="67" r="2" fill="#451A03" />
        {/* Stiker jumbo */}
        <rect x="86" y="16" width="52" height="20" rx="6" fill="#FACC15" stroke="#7C2D12" strokeWidth="2.5" />
        <text x="112" y="29" textAnchor="middle" fill="#7C2D12" fontSize="9" fontWeight="900">10+2</text>
        <rect x="46" y="101" width="68" height="14" rx="5" fill="#7C2D12" />
        <text x="80" y="111" textAnchor="middle" fill="#FFEDD5" fontSize="9" fontWeight="800">JUMBO 12</text>
      </g>
    ),
  },

  // =========================================================================
  // 2. KERIPIK SINGKONG
  // =========================================================================
  'keripik-50': {
    bg: '#ECFCCB',
    accentCircle: '#D9F99D',
    render: () => (
      <g>
        {/* Bungkus foil kecil hijau limau */}
        <path d="M54 24L106 24L102 98L58 98Z" fill="#65A30D" stroke="#365314" strokeWidth="3" strokeLinejoin="round" />
        <rect x="52" y="20" width="56" height="8" rx="3" fill="#4D7C0F" stroke="#365314" strokeWidth="2.5" />
        <rect x="56" y="94" width="48" height="8" rx="3" fill="#4D7C0F" stroke="#365314" strokeWidth="2.5" />
        {/* Keping keripik */}
        <ellipse cx="74" cy="62" rx="14" ry="9" transform="rotate(-18 74 62)" fill="#FDE047" stroke="#A16207" strokeWidth="2" />
        <ellipse cx="86" cy="70" rx="13" ry="8" transform="rotate(14 86 70)" fill="#FACC15" stroke="#A16207" strokeWidth="2" />
        <rect x="58" y="104" width="44" height="13" rx="5" fill="#365314" />
        <text x="80" y="114" textAnchor="middle" fill="#ECFCCB" fontSize="9" fontWeight="800">50 g</text>
      </g>
    ),
  },
  'keripik-100': {
    bg: '#FEF9C3',
    accentCircle: '#FEF08A',
    render: () => (
      <g>
        {/* Bungkus foil sedang kuning-oranye */}
        <path d="M46 22L114 22L108 98L52 98Z" fill="#F59E0B" stroke="#78350F" strokeWidth="3" strokeLinejoin="round" />
        <rect x="44" y="18" width="72" height="8" rx="3" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
        <rect x="50" y="94" width="60" height="8" rx="3" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
        <circle cx="80" cy="60" r="22" fill="#FEF3C7" />
        <ellipse cx="73" cy="58" rx="12" ry="7.5" transform="rotate(-20 73 58)" fill="#FDE047" stroke="#92400E" strokeWidth="2" />
        <ellipse cx="87" cy="64" rx="12" ry="7.5" transform="rotate(18 87 64)" fill="#FACC15" stroke="#92400E" strokeWidth="2" />
        <ellipse cx="78" cy="70" rx="11" ry="6.5" fill="#FBBF24" stroke="#92400E" strokeWidth="2" />
        <rect x="55" y="104" width="50" height="13" rx="5" fill="#78350F" />
        <text x="80" y="114" textAnchor="middle" fill="#FEF9C3" fontSize="9" fontWeight="800">100 g</text>
      </g>
    ),
  },
  'keripik-200': {
    bg: '#D1FAE5',
    accentCircle: '#A7F3D0',
    render: () => (
      <g>
        {/* Bungkus besar hijau zamrud & emas */}
        <path d="M38 18L122 18L116 98L44 98Z" fill="#059669" stroke="#064E3B" strokeWidth="3" strokeLinejoin="round" />
        <rect x="36" y="14" width="88" height="9" rx="3" fill="#047857" stroke="#064E3B" strokeWidth="2.5" />
        <rect x="42" y="94" width="76" height="8" rx="3" fill="#047857" stroke="#064E3B" strokeWidth="2.5" />
        <rect x="50" y="34" width="60" height="48" rx="10" fill="#ECFDF5" />
        <ellipse cx="70" cy="54" rx="13" ry="8" transform="rotate(-15 70 54)" fill="#FDE047" stroke="#854D0E" strokeWidth="2" />
        <ellipse cx="90" cy="56" rx="13" ry="8" transform="rotate(20 90 56)" fill="#FACC15" stroke="#854D0E" strokeWidth="2" />
        <ellipse cx="80" cy="68" rx="15" ry="8.5" fill="#FBBF24" stroke="#854D0E" strokeWidth="2" />
        <rect x="53" y="104" width="54" height="13" rx="5" fill="#064E3B" />
        <text x="80" y="114" textAnchor="middle" fill="#D1FAE5" fontSize="9" fontWeight="800">200 g</text>
      </g>
    ),
  },
  'keripik-240': {
    bg: '#FEE2E2',
    accentCircle: '#FECACA',
    render: () => (
      <g>
        {/* Paket bundling 3 bungkus diikat pita */}
        {[28, 60, 92].map((x, idx) => (
          <g key={x}>
            <rect
              x={x}
              y={idx === 1 ? 22 : 28}
              width="40"
              height="68"
              rx="7"
              fill={idx === 1 ? '#EF4444' : '#F97316'}
              stroke="#7F1D1D"
              strokeWidth="2.5"
            />
            <ellipse cx={x + 20} cy="58" rx="11" ry="7" fill="#FDE047" stroke="#92400E" strokeWidth="1.8" />
          </g>
        ))}
        {/* Pita pengikat paket 3 */}
        <rect x="24" y="68" width="112" height="14" rx="4" fill="#FEF08A" stroke="#7F1D1D" strokeWidth="2.5" />
        <text x="80" y="78" textAnchor="middle" fill="#7F1D1D" fontSize="8.5" fontWeight="900">PAKET 3 × 80 g</text>
        <rect x="52" y="103" width="56" height="13" rx="5" fill="#7F1D1D" />
        <text x="80" y="113" textAnchor="middle" fill="#FEE2E2" fontSize="9" fontWeight="800">240 g</text>
      </g>
    ),
  },

  // =========================================================================
  // 3. AIR MINERAL
  // =========================================================================
  'air-600': {
    bg: '#E0F2FE',
    accentCircle: '#BAE6FD',
    render: () => (
      <g>
        {/* Botol 600 ml ramping */}
        <rect x="72" y="16" width="16" height="8" rx="2.5" fill="#0284C7" stroke="#0C4A6E" strokeWidth="2.5" />
        <path d="M68 24H92L98 38V92C98 96 95 99 91 99H69C65 99 62 96 62 92V38L68 24Z" fill="#E0F2FE" stroke="#0369A1" strokeWidth="3" />
        <rect x="64" y="48" width="32" height="24" fill="#0EA5E9" />
        <path d="M64 60Q72 55 80 60T96 60" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
        <line x1="68" y1="79" x2="92" y2="79" stroke="#7DD3FC" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="68" y1="87" x2="92" y2="87" stroke="#7DD3FC" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="54" y="103" width="52" height="13" rx="5" fill="#0C4A6E" />
        <text x="80" y="113" textAnchor="middle" fill="#E0F2FE" fontSize="9" fontWeight="800">600 ml</text>
      </g>
    ),
  },
  'air-1500': {
    bg: '#DBEAFE',
    accentCircle: '#BFDBFE',
    render: () => (
      <g>
        {/* Botol besar 1,5 L */}
        <rect x="70" y="12" width="20" height="9" rx="3" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="2.5" />
        <path d="M64 21H96L104 38V93C104 97 100 100 96 100H64C60 100 56 97 56 93V38L64 21Z" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="3" />
        <rect x="58" y="45" width="44" height="28" fill="#2563EB" />
        <path d="M58 58Q69 51 80 58T102 58" stroke="#93C5FD" strokeWidth="3" fill="none" />
        <path d="M80 48C80 48 85 55 85 59C85 62 82.8 64 80 64C77.2 64 75 62 75 59C75 55 80 48 80 48Z" fill="#FFFFFF" />
        <line x1="63" y1="82" x2="97" y2="82" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
        <line x1="63" y1="90" x2="97" y2="90" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
        <rect x="52" y="104" width="56" height="13" rx="5" fill="#1E3A8A" />
        <text x="80" y="114" textAnchor="middle" fill="#DBEAFE" fontSize="9" fontWeight="800">1,5 LITER</text>
      </g>
    ),
  },
  'air-2400': {
    bg: '#CFFAFE',
    accentCircle: '#A5F3FC',
    render: () => (
      <g>
        {/* Paket 4 botol 600 ml berjajar */}
        {[30, 56, 82, 108].map((x) => (
          <g key={x}>
            <rect x={x + 6} y="24" width="10" height="6" rx="2" fill="#0284C7" stroke="#164E63" strokeWidth="2" />
            <rect x={x} y="30" width="22" height="64" rx="6" fill="#ECFEFF" stroke="#0891B2" strokeWidth="2.5" />
            <rect x={x + 1.5} y="48" width="19" height="18" fill="#06B6D4" />
          </g>
        ))}
        {/* Plastik pembungkus paket */}
        <rect x="26" y="42" width="108" height="36" rx="6" fill="#0EA5E9" fillOpacity="0.18" stroke="#164E63" strokeWidth="2" strokeDasharray="4 3" />
        <rect x="44" y="102" width="72" height="14" rx="5" fill="#164E63" />
        <text x="80" y="112" textAnchor="middle" fill="#CFFAFE" fontSize="9" fontWeight="800">4 × 600 ml</text>
      </g>
    ),
  },
  'air-19000': {
    bg: '#E0E7FF',
    accentCircle: '#C7D2FE',
    render: () => (
      <g>
        {/* Galon 19 liter khas Indonesia */}
        <rect x="68" y="14" width="24" height="10" rx="3" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2.5" />
        <path d="M62 24H98L112 42V92C112 97 108 100 103 100H57C52 100 48 97 48 92V42L62 24Z" fill="#93C5FD" stroke="#1E40AF" strokeWidth="3" />
        {/* Kilau air di dalam galon */}
        <path d="M52 52Q66 46 80 52T108 52V92C108 95 106 97 103 97H57C54 97 52 95 52 92V52Z" fill="#60A5FA" />
        {/* Garis rusuk galon */}
        <line x1="51" y1="64" x2="109" y2="64" stroke="#1E40AF" strokeWidth="2.5" opacity="0.45" />
        <line x1="51" y1="78" x2="109" y2="78" stroke="#1E40AF" strokeWidth="2.5" opacity="0.45" />
        {/* Pegangan samping */}
        <path d="M108 46H118C121 46 122 49 122 52V66C122 69 120 71 117 71H108" stroke="#1E40AF" strokeWidth="3" fill="none" />
        <rect x="46" y="104" width="68" height="13" rx="5" fill="#1E3A8A" />
        <text x="80" y="114" textAnchor="middle" fill="#E0E7FF" fontSize="9" fontWeight="800">GALON 19 L</text>
      </g>
    ),
  },

  // =========================================================================
  // 4. SUSU UHT
  // =========================================================================
  'susu-200': {
    bg: '#F0F9FF',
    accentCircle: '#E0F2FE',
    render: () => (
      <g>
        {/* Sedotan tekuk */}
        <path d="M98 34V20L110 16" stroke="#F43F5E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Kotak kecil 200 ml */}
        <rect x="54" y="34" width="52" height="64" rx="8" fill="#FFFFFF" stroke="#0369A1" strokeWidth="3" />
        <rect x="56" y="36" width="48" height="22" rx="6" fill="#0284C7" />
        <circle cx="80" cy="74" r="13" fill="#E0F2FE" />
        <path d="M80 65C80 65 86 73 86 77C86 80.5 83.3 83 80 83C76.7 83 74 80.5 74 77C74 73 80 65 80 65Z" fill="#0284C7" />
        <rect x="54" y="103" width="52" height="13" rx="5" fill="#0369A1" />
        <text x="80" y="113" textAnchor="middle" fill="#F0F9FF" fontSize="9" fontWeight="800">200 ml</text>
      </g>
    ),
  },
  'susu-250': {
    bg: '#EEF2FF',
    accentCircle: '#E0E7FF',
    render: () => (
      <g>
        {/* Kotak sedang 250 ml dengan atap segitiga */}
        <path d="M54 34L80 18L106 34Z" fill="#4F46E5" stroke="#312E81" strokeWidth="3" strokeLinejoin="round" />
        <rect x="54" y="34" width="52" height="64" fill="#FFFFFF" stroke="#312E81" strokeWidth="3" />
        <path d="M56 64Q68 58 80 64T104 64V96H56Z" fill="#6366F1" />
        <circle cx="80" cy="49" r="9" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="2" />
        <rect x="54" y="103" width="52" height="13" rx="5" fill="#312E81" />
        <text x="80" y="113" textAnchor="middle" fill="#EEF2FF" fontSize="9" fontWeight="800">250 ml</text>
      </g>
    ),
  },
  'susu-1000': {
    bg: '#ECFDF5',
    accentCircle: '#D1FAE5',
    render: () => (
      <g>
        {/* Kotak susu 1 liter tinggi dengan tutup ulir */}
        <rect x="82" y="12" width="14" height="8" rx="3" fill="#059669" stroke="#064E3B" strokeWidth="2.5" />
        <path d="M50 26L62 18H98L110 26Z" fill="#A7F3D0" stroke="#065F46" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="50" y="26" width="60" height="72" rx="4" fill="#FFFFFF" stroke="#065F46" strokeWidth="3" />
        <rect x="52" y="28" width="56" height="26" fill="#10B981" />
        {/* Motif padang rumput & tetes susu */}
        <path d="M52 78Q68 70 80 78T108 78V96H52Z" fill="#34D399" />
        <circle cx="80" cy="62" r="10" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
        <rect x="52" y="103" width="56" height="13" rx="5" fill="#064E3B" />
        <text x="80" y="113" textAnchor="middle" fill="#ECFDF5" fontSize="9" fontWeight="800">1 LITER</text>
      </g>
    ),
  },
  'susu-800': {
    bg: '#FEF3C7',
    accentCircle: '#FDE68A',
    render: () => (
      <g>
        {/* Paket bekal 4 kotak susu */}
        {[24, 52, 80, 108].map((x) => (
          <g key={x}>
            <rect x={x} y="34" width="26" height="58" rx="5" fill="#FFFFFF" stroke="#B45309" strokeWidth="2.5" />
            <rect x={x + 1.5} y="36" width="23" height="18" rx="3" fill="#F59E0B" />
            <circle cx={x + 13} cy="72" r="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
          </g>
        ))}
        <rect x="22" y="62" width="116" height="14" rx="4" fill="#FDE68A" stroke="#78350F" strokeWidth="2" />
        <text x="80" y="72" textAnchor="middle" fill="#78350F" fontSize="8.5" fontWeight="900">4 × 200 ml</text>
        <rect x="52" y="103" width="56" height="13" rx="5" fill="#78350F" />
        <text x="80" y="113" textAnchor="middle" fill="#FEF3C7" fontSize="9" fontWeight="800">800 ml</text>
      </g>
    ),
  },

  // =========================================================================
  // 5. BUKU TULIS
  // =========================================================================
  'buku-1': {
    bg: '#E0F2FE',
    accentCircle: '#BAE6FD',
    render: () => (
      <g>
        {/* 1 buku tulis biru */}
        <rect x="48" y="20" width="64" height="78" rx="8" fill="#0284C7" stroke="#0C4A6E" strokeWidth="3" />
        <rect x="48" y="20" width="12" height="78" rx="4" fill="#0369A1" stroke="#0C4A6E" strokeWidth="2.5" />
        <rect x="68" y="34" width="34" height="22" rx="4" fill="#FFFFFF" />
        <line x1="74" y1="42" x2="96" y2="42" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="74" y1="49" x2="90" y2="49" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="55" y="103" width="50" height="13" rx="5" fill="#0C4A6E" />
        <text x="80" y="113" textAnchor="middle" fill="#E0F2FE" fontSize="9" fontWeight="800">1 BUAH</text>
      </g>
    ),
  },
  'buku-4': {
    bg: '#F3E8FF',
    accentCircle: '#E9D5FF',
    render: () => (
      <g>
        {/* Tumpukan 4 buku warna-warni */}
        {[
          { y: 74, fill: '#A855F7', stroke: '#581C87' },
          { y: 58, fill: '#EC4899', stroke: '#831843' },
          { y: 42, fill: '#3B82F6', stroke: '#1E3A8A' },
          { y: 26, fill: '#14B8A6', stroke: '#134E4A' },
        ].map((b, i) => (
          <g key={i}>
            <rect x="36" y={b.y} width="88" height="16" rx="4" fill={b.fill} stroke={b.stroke} strokeWidth="2.5" />
            <rect x="48" y={b.y + 4} width="68" height="8" rx="2" fill="#FFFFFF" opacity="0.9" />
          </g>
        ))}
        <rect x="53" y="102" width="54" height="14" rx="5" fill="#581C87" />
        <text x="80" y="112" textAnchor="middle" fill="#F3E8FF" fontSize="9" fontWeight="800">ISI 4</text>
      </g>
    ),
  },
  'buku-5': {
    bg: '#CCFBF1',
    accentCircle: '#99F6E4',
    render: () => (
      <g>
        {/* Paket 5 buku tersusun rapi dengan pita */}
        {[28, 42, 56, 70, 84].map((x, idx) => (
          <rect
            key={x}
            x={x}
            y={24 + (idx % 2) * 3}
            width="44"
            height="70"
            rx="6"
            fill={['#0D9488', '#0EA5E9', '#F59E0B', '#10B981', '#6366F1'][idx]}
            stroke="#0F172A"
            strokeWidth="2.5"
          />
        ))}
        <rect x="92" y="38" width="28" height="18" rx="4" fill="#FFFFFF" />
        <line x1="96" y1="45" x2="116" y2="45" stroke="#64748B" strokeWidth="2" />
        <line x1="96" y1="51" x2="112" y2="51" stroke="#94A3B8" strokeWidth="2" />
        <rect x="53" y="102" width="54" height="14" rx="5" fill="#134E4A" />
        <text x="80" y="112" textAnchor="middle" fill="#CCFBF1" fontSize="9" fontWeight="800">ISI 5</text>
      </g>
    ),
  },
  'buku-10': {
    bg: '#FEF3C7',
    accentCircle: '#FDE68A',
    render: () => (
      <g>
        {/* 1 Pak besar isi 10 buku */}
        <rect x="30" y="26" width="100" height="70" rx="8" fill="#FFFBEB" stroke="#92400E" strokeWidth="3" />
        {[34, 41, 48, 55, 62, 69, 76, 83, 90].map((y, idx) => (
          <line
            key={y}
            x1="34"
            y1={y}
            x2="126"
            y2={y}
            stroke={idx % 2 === 0 ? '#D97706' : '#F59E0B'}
            strokeWidth="3.5"
          />
        ))}
        <rect x="56" y="42" width="48" height="36" rx="8" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2.5" />
        <text x="80" y="59" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">1 PAK</text>
        <text x="80" y="71" textAnchor="middle" fill="#FEF08A" fontSize="9" fontWeight="800">10 BUKU</text>
        <rect x="52" y="102" width="56" height="14" rx="5" fill="#92400E" />
        <text x="80" y="112" textAnchor="middle" fill="#FEF3C7" fontSize="9" fontWeight="800">ISI 10</text>
      </g>
    ),
  },

  // =========================================================================
  // 6. PENSIL 2B
  // =========================================================================
  'pensil-2': {
    bg: '#FEF9C3',
    accentCircle: '#FEF08A',
    render: () => (
      <g>
        {/* Kartu blister isi 2 pensil */}
        <rect x="46" y="18" width="68" height="80" rx="10" fill="#FFFFFF" stroke="#854D0E" strokeWidth="2.5" />
        {[66, 94].map((x) => (
          <g key={x}>
            <rect x={x - 5} y="34" width="10" height="44" fill="#FACC15" stroke="#713F12" strokeWidth="2" />
            <rect x={x - 5} y="26" width="10" height="8" rx="2" fill="#FB7185" stroke="#713F12" strokeWidth="2" />
            <polygon points={`${x - 5},78 ${x + 5},78 ${x},90`} fill="#FDE68A" stroke="#713F12" strokeWidth="2" />
            <polygon points={`${x - 2},85 ${x + 2},85 ${x},90`} fill="#1E293B" />
          </g>
        ))}
        <rect x="52" y="103" width="56" height="13" rx="5" fill="#713F12" />
        <text x="80" y="113" textAnchor="middle" fill="#FEF9C3" fontSize="9" fontWeight="800">2 BATANG</text>
      </g>
    ),
  },
  'pensil-6': {
    bg: '#E0F2FE',
    accentCircle: '#BAE6FD',
    render: () => (
      <g>
        {/* Kotak setengah lusin (6 pensil) */}
        {[50, 62, 74, 86, 98, 110].map((x) => (
          <g key={x}>
            <polygon points={`${x - 4},34 ${x + 4},34 ${x},20`} fill="#FDE68A" stroke="#1E3A8A" strokeWidth="1.8" />
            <polygon points={`${x - 1.5},25 ${x + 1.5},25 ${x},20`} fill="#0F172A" />
            <rect x={x - 4} y="34" width="8" height="22" fill="#38BDF8" stroke="#1E3A8A" strokeWidth="1.8" />
          </g>
        ))}
        <rect x="40" y="48" width="80" height="50" rx="8" fill="#0284C7" stroke="#0C4A6E" strokeWidth="3" />
        <rect x="54" y="60" width="52" height="24" rx="5" fill="#FFFFFF" />
        <text x="80" y="76" textAnchor="middle" fill="#0C4A6E" fontSize="11" fontWeight="900">2B · 6</text>
        <rect x="52" y="103" width="56" height="13" rx="5" fill="#0C4A6E" />
        <text x="80" y="113" textAnchor="middle" fill="#E0F2FE" fontSize="9" fontWeight="800">6 BATANG</text>
      </g>
    ),
  },
  'pensil-12': {
    bg: '#CCFBF1',
    accentCircle: '#99F6E4',
    render: () => (
      <g>
        {/* Kotak 1 lusin (12 pensil) warna teal klasik */}
        {[34, 43, 52, 61, 70, 79, 88, 97, 106, 115, 124].map((x) => (
          <g key={x}>
            <polygon points={`${x - 3.5},34 ${x + 3.5},34 ${x},21`} fill="#FDE68A" stroke="#134E4A" strokeWidth="1.5" />
            <rect x={x - 3.5} y="34" width="7" height="18" fill="#14B8A6" stroke="#134E4A" strokeWidth="1.5" />
          </g>
        ))}
        <rect x="26" y="46" width="108" height="52" rx="9" fill="#0F766E" stroke="#134E4A" strokeWidth="3" />
        <rect x="42" y="58" width="76" height="26" rx="6" fill="#FEF3C7" />
        <text x="80" y="75" textAnchor="middle" fill="#134E4A" fontSize="11" fontWeight="900">1 LUSIN (12)</text>
        <rect x="48" y="103" width="64" height="13" rx="5" fill="#134E4A" />
        <text x="80" y="113" textAnchor="middle" fill="#CCFBF1" fontSize="9" fontWeight="800">12 BATANG</text>
      </g>
    ),
  },
  'pensil-bonus': {
    bg: '#FFE4E6',
    accentCircle: '#FECDD3',
    render: () => (
      <g>
        {/* Kotak 10 + 2 bonus menempel di samping */}
        <rect x="26" y="34" width="84" height="64" rx="9" fill="#E11D48" stroke="#881337" strokeWidth="3" />
        <rect x="38" y="48" width="60" height="28" rx="6" fill="#FFF1F2" />
        <text x="68" y="66" textAnchor="middle" fill="#881337" fontSize="11" fontWeight="900">ISI 10</text>
        {/* 2 pensil bonus di kanan */}
        {[118, 128].map((x) => (
          <g key={x}>
            <polygon points={`${x - 4},34 ${x + 4},34 ${x},21`} fill="#FDE68A" stroke="#881337" strokeWidth="1.8" />
            <rect x={x - 4} y="34" width="8" height="58" fill="#FACC15" stroke="#881337" strokeWidth="1.8" />
          </g>
        ))}
        <rect x="92" y="14" width="46" height="18" rx="6" fill="#FACC15" stroke="#881337" strokeWidth="2" />
        <text x="115" y="26" textAnchor="middle" fill="#881337" fontSize="8.5" fontWeight="900">+2 FREE</text>
        <rect x="46" y="103" width="68" height="13" rx="5" fill="#881337" />
        <text x="80" y="113" textAnchor="middle" fill="#FFE4E6" fontSize="9" fontWeight="800">10+2 BATANG</text>
      </g>
    ),
  },

  // =========================================================================
  // 7. BERAS PULEN
  // =========================================================================
  'beras-1': {
    bg: '#FEFCE8',
    accentCircle: '#FEF08A',
    render: () => (
      <g>
        {/* Kemasan pouch beras 1 kg */}
        <path d="M52 24H108L112 96H48L52 24Z" fill="#FFFFFF" stroke="#854D0E" strokeWidth="3" strokeLinejoin="round" />
        <rect x="52" y="24" width="56" height="16" fill="#22C55E" stroke="#14532D" strokeWidth="2.5" />
        {/* Jendela bulir beras */}
        <circle cx="80" cy="68" r="18" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="2" />
        <ellipse cx="74" cy="66" rx="4" ry="2" transform="rotate(-25 74 66)" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1.2" />
        <ellipse cx="84" cy="64" rx="4" ry="2" transform="rotate(20 84 64)" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1.2" />
        <ellipse cx="79" cy="73" rx="4" ry="2" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1.2" />
        <rect x="56" y="103" width="48" height="13" rx="5" fill="#14532D" />
        <text x="80" y="113" textAnchor="middle" fill="#FEFCE8" fontSize="9" fontWeight="800">1 KG</text>
      </g>
    ),
  },
  'beras-2': {
    bg: '#ECFCCB',
    accentCircle: '#D9F99D',
    render: () => (
      <g>
        {/* Kantong beras 2 kg kraft & hijau */}
        <rect x="44" y="22" width="72" height="76" rx="10" fill="#FEF3C7" stroke="#78350F" strokeWidth="3" />
        <rect x="46" y="24" width="68" height="22" rx="7" fill="#65A30D" />
        {/* Tangkai padi */}
        <path d="M80 86V52" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="73" cy="60" rx="5" ry="2.5" transform="rotate(-35 73 60)" fill="#EAB308" />
        <ellipse cx="87" cy="60" rx="5" ry="2.5" transform="rotate(35 87 60)" fill="#EAB308" />
        <ellipse cx="73" cy="70" rx="5" ry="2.5" transform="rotate(-35 73 70)" fill="#EAB308" />
        <ellipse cx="87" cy="70" rx="5" ry="2.5" transform="rotate(35 87 70)" fill="#EAB308" />
        <rect x="56" y="103" width="48" height="13" rx="5" fill="#365314" />
        <text x="80" y="113" textAnchor="middle" fill="#ECFCCB" fontSize="9" fontWeight="800">2 KG</text>
      </g>
    ),
  },
  'beras-5': {
    bg: '#D1FAE5',
    accentCircle: '#A7F3D0',
    render: () => (
      <g>
        {/* Karung beras 5 kg */}
        <path d="M40 24H120L124 92C124 97 119 100 114 100H46C41 100 36 97 36 92L40 24Z" fill="#FFFBEB" stroke="#065F46" strokeWidth="3" />
        <line x1="40" y1="30" x2="120" y2="30" stroke="#059669" strokeWidth="3" strokeDasharray="5 4" />
        <circle cx="80" cy="65" r="22" fill="#10B981" />
        <text x="80" y="63" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900">BERAS</text>
        <text x="80" y="76" textAnchor="middle" fill="#FEF08A" fontSize="11" fontWeight="900">5 KG</text>
        <rect x="54" y="104" width="52" height="13" rx="5" fill="#064E3B" />
        <text x="80" y="114" textAnchor="middle" fill="#D1FAE5" fontSize="9" fontWeight="800">5 KG</text>
      </g>
    ),
  },
  'beras-10': {
    bg: '#FFEDD5',
    accentCircle: '#FED7AA',
    render: () => (
      <g>
        {/* Karung besar 10 kg merah-emas */}
        <path d="M30 22H130L136 92C136 97 131 100 125 100H35C29 100 24 97 24 92L30 22Z" fill="#FFF7ED" stroke="#9A3412" strokeWidth="3" />
        <rect x="30" y="22" width="100" height="14" fill="#DC2626" stroke="#9A3412" strokeWidth="2.5" />
        <circle cx="80" cy="67" r="24" fill="#EA580C" />
        <text x="80" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">SPESIAL</text>
        <text x="80" y="78" textAnchor="middle" fill="#FEF08A" fontSize="12" fontWeight="900">10 KG</text>
        <rect x="52" y="104" width="56" height="13" rx="5" fill="#9A3412" />
        <text x="80" y="114" textAnchor="middle" fill="#FFEDD5" fontSize="9" fontWeight="800">10 KG</text>
      </g>
    ),
  },

  // =========================================================================
  // 8. MINYAK GORENG
  // =========================================================================
  'minyak-500': {
    bg: '#FEF9C3',
    accentCircle: '#FEF08A',
    render: () => (
      <g>
        {/* Pouch mini 500 ml */}
        <path d="M54 24H106L110 96H50L54 24Z" fill="#FACC15" stroke="#854D0E" strokeWidth="3" strokeLinejoin="round" />
        <path d="M80 42C80 42 93 58 93 68C93 75 87 81 80 81C73 81 67 75 67 68C67 58 80 42 80 42Z" fill="#FFFBEB" stroke="#CA8A04" strokeWidth="2.5" />
        <path d="M76 66C76 62 79 57 79 57" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="54" y="103" width="52" height="13" rx="5" fill="#854D0E" />
        <text x="80" y="113" textAnchor="middle" fill="#FEF9C3" fontSize="9" fontWeight="800">500 ml</text>
      </g>
    ),
  },
  'minyak-1000': {
    bg: '#FEF3C7',
    accentCircle: '#FDE68A',
    render: () => (
      <g>
        {/* Pouch standar 1 liter */}
        <path d="M46 20H114L118 98H42L46 20Z" fill="#F59E0B" stroke="#78350F" strokeWidth="3" strokeLinejoin="round" />
        <rect x="48" y="22" width="64" height="16" fill="#D97706" />
        <path d="M80 44C80 44 96 62 96 73C96 82 88.8 88 80 88C71.2 88 64 82 64 73C64 62 80 44 80 44Z" fill="#FEF08A" stroke="#92400E" strokeWidth="2.5" />
        <rect x="52" y="104" width="56" height="13" rx="5" fill="#78350F" />
        <text x="80" y="114" textAnchor="middle" fill="#FEF3C7" fontSize="9" fontWeight="800">1 LITER</text>
      </g>
    ),
  },
  'minyak-2000': {
    bg: '#FFEDD5',
    accentCircle: '#FED7AA',
    render: () => (
      <g>
        {/* Pouch 2 liter lebar dengan corong tuang */}
        <rect x="96" y="14" width="12" height="10" rx="2.5" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.5" />
        <path d="M38 22H122L126 98H34L38 22Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" strokeLinejoin="round" />
        <rect x="44" y="34" width="72" height="52" rx="10" fill="#FDE047" />
        <path d="M80 42C80 42 93 57 93 66C93 73 87 79 80 79C73 79 67 73 67 66C67 57 80 42 80 42Z" fill="#F97316" />
        <rect x="52" y="104" width="56" height="13" rx="5" fill="#7C2D12" />
        <text x="80" y="114" textAnchor="middle" fill="#FFEDD5" fontSize="9" fontWeight="800">2 LITER</text>
      </g>
    ),
  },
  'minyak-5000': {
    bg: '#FEE2E2',
    accentCircle: '#FECACA',
    render: () => (
      <g>
        {/* Jerigen 5 liter kuning dengan tutup merah */}
        <rect x="64" y="14" width="18" height="9" rx="3" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" />
        <path d="M52 23H94L114 38V92C114 96 110 99 106 99H46C42 99 38 96 38 92V38L52 23Z" fill="#FACC15" stroke="#92400E" strokeWidth="3" />
        {/* Lubang gagang jerigen */}
        <rect x="86" y="34" width="14" height="22" rx="5" fill="#FEE2E2" stroke="#92400E" strokeWidth="2.5" />
        {/* Label tengah */}
        <rect x="46" y="54" width="44" height="32" rx="6" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
        <text x="68" y="74" textAnchor="middle" fill="#B45309" fontSize="12" fontWeight="900">5 L</text>
        <rect x="46" y="104" width="68" height="13" rx="5" fill="#92400E" />
        <text x="80" y="114" textAnchor="middle" fill="#FEF9C3" fontSize="9" fontWeight="800">JERIGEN 5 L</text>
      </g>
    ),
  },

  // =========================================================================
  // 9. SABUN MANDI
  // =========================================================================
  'sabun-80': {
    bg: '#FCE7F3',
    accentCircle: '#FBCFE8',
    render: () => (
      <g>
        {/* Sabun batang pink oval dengan gelembung */}
        <circle cx="48" cy="36" r="8" fill="#FFFFFF" stroke="#EC4899" strokeWidth="2" />
        <circle cx="114" cy="40" r="6" fill="#FFFFFF" stroke="#EC4899" strokeWidth="2" />
        <circle cx="106" cy="28" r="4" fill="#FFFFFF" stroke="#EC4899" strokeWidth="1.8" />
        <rect x="42" y="46" width="76" height="44" rx="22" fill="#F472B6" stroke="#9D174D" strokeWidth="3" />
        <rect x="54" y="56" width="52" height="24" rx="12" fill="#FBCFE8" />
        <rect x="56" y="102" width="48" height="14" rx="5" fill="#9D174D" />
        <text x="80" y="112" textAnchor="middle" fill="#FCE7F3" fontSize="9" fontWeight="800">80 g</text>
      </g>
    ),
  },
  'sabun-100': {
    bg: '#D1FAE5',
    accentCircle: '#A7F3D0',
    render: () => (
      <g>
        {/* Sabun batang mint hijau dalam kotak */}
        <circle cx="44" cy="32" r="7" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
        <circle cx="116" cy="36" r="5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
        <rect x="38" y="42" width="84" height="50" rx="12" fill="#10B981" stroke="#065F46" strokeWidth="3" />
        <rect x="48" y="51" width="64" height="32" rx="8" fill="#ECFDF5" />
        {/* Daun segar */}
        <path d="M68 72C72 58 88 58 92 64C86 76 74 76 68 72Z" fill="#059669" />
        <rect x="54" y="102" width="52" height="14" rx="5" fill="#065F46" />
        <text x="80" y="112" textAnchor="middle" fill="#D1FAE5" fontSize="9" fontWeight="800">100 g</text>
      </g>
    ),
  },
  'sabun-240': {
    bg: '#EDE9FE',
    accentCircle: '#DDD6FE',
    render: () => (
      <g>
        {/* Paket 3 batang sabun ungu-biru */}
        {[28, 52, 76].map((y, idx) => (
          <g key={y}>
            <rect
              x="40"
              y={y}
              width="80"
              height="22"
              rx="11"
              fill={['#8B5CF6', '#6366F1', '#A855F7'][idx]}
              stroke="#4C1D95"
              strokeWidth="2.5"
            />
            <rect x="54" y={y + 6} width="52" height="10" rx="5" fill="#EDE9FE" opacity="0.85" />
          </g>
        ))}
        <rect x="42" y="103" width="76" height="13" rx="5" fill="#4C1D95" />
        <text x="80" y="113" textAnchor="middle" fill="#EDE9FE" fontSize="9" fontWeight="800">3 × 80 g</text>
      </g>
    ),
  },
  'sabun-300': {
    bg: '#FFEDD5',
    accentCircle: '#FED7AA',
    render: () => (
      <g>
        {/* Paket 4 batang sabun oranye-rose */}
        <rect x="28" y="28" width="104" height="68" rx="12" fill="#FB7185" stroke="#9F1239" strokeWidth="3" />
        {[
          { x: 38, y: 38 },
          { x: 82, y: 38 },
          { x: 38, y: 66 },
          { x: 82, y: 66 },
        ].map((pos, idx) => (
          <rect
            key={idx}
            x={pos.x}
            y={pos.y}
            width="40"
            height="22"
            rx="10"
            fill="#FFF1F2"
            stroke="#9F1239"
            strokeWidth="2"
          />
        ))}
        <rect x="42" y="102" width="76" height="14" rx="5" fill="#9F1239" />
        <text x="80" y="112" textAnchor="middle" fill="#FFE4E6" fontSize="9" fontWeight="800">4 × 75 g</text>
      </g>
    ),
  },

  // =========================================================================
  // 10. DETERJEN BUBUK
  // =========================================================================
  'deterjen-200': {
    bg: '#CFFAFE',
    accentCircle: '#A5F3FC',
    render: () => (
      <g>
        {/* Sachet deterjen 200 g */}
        <rect x="50" y="22" width="60" height="74" rx="8" fill="#06B6D4" stroke="#164E63" strokeWidth="3" />
        <circle cx="72" cy="54" r="10" fill="#FFFFFF" opacity="0.9" />
        <circle cx="90" cy="48" r="7" fill="#FFFFFF" opacity="0.9" />
        <circle cx="84" cy="68" r="12" fill="#ECFEFF" stroke="#0891B2" strokeWidth="2" />
        <rect x="54" y="102" width="52" height="14" rx="5" fill="#164E63" />
        <text x="80" y="112" textAnchor="middle" fill="#CFFAFE" fontSize="9" fontWeight="800">200 g</text>
      </g>
    ),
  },
  'deterjen-500': {
    bg: '#DBEAFE',
    accentCircle: '#BFDBFE',
    render: () => (
      <g>
        {/* Pouch sedang 500 g biru */}
        <path d="M46 20H114L118 98H42L46 20Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="80" cy="58" r="22" fill="#EFF6FF" />
        <circle cx="72" cy="54" r="7" fill="#60A5FA" />
        <circle cx="87" cy="52" r="5" fill="#93C5FD" />
        <circle cx="82" cy="66" r="8" fill="#3B82F6" />
        <rect x="54" y="103" width="52" height="13" rx="5" fill="#1E3A8A" />
        <text x="80" y="113" textAnchor="middle" fill="#DBEAFE" fontSize="9" fontWeight="800">500 g</text>
      </g>
    ),
  },
  'deterjen-800': {
    bg: '#E0E7FF',
    accentCircle: '#C7D2FE',
    render: () => (
      <g>
        {/* Kemasan refill 800 g dengan gambar kaus bersih */}
        <path d="M38 18H122L126 98H34L38 18Z" fill="#4F46E5" stroke="#312E81" strokeWidth="3" strokeLinejoin="round" />
        <rect x="46" y="32" width="68" height="52" rx="10" fill="#EEF2FF" />
        {/* Ikon kaus berkilau */}
        <path d="M66 44L74 40H86L94 44L100 52L93 57L90 53V76H70V53L67 57L60 52L66 44Z" fill="#14B8A6" stroke="#134E4A" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M104 38L106 42L110 44L106 46L104 50L102 46L98 44L102 42Z" fill="#F59E0B" />
        <rect x="54" y="103" width="52" height="13" rx="5" fill="#312E81" />
        <text x="80" y="113" textAnchor="middle" fill="#E0E7FF" fontSize="9" fontWeight="800">800 g</text>
      </g>
    ),
  },
  'deterjen-1000': {
    bg: '#FAE8FF',
    accentCircle: '#F5D0FE',
    render: () => (
      <g>
        {/* Kemasan besar 1 kg ungu-magenta */}
        <rect x="34" y="18" width="92" height="80" rx="10" fill="#C026D3" stroke="#701A75" strokeWidth="3" />
        <rect x="44" y="28" width="72" height="48" rx="8" fill="#FDF4FF" />
        <circle cx="68" cy="52" r="10" fill="#E879F9" />
        <circle cx="88" cy="48" r="12" fill="#A855F7" />
        <circle cx="78" cy="62" r="7" fill="#F0ABFC" />
        <text x="80" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">BESAR 1 KG</text>
        <rect x="54" y="103" width="52" height="13" rx="5" fill="#701A75" />
        <text x="80" y="113" textAnchor="middle" fill="#FAE8FF" fontSize="9" fontWeight="800">1 KG</text>
      </g>
    ),
  },
};

export function ProductArtwork({
  productId,
  name,
  fallbackEmoji = '📦',
  size = 'lg',
  className = '',
}: ProductArtworkProps) {
  const artwork = ARTWORK_MAP[productId];

  const containerSize =
    size === 'sm'
      ? 'w-14 h-14 rounded-xl'
      : size === 'md'
      ? 'w-20 h-20 rounded-2xl'
      : 'w-full h-32 rounded-xl';

  if (!artwork) {
    return (
      <div
        className={`${containerSize} bg-slate-50 border border-slate-200 flex items-center justify-center text-4xl select-none shrink-0 ${className}`}
        role="img"
        aria-label={name}
      >
        <span>{fallbackEmoji}</span>
      </div>
    );
  }

  return (
    <div
      className={`${containerSize} overflow-hidden flex items-center justify-center select-none shrink-0 border border-black/5 ${className}`}
      style={{ backgroundColor: artwork.bg }}
      role="img"
      aria-label={`Ilustrasi ${name}`}
    >
      <svg
        viewBox="0 0 160 124"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[160px]"
      >
        <circle cx="80" cy="62" r="46" fill={artwork.accentCircle} opacity="0.7" />
        {artwork.render()}
      </svg>
    </div>
  );
}
