interface MascotProps {
  mood?: 'happy' | 'thinking' | 'celebrating';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Maskot ramah anak "Bibo si Kelinci Bijak" menggunakan vektor SVG murni
 * agar tampil tajam di semua layar dan cepat dimuat tanpa gambar eksternal.
 */
export function Mascot({
  mood = 'happy',
  size = 'md',
  className = '',
}: MascotProps) {
  const dimensions =
    size === 'sm' ? 'w-16 h-16' : size === 'lg' ? 'w-32 h-32 sm:w-36 sm:h-36' : 'w-24 h-24';

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 select-none ${dimensions} ${className}`}
      role="img"
      aria-label="Maskot Bibo si Kelinci Bijak"
    >
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Latar lingkaran lembut */}
        <circle cx="80" cy="84" r="68" fill="#CCFBF1" />
        <circle cx="80" cy="84" r="60" fill="#E6FFFA" />

        {/* Telinga kiri & kanan */}
        <ellipse
          cx="57"
          cy="36"
          rx="12"
          ry="28"
          transform="rotate(-12 57 36)"
          fill="#FFFFFF"
          stroke="#0F766E"
          strokeWidth="4"
        />
        <ellipse
          cx="57"
          cy="38"
          rx="5.5"
          ry="17"
          transform="rotate(-12 57 38)"
          fill="#FDA4AF"
        />
        <ellipse
          cx="103"
          cy="36"
          rx="12"
          ry="28"
          transform="rotate(12 103 36)"
          fill="#FFFFFF"
          stroke="#0F766E"
          strokeWidth="4"
        />
        <ellipse
          cx="103"
          cy="38"
          rx="5.5"
          ry="17"
          transform="rotate(12 103 38)"
          fill="#FDA4AF"
        />

        {/* Badan */}
        <path
          d="M44 134C44 114 58 103 80 103C102 103 116 114 116 134V142H44V134Z"
          fill="#0D9488"
          stroke="#0F766E"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Kerah baju kuning ceria */}
        <path
          d="M64 106L80 120L96 106"
          stroke="#FBBF24"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Kepala */}
        <ellipse
          cx="80"
          cy="82"
          rx="36"
          ry="32"
          fill="#FFFFFF"
          stroke="#0F766E"
          strokeWidth="4"
        />

        {/* Pipi merona */}
        <ellipse cx="56" cy="88" rx="6" ry="3.5" fill="#FDA4AF" opacity="0.7" />
        <ellipse cx="104" cy="88" rx="6" ry="3.5" fill="#FDA4AF" opacity="0.7" />

        {/* Mata sesuai ekspresi */}
        {mood === 'celebrating' ? (
          <>
            <path
              d="M60 77C63 72 69 72 72 77"
              stroke="#0F172A"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M88 77C91 72 97 72 100 77"
              stroke="#0F172A"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <circle cx="66" cy="77" r="5" fill="#0F172A" />
            <circle cx="68" cy="75" r="1.8" fill="#FFFFFF" />
            <circle cx="94" cy="77" r="5" fill="#0F172A" />
            <circle cx="96" cy="75" r="1.8" fill="#FFFFFF" />
          </>
        )}

        {/* Alis berpikir */}
        {mood === 'thinking' && (
          <>
            <path
              d="M59 67L72 69"
              stroke="#0F766E"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M88 69L101 66"
              stroke="#0F766E"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Hidung & Mulut */}
        <ellipse cx="80" cy="85" rx="4" ry="3" fill="#FB7185" />
        {mood === 'thinking' ? (
          <path
            d="M74 95C78 93 83 93 86 95"
            stroke="#0F172A"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ) : mood === 'celebrating' ? (
          <path
            d="M70 91C73 100 87 100 90 91Z"
            fill="#FB7185"
            stroke="#0F172A"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M71 91C74 97 86 97 89 91"
            stroke="#0F172A"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        )}

        {/* Keranjang belanja mini di kanan bawah */}
        <rect
          x="104"
          y="108"
          width="34"
          height="26"
          rx="6"
          fill="#F59E0B"
          stroke="#B45309"
          strokeWidth="3.5"
        />
        <path
          d="M112 108C112 99 130 99 130 108"
          stroke="#B45309"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line x1="114" y1="115" x2="114" y2="127" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="121" y1="115" x2="121" y2="127" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="128" y1="115" x2="128" y2="127" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" />

        {/* Bintang kecil jika merayakan */}
        {mood === 'celebrating' && (
          <>
            <path
              d="M28 52L31 59L38 62L31 65L28 72L25 65L18 62L25 59L28 52Z"
              fill="#F59E0B"
            />
            <path
              d="M136 44L138.5 50L144.5 52.5L138.5 55L136 61L133.5 55L127.5 52.5L133.5 50L136 44Z"
              fill="#F59E0B"
            />
          </>
        )}
      </svg>
    </div>
  );
}
