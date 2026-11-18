/**
 * Efek suara ringan menggunakan Web Audio API bawaan browser.
 * Tidak memerlukan file audio eksternal dan otomatis kompatibel lintas browser.
 */

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return null;

  if (!audioContext) {
    try {
      audioContext = new AudioCtx();
    } catch {
      return null;
    }
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {});
  }

  return audioContext;
}

function playTone(
  frequency: number,
  durationSeconds: number,
  type: OscillatorType = 'sine',
  gainPeak = 0.08,
  delaySeconds = 0
): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const startTime = ctx.currentTime + delaySeconds;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(0.001, startTime);
    gainNode.gain.exponentialRampToValueAtTime(gainPeak, startTime + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      startTime + durationSeconds
    );

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + durationSeconds + 0.02);
  } catch {
    // Abaikan jika browser memblokir autoplay audio
  }
}

export type SoundEffect = 'tap' | 'add' | 'remove' | 'success' | 'warning' | 'fanfare';

export function playSound(effect: SoundEffect, isMuted: boolean): void {
  if (isMuted) return;

  switch (effect) {
    case 'tap':
      playTone(520, 0.07, 'sine', 0.05);
      break;
    case 'add':
      playTone(523.25, 0.09, 'triangle', 0.07, 0);
      playTone(659.25, 0.11, 'triangle', 0.07, 0.06);
      break;
    case 'remove':
      playTone(420, 0.09, 'sine', 0.05, 0);
      playTone(330, 0.1, 'sine', 0.05, 0.06);
      break;
    case 'warning':
      playTone(280, 0.14, 'sawtooth', 0.04, 0);
      playTone(230, 0.18, 'sawtooth', 0.04, 0.12);
      break;
    case 'success':
      playTone(523.25, 0.12, 'triangle', 0.08, 0);
      playTone(659.25, 0.12, 'triangle', 0.08, 0.09);
      playTone(783.99, 0.18, 'triangle', 0.08, 0.18);
      break;
    case 'fanfare':
      playTone(523.25, 0.14, 'triangle', 0.09, 0);
      playTone(659.25, 0.14, 'triangle', 0.09, 0.11);
      playTone(783.99, 0.14, 'triangle', 0.09, 0.22);
      playTone(1046.5, 0.34, 'triangle', 0.1, 0.33);
      break;
  }
}
