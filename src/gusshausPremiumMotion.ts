import { interpolate, Easing } from 'remotion';

export function fadeIn(frame: number, start: number, duration = 20): number {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
}

export function fadeOut(frame: number, start: number, duration = 15): number {
  return interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });
}

export function liftIn(
  frame: number,
  start: number,
  duration = 26,
): { opacity: number; translateY: number } {
  const p = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return { opacity: p, translateY: (1 - p) * 16 };
}

export function settle(frame: number, start: number, end: number, amount = 6): number {
  return interpolate(frame, [start, end], [0, amount], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.sin),
  });
}

export function drawProgress(frame: number, start: number, duration = 30): number {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
}

export function revealClip(frame: number, start: number, duration = 28): string {
  const p = drawProgress(frame, start, duration);
  const remaining = 100 - p * 100;
  return `inset(0 ${remaining.toFixed(2)}% 0 0)`;
}

export function nodeOpacity(frame: number, delay: number): number {
  return fadeIn(frame, delay, 12);
}

export function edgeOpacity(frame: number, delayA: number, delayB: number): number {
  const edgeStart = Math.max(delayA, delayB) + 6;
  return fadeIn(frame, edgeStart, 18) * 0.35;
}
