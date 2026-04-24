import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CLAMP, EMERALD, FONT, WHITE } from './shared';

const CURSOR_PERIOD = 28; // frames per blink cycle

const Cursor: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(
    frame % CURSOR_PERIOD,
    [0, CURSOR_PERIOD * 0.45, CURSOR_PERIOD * 0.5, CURSOR_PERIOD],
    [1, 1, 0, 0],
    CLAMP,
  );
  return (
    <span style={{ opacity, color: EMERALD, fontWeight: 300, marginLeft: 2 }}>|</span>
  );
};

interface Props {
  prompt: string;
  charsVisible: number; // 0 → prompt.length, can be fractional
  barOpacity?: number;
}

export const PromptBar: React.FC<Props> = ({ prompt, charsVisible, barOpacity = 1 }) => {
  const frame = useCurrentFrame();
  const typed = prompt.slice(0, Math.floor(charsVisible));
  const done = charsVisible >= prompt.length;

  return (
    <div style={{
      opacity: barOpacity,
      background: 'rgba(15, 23, 42, 0.92)',
      backdropFilter: 'blur(12px)',
      borderRadius: 18,
      padding: '22px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
      border: '1px solid rgba(255,255,255,0.08)',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* AI icon */}
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: EMERALD,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 26,
        flexShrink: 0,
      }}>
        ✦
      </div>

      {/* Typed text */}
      <div style={{
        flex: 1,
        fontSize: 30,
        color: WHITE,
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '-0.01em',
        lineHeight: 1.3,
      }}>
        {typed}
        {!done && <Cursor frame={frame} />}
      </div>

      {/* Send button (appears when done) */}
      {done && (
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: EMERALD,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          color: WHITE,
          flexShrink: 0,
        }}>
          ↵
        </div>
      )}
    </div>
  );
};
