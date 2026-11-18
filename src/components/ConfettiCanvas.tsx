import { useEffect, useRef } from 'react';

interface ConfettiCanvasProps {
  active: boolean;
}

/**
 * Animasi konfeti ringan berbasis Canvas saat siswa meraih skor tinggi (≥ 75).
 * Otomatis tidak dijalankan apabila perangkat mengaktifkan prefers-reduced-motion.
 */
export function ConfettiCanvas({ active }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active || typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#0D9488', '#F59E0B', '#10B981', '#3B82F6', '#F43F5E', '#8B5CF6'];
    const particles = Array.from({ length: 85 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.6,
      w: 7 + Math.random() * 6,
      h: 4 + Math.random() * 5,
      vx: (Math.random() - 0.5) * 3.2,
      vy: 2.2 + Math.random() * 3.5,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.16,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animationFrameId = 0;
    const startTime = performance.now();
    const durationMs = 4200;

    const render = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const opacity =
        elapsed > durationMs - 900
          ? Math.max(0, (durationMs - elapsed) / 900)
          : 1;

      ctx.globalAlpha = opacity;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.rotation += p.vRot;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (elapsed < durationMs) {
        animationFrameId = window.requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="no-print fixed inset-0 pointer-events-none z-40"
    />
  );
}
