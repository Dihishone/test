import React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { CLAMP, DARK, EASE_OUT_EXPO, EMERALD, FONT, GRAY, MID, WHITE } from './shared';

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();

  const logoY = interpolate(frame, [0, 30], [40, 0], {
    ...CLAMP,
    easing: Easing.bezier(...EASE_OUT_EXPO),
  });
  const logoOp = interpolate(frame, [0, 25], [0, 1], CLAMP);

  const taglineY = interpolate(frame, [15, 42], [30, 0], {
    ...CLAMP,
    easing: Easing.bezier(...EASE_OUT_EXPO),
  });
  const taglineOp = interpolate(frame, [15, 38], [0, 1], CLAMP);

  const ctaY = interpolate(frame, [28, 52], [28, 0], {
    ...CLAMP,
    easing: Easing.bezier(...EASE_OUT_EXPO),
  });
  const ctaOp = interpolate(frame, [28, 50], [0, 1], CLAMP);

  const footerOp = interpolate(frame, [45, 62], [0, 1], CLAMP);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: WHITE,
      gap: 0,
    }}>
      {/* Decorative top accent */}
      <div style={{
        width: 64,
        height: 6,
        background: EMERALD,
        borderRadius: 3,
        marginBottom: 56,
        opacity: logoOp,
      }} />

      {/* Trufflepig wordmark */}
      <div style={{
        opacity: logoOp,
        transform: `translateY(${logoY}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        marginBottom: 24,
      }}>
        {/* Pig snout icon made from shapes */}
        <div style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: EMERALD,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
        }}>
          🐷
        </div>
        <span style={{
          fontSize: 72,
          fontWeight: 700,
          color: DARK,
          fontFamily: FONT,
          letterSpacing: '-0.04em',
        }}>
          trufflepig
        </span>
      </div>

      {/* Tagline */}
      <div style={{
        opacity: taglineOp,
        transform: `translateY(${taglineY}px)`,
        fontSize: 38,
        fontWeight: 400,
        color: MID,
        fontFamily: FONT,
        letterSpacing: '-0.01em',
        marginBottom: 72,
        textAlign: 'center',
      }}>
        The AI-first Spreadsheet
      </div>

      {/* CTA Button */}
      <div style={{
        opacity: ctaOp,
        transform: `translateY(${ctaY}px)`,
        background: EMERALD,
        color: WHITE,
        borderRadius: 18,
        padding: '28px 72px',
        fontSize: 38,
        fontWeight: 600,
        fontFamily: FONT,
        letterSpacing: '-0.01em',
        marginBottom: 48,
        boxShadow: '0 8px 32px rgba(22, 163, 74, 0.32)',
      }}>
        Start for free →
      </div>

      {/* Footer tagline */}
      <div style={{
        opacity: footerOp,
        fontSize: 28,
        color: GRAY,
        fontFamily: FONT,
        fontStyle: 'italic',
        letterSpacing: '0.01em',
        textAlign: 'center',
      }}>
        "Describe it, and it's done."
      </div>
    </div>
  );
};
