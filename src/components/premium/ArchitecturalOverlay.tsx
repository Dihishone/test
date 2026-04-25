import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { drawProgress } from '../../gusshausPremiumMotion';

export const ArchitecturalOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const lp = drawProgress(frame, 8, 45);

  const rule  = `rgba(240,235,225,${lp * 0.09})`;
  const margin = `rgba(240,235,225,${lp * 0.055})`;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Top horizontal rule */}
        <line x1="0" y1="138" x2={1920 * lp} y2="138" stroke={rule} strokeWidth="0.6" />
        {/* Bottom horizontal rule */}
        <line x1="0" y1="942" x2={1920 * lp} y2="942" stroke={rule} strokeWidth="0.6" />
        {/* Left margin */}
        <line x1="120" y1="0" x2="120" y2={1080 * lp} stroke={margin} strokeWidth="0.5" />
        {/* Right margin */}
        <line x1="1800" y1="0" x2="1800" y2={1080 * lp} stroke={margin} strokeWidth="0.5" />
      </svg>
    </AbsoluteFill>
  );
};
