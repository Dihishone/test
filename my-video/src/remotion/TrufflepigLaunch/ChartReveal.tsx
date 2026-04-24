import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CHART_DATA, CLAMP, DARK, EMERALD, FONT, GRAY, GRID_LINE, MID, WHITE } from './shared';

const BAR_STAGGER = 8; // frames between each bar start
const MAX_VAL = 170000;
const BAR_MAX_H = 360; // px

export const ChartReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{
      background: WHITE,
      borderRadius: 20,
      padding: '40px 48px 36px',
      border: `1px solid ${GRID_LINE}`,
      boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
      width: 880,
    }}>
      {/* Chart title */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 28, fontWeight: 600, color: DARK, fontFamily: FONT, marginBottom: 6 }}>
          Monthly Revenue
        </div>
        <div style={{ fontSize: 23, color: GRAY, fontFamily: FONT }}>
          Q1 · Generated from model
        </div>
      </div>

      {/* Bars */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 48,
        height: BAR_MAX_H + 40,
        paddingBottom: 40,
        borderBottom: `2px solid ${GRID_LINE}`,
        justifyContent: 'center',
      }}>
        {CHART_DATA.map((d, i) => {
          const barH = spring({
            frame,
            fps,
            delay: i * BAR_STAGGER,
            config: { damping: 180, stiffness: 120, mass: 1 },
          });

          const height = barH * (d.value / MAX_VAL) * BAR_MAX_H;

          const labelOpacity = interpolate(
            frame,
            [i * BAR_STAGGER + 10, i * BAR_STAGGER + 24],
            [0, 1],
            CLAMP,
          );

          return (
            <div key={d.label} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              flex: 1,
            }}>
              {/* Value label above bar */}
              <div style={{
                fontSize: 26,
                fontWeight: 600,
                color: DARK,
                fontFamily: FONT,
                opacity: labelOpacity,
                fontVariantNumeric: 'tabular-nums',
                marginBottom: 4,
              }}>
                ${(d.value / 1000).toFixed(0)}k
              </div>

              {/* Bar */}
              <div style={{
                width: '100%',
                maxWidth: 140,
                height,
                background: `linear-gradient(to top, ${EMERALD}, #22C55E)`,
                borderRadius: '10px 10px 4px 4px',
                position: 'relative',
              }}>
                {/* Inner highlight */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '10px 10px 0 0',
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* X-axis labels */}
      <div style={{
        display: 'flex',
        gap: 48,
        marginTop: 18,
        justifyContent: 'center',
      }}>
        {CHART_DATA.map((d) => (
          <div key={d.label} style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 26,
            fontWeight: 500,
            color: MID,
            fontFamily: FONT,
          }}>
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
};
