import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COPY } from '../../gusshausPremiumData';
import { fadeIn, liftIn, drawProgress } from '../../gusshausPremiumMotion';
import { TextReveal, TrackedReveal, RuleReveal } from './EditorialTypography';

export const CTAInvitation: React.FC = () => {
  const frame = useCurrentFrame();
  const { headline, invitation, website, note } = COPY.cta;
  const screenFade = fadeIn(frame, 0, 18);

  const headAnim  = liftIn(frame, 30);
  const invAnim   = liftIn(frame, 90);
  const webAnim   = liftIn(frame, 140);
  const noteAnim  = liftIn(frame, 190);

  // Breath line — draws fully by frame 40, holds
  const breathLine = drawProgress(frame, 16, 36);

  // Final fade — gentle hold to black at very end
  const finalFade = interpolate(frame, [300, 330], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: screenFade * finalFade }}>
      {/* Very subtle warm glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(196,169,109,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Architectural breath line — top half */}
      <svg
        width={1920} height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <line
          x1="120" y1="500"
          x2={120 + 1680 * breathLine} y2="500"
          stroke="rgba(196,169,109,0.12)"
          strokeWidth="0.6"
        />
      </svg>

      <div style={{
        position: 'absolute',
        left: 120,
        top: '50%',
        transform: 'translateY(-50%)',
        maxWidth: 1100,
      }}>
        {/* Headline */}
        <div style={{
          opacity: headAnim.opacity,
          transform: `translateY(${headAnim.translateY}px)`,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 92,
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          color: '#F0EBE1',
          whiteSpace: 'pre-line',
          marginBottom: 56,
        }}>
          {headline}
        </div>

        {/* Invitation */}
        <div style={{
          opacity: invAnim.opacity,
          transform: `translateY(${invAnim.translateY}px)`,
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 28,
          fontWeight: 300,
          color: 'rgba(240,235,225,0.55)',
          marginBottom: 52,
        }}>
          {invitation}
        </div>

        {/* Rule */}
        <div style={{
          width: `${drawProgress(frame, 130, 24) * 220}px`,
          height: 1,
          background: 'rgba(196,169,109,0.3)',
          marginBottom: 36,
        }} />

        {/* Website */}
        <div style={{
          opacity: webAnim.opacity,
          transform: `translateY(${webAnim.translateY}px)`,
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 14,
          fontWeight: 400,
          letterSpacing: '0.42em',
          color: '#C4A96D',
          marginBottom: 36,
        }}>
          {website}
        </div>

        {/* Note */}
        <div style={{
          opacity: noteAnim.opacity,
          transform: `translateY(${noteAnim.translateY}px)`,
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 16,
          fontWeight: 300,
          lineHeight: 1.7,
          color: 'rgba(240,235,225,0.28)',
          whiteSpace: 'pre-line',
        }}>
          {note}
        </div>
      </div>

      {/* Brand wordmark — positioned bottom right for this beat */}
      <div style={{
        position: 'absolute',
        bottom: 120,
        right: 120,
        opacity: fadeIn(frame, 50, 30) * 0.45,
        fontFamily: "'Helvetica Neue', sans-serif",
        fontSize: 11,
        fontWeight: 400,
        letterSpacing: '0.46em',
        textTransform: 'uppercase',
        color: '#C4A96D',
      }}>
        GUSSHAUS
      </div>
    </AbsoluteFill>
  );
};
