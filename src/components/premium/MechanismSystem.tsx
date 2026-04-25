import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COPY } from '../../gusshausPremiumData';
import { fadeIn, liftIn } from '../../gusshausPremiumMotion';
import { TextReveal, TrackedReveal, RuleReveal } from './EditorialTypography';

const PANEL_STARTS = [20, 55, 90, 125] as const;

export const MechanismSystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { label, services } = COPY.mechanism;
  const screenFade = fadeIn(frame, 0, 12);

  // Spine line that connects all panels
  const spineProgress = interpolate(frame, [18, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: screenFade }}>
      {/* Vertical spine line on the left edge of the safe area */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <line
          x1="120" y1="180"
          x2="120" y2={180 + 720 * spineProgress}
          stroke="rgba(196,169,109,0.28)"
          strokeWidth="1"
        />
      </svg>

      <div style={{
        position: 'absolute',
        inset: 0,
        padding: '120px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 44 }}>
          <TextReveal frame={frame} start={10} style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#C4A96D',
          }}>
            {label}
          </TextReveal>
        </div>

        {/* 2 × 2 grid of service panels */}
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 2,
        }}>
          {services.map((svc, i) => {
            const start = PANEL_STARTS[i];
            const clipP = interpolate(frame, [start, start + 32], [0, 100], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const contentAnim = liftIn(frame, start + 20);

            return (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(240,235,225,0.08)',
                  padding: '44px 44px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  clipPath: `inset(0 ${(100 - clipP).toFixed(1)}% 0 0)`,
                }}
              >
                {/* Number */}
                <div style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 11,
                  letterSpacing: '0.15em',
                  color: '#C4A96D',
                  marginBottom: 18,
                  opacity: contentAnim.opacity,
                }}>
                  {svc.number}
                </div>

                {/* Title */}
                <div style={{
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#F0EBE1',
                  marginBottom: 30,
                  lineHeight: 1.5,
                  opacity: contentAnim.opacity,
                  transform: `translateY(${contentAnim.translateY}px)`,
                }}>
                  {svc.title}
                </div>

                {/* Rule */}
                <div style={{
                  width: `${clipP * 0.6}%`,
                  height: 1,
                  background: 'rgba(196,169,109,0.25)',
                  marginBottom: 24,
                }} />

                {/* Items */}
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {svc.items.map((item, j) => {
                    const itemAnim = liftIn(frame, start + 28 + j * 10);
                    return (
                      <li key={j} style={{
                        opacity: itemAnim.opacity,
                        transform: `translateY(${itemAnim.translateY}px)`,
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontSize: 15,
                        fontWeight: 300,
                        color: 'rgba(240,235,225,0.38)',
                        paddingLeft: 18,
                        position: 'relative',
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: '#C4A96D',
                          fontSize: 12,
                        }}>
                          —
                        </span>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
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
