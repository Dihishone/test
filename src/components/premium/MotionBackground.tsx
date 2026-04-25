import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

// Subtle background warmth shifts per beat — all very close to void black
const BG: [number, string][] = [
  [0,    '#0B0908'],
  [150,  '#0C0A08'],
  [390,  '#0B0807'],
  [570,  '#0B0908'],
  [750,  '#0C0A09'],
  [990,  '#0A0909'],
  [1260, '#0D0B09'],
  [1470, '#0B0908'],
  [1800, '#0B0908'],
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function interpolateHex(frame: number): string {
  for (let i = 0; i < BG.length - 1; i++) {
    const [sf, sc] = BG[i];
    const [ef, ec] = BG[i + 1];
    if (frame >= sf && frame <= ef) {
      const t = (frame - sf) / (ef - sf);
      const parse = (h: string) => ({
        r: parseInt(h.slice(1, 3), 16),
        g: parseInt(h.slice(3, 5), 16),
        b: parseInt(h.slice(5, 7), 16),
      });
      const s = parse(sc);
      const e = parse(ec);
      return `rgb(${Math.round(lerp(s.r, e.r, t))},${Math.round(lerp(s.g, e.g, t))},${Math.round(lerp(s.b, e.b, t))})`;
    }
  }
  return BG[BG.length - 1][1];
}

export const MotionBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const bg = interpolateHex(frame);

  // Subtle warm glow that intensifies in the proof beat
  const proofGlow = interpolate(frame, [1260, 1320, 1380, 1470], [0, 0.06, 0.06, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: bg }}>
      {/* Studio vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)',
        pointerEvents: 'none',
      }} />
      {/* Warm proof glow */}
      {proofGlow > 0 && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 60% 60% at 38% 50%, rgba(196,169,109,${proofGlow}) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      )}
    </AbsoluteFill>
  );
};
