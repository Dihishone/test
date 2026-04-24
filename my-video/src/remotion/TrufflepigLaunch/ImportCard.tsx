import React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { CLAMP, DARK, EASE_OUT_EXPO, EMERALD, EMERALD_LIGHT, FONT, GRAY, GRID_LINE, WHITE } from './shared';

interface ImportCardProps {
  type: 'pdf' | 'image';
  delay: number; // frames delay before animating in
  transformStart: number; // frame when card starts dissolving into rows
}

const FILE_ICONS: Record<string, string> = {
  pdf: '📄',
  image: '🖼',
};

const FILE_LABELS: Record<string, { name: string; sub: string }> = {
  pdf: { name: 'Q1_Financial_Report.pdf', sub: '2.4 MB · PDF' },
  image: { name: 'revenue_screenshot.png', sub: '840 KB · PNG' },
};

export const ImportCard: React.FC<ImportCardProps> = ({ type, delay, transformStart }) => {
  const frame = useCurrentFrame();

  const slideIn = interpolate(frame, [delay, delay + 25], [120, 0], {
    ...CLAMP,
    easing: Easing.bezier(...EASE_OUT_EXPO),
  });

  const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], CLAMP);
  const dissolveOpacity = interpolate(frame, [transformStart, transformStart + 20], [1, 0], CLAMP);

  const { name, sub } = FILE_LABELS[type];

  return (
    <div style={{
      opacity: cardOpacity * dissolveOpacity,
      transform: `translateX(${slideIn}px)`,
      background: WHITE,
      borderRadius: 16,
      padding: '28px 32px',
      border: `1px solid ${GRID_LINE}`,
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      width: 560,
    }}>
      {/* File icon area */}
      <div style={{
        width: 64,
        height: 72,
        background: type === 'pdf' ? '#FEF2F2' : '#EFF6FF',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 32,
        flexShrink: 0,
        border: `1px solid ${type === 'pdf' ? '#FECACA' : '#BFDBFE'}`,
      }}>
        {FILE_ICONS[type]}
      </div>

      {/* Labels */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 26,
          fontWeight: 500,
          color: DARK,
          fontFamily: FONT,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginBottom: 6,
        }}>
          {name}
        </div>
        <div style={{ fontSize: 22, color: GRAY, fontFamily: FONT }}>{sub}</div>
      </div>

      {/* Processing indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: EMERALD_LIGHT,
        borderRadius: 20,
        padding: '6px 16px',
        flexShrink: 0,
      }}>
        <div style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: EMERALD,
        }} />
        <span style={{ fontSize: 22, color: EMERALD, fontFamily: FONT, fontWeight: 500 }}>
          Parsing
        </span>
      </div>
    </div>
  );
};

/** Rows that appear as the import "resolves" into structured data */
export const ImportedRows: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const rows = [
    ['Q1 Revenue',  '$124,000', 'Extracted'],
    ['Q1 COGS',     '$62,000',  'Extracted'],
    ['Net Margin',  '50.0%',    'Calculated'],
  ];

  return (
    <div style={{
      background: WHITE,
      borderRadius: 16,
      border: `1px solid ${GRID_LINE}`,
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      width: 560,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        background: '#F1F5F9',
        borderBottom: `1px solid ${GRID_LINE}`,
      }}>
        {['Field', 'Value', 'Source'].map((h, i) => (
          <div key={h} style={{
            flex: i === 0 ? 2 : 1,
            padding: '14px 20px',
            fontSize: 22,
            fontWeight: 600,
            color: GRAY,
            fontFamily: FONT,
            letterSpacing: '0.02em',
          }}>{h}</div>
        ))}
      </div>

      {rows.map((row, ri) => {
        const rowOpacity = interpolate(
          frame,
          [startFrame + ri * 12, startFrame + ri * 12 + 18],
          [0, 1],
          CLAMP,
        );
        const rowY = interpolate(
          frame,
          [startFrame + ri * 12, startFrame + ri * 12 + 18],
          [16, 0],
          { ...CLAMP, easing: Easing.bezier(...EASE_OUT_EXPO) },
        );

        return (
          <div key={ri} style={{
            display: 'flex',
            borderBottom: ri < rows.length - 1 ? `1px solid ${GRID_LINE}` : 'none',
            opacity: rowOpacity,
            transform: `translateY(${rowY}px)`,
          }}>
            <div style={{ flex: 2, padding: '16px 20px', fontSize: 26, color: DARK, fontFamily: FONT, fontWeight: 500 }}>{row[0]}</div>
            <div style={{ flex: 1, padding: '16px 20px', fontSize: 26, color: DARK, fontFamily: FONT, fontVariantNumeric: 'tabular-nums' }}>{row[1]}</div>
            <div style={{ flex: 1, padding: '16px 20px' }}>
              <span style={{
                background: EMERALD_LIGHT,
                color: EMERALD,
                fontSize: 20,
                fontFamily: FONT,
                fontWeight: 500,
                padding: '4px 12px',
                borderRadius: 20,
              }}>{row[2]}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
