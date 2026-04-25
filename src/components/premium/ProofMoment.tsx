import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COPY } from '../../gusshausPremiumData';
import { fadeIn, liftIn, drawProgress } from '../../gusshausPremiumMotion';
import { TextReveal, TrackedReveal, RuleReveal } from './EditorialTypography';

export const ProofMoment: React.FC = () => {
  const frame = useCurrentFrame();
  const { names, role, brand, statement } = COPY.proof;
  const screenFade = fadeIn(frame, 0, 18);

  const name1 = liftIn(frame, 28);
  const name2 = liftIn(frame, 46);
  const roleAnim = liftIn(frame, 80);
  const stmtAnim = liftIn(frame, 120);

  // Warm vertical accent bar
  const barHeight = interpolate(frame, [16, 50], [0, 480], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Horizontal rule between names and role
  const ruleWidth = drawProgress(frame, 76, 28);

  return (
    <AbsoluteFill style={{ opacity: screenFade }}>
      {/* Subtle warm background gradient specific to this beat */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 55% 65% at 35% 50%, rgba(196,169,109,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Vertical accent bar */}
      <svg
        width={1920} height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <line
          x1="120" y1="240"
          x2="120" y2={240 + barHeight}
          stroke="rgba(196,169,109,0.5)"
          strokeWidth="1.5"
        />
        {/* Right-side faint decorative line */}
        <line
          x1="1800" y1="380"
          x2="1800" y2={380 + barHeight * 0.6}
          stroke="rgba(240,235,225,0.06)"
          strokeWidth="0.6"
        />
      </svg>

      <div style={{
        position: 'absolute',
        left: 160,
        top: '50%',
        transform: 'translateY(-50%)',
        maxWidth: 900,
      }}>
        {/* Label */}
        <TextReveal frame={frame} start={14} style={{
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#C4A96D',
          marginBottom: 36,
        }}>
          {brand}
        </TextReveal>

        {/* Names */}
        <div style={{
          opacity: name1.opacity,
          transform: `translateY(${name1.translateY}px)`,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 80,
          fontWeight: 300,
          lineHeight: 1.05,
          letterSpacing: '-0.01em',
          color: '#F0EBE1',
        }}>
          {names[0]}
        </div>

        <div style={{
          opacity: name2.opacity,
          transform: `translateY(${name2.translateY}px)`,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 80,
          fontWeight: 300,
          lineHeight: 1.05,
          letterSpacing: '-0.01em',
          color: '#F0EBE1',
          marginBottom: 36,
        }}>
          {names[1]}
        </div>

        {/* Horizontal rule */}
        <div style={{
          width: `${ruleWidth * 280}px`,
          height: 1,
          background: 'rgba(196,169,109,0.3)',
          marginBottom: 28,
        }} />

        {/* Role */}
        <div style={{
          opacity: roleAnim.opacity,
          transform: `translateY(${roleAnim.translateY}px)`,
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 15,
          fontWeight: 300,
          letterSpacing: '0.14em',
          color: 'rgba(196,169,109,0.85)',
          textTransform: 'uppercase',
          marginBottom: 56,
        }}>
          {role}
        </div>

        {/* Statement */}
        <div style={{
          opacity: stmtAnim.opacity,
          transform: `translateY(${stmtAnim.translateY}px)`,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 42,
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.35,
          color: 'rgba(240,235,225,0.52)',
          whiteSpace: 'pre-line',
          maxWidth: 760,
        }}>
          {statement}
        </div>
      </div>

      <TrackedReveal
        frame={frame} start={8} text="GUSSHAUS"
        style={{
          position: 'absolute', top: 120, left: 120,
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 13, fontWeight: 400,
          letterSpacing: '0.46em', textTransform: 'uppercase',
          color: 'rgba(196,169,109,0.55)',
        }}
      />
    </AbsoluteFill>
  );
};
