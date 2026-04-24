import React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import {
  CLAMP, DARK, EASE_OUT_EXPO, EMERALD, EMERALD_LIGHT,
  FONT, GRAY, GRID_LINE, PNL_HEADERS, PNL_ROWS, WHITE,
} from './shared';

interface Props {
  rowsVisible: number;      // 0–4, can be fractional for animation
  formulaText?: string;
  searchRows?: number[];    // row indices (0-based) showing search chip
}

const COL_WIDTHS = [320, 200, 200, 200]; // px, first col wider
const ROW_H = 72;
const HEADER_H = 56;
const FORMULA_H = 52;
const TOTAL_W = COL_WIDTHS.reduce((a, b) => a + b, 0); // 920px

const Cell: React.FC<{
  children: React.ReactNode;
  width: number;
  isHeader?: boolean;
  isRowNum?: boolean;
  isFormula?: boolean;
  highlight?: boolean;
  align?: 'left' | 'right' | 'center';
}> = ({ children, width, isHeader, isRowNum, isFormula, highlight, align = 'left' }) => (
  <div
    style={{
      width,
      minWidth: width,
      height: isHeader ? HEADER_H : ROW_H,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: align === 'right' ? 0 : 20,
      paddingRight: align === 'right' ? 20 : 0,
      justifyContent: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start',
      fontSize: isHeader ? 26 : 28,
      fontWeight: isHeader ? 600 : 400,
      fontFamily: FONT,
      color: isHeader ? GRAY : isRowNum ? GRAY : isFormula ? EMERALD : DARK,
      background: highlight ? EMERALD_LIGHT : isHeader ? '#F1F5F9' : WHITE,
      borderRight: `1px solid ${GRID_LINE}`,
      borderBottom: `1px solid ${GRID_LINE}`,
      fontVariantNumeric: 'tabular-nums',
      boxSizing: 'border-box',
      letterSpacing: isHeader ? '0.02em' : 0,
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

const SearchChip: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: EMERALD_LIGHT,
    border: `1px solid #86EFAC`,
    borderRadius: 20,
    padding: '4px 14px',
    fontSize: 22,
    color: EMERALD,
    fontFamily: FONT,
    fontWeight: 500,
    opacity,
    marginLeft: 10,
    flexShrink: 0,
  }}>
    <span style={{ fontSize: 20 }}>⌕</span> web
  </div>
);

export const SpreadsheetGrid: React.FC<Props> = ({
  rowsVisible,
  formulaText,
  searchRows = [],
}) => {
  const frame = useCurrentFrame();

  const chipOpacity = interpolate(frame, [0, 20], [0, 1], CLAMP);

  return (
    <div style={{
      width: TOTAL_W,
      background: WHITE,
      borderRadius: 20,
      overflow: 'hidden',
      border: `1px solid ${GRID_LINE}`,
      boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
      fontFamily: FONT,
    }}>
      {/* Formula bar */}
      <div style={{
        height: FORMULA_H,
        background: '#F8FAFC',
        borderBottom: `1px solid ${GRID_LINE}`,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        gap: 16,
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: EMERALD,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          color: WHITE,
          fontWeight: 700,
          flexShrink: 0,
        }}>
          fx
        </div>
        <div style={{
          flex: 1,
          fontSize: 24,
          color: formulaText ? EMERALD : GRAY,
          fontFamily: '"SF Mono", "Fira Code", monospace',
          letterSpacing: '0.02em',
          opacity: formulaText ? 1 : 0.5,
        }}>
          {formulaText ?? 'Select a cell'}
        </div>
      </div>

      {/* Column headers */}
      <div style={{ display: 'flex' }}>
        {PNL_HEADERS.map((h, i) => (
          <Cell key={h} width={COL_WIDTHS[i]} isHeader align={i === 0 ? 'left' : 'right'}>
            {h}
          </Cell>
        ))}
      </div>

      {/* Data rows */}
      {PNL_ROWS.map((row, ri) => {
        const rowProgress = interpolate(rowsVisible, [ri, ri + 1], [0, 1], CLAMP);
        const isSearch = searchRows.includes(ri);
        const rowOpacity = interpolate(rowProgress, [0, 0.4], [0, 1], CLAMP);
        const rowTranslate = interpolate(rowProgress, [0, 1], [30, 0], {
          ...CLAMP,
          easing: Easing.bezier(...EASE_OUT_EXPO),
        });

        return (
          <div
            key={ri}
            style={{
              display: 'flex',
              opacity: rowOpacity,
              transform: `translateY(${rowTranslate}px)`,
            }}
          >
            {/* Label cell */}
            <div style={{
              width: COL_WIDTHS[0],
              minWidth: COL_WIDTHS[0],
              height: ROW_H,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 20,
              paddingRight: 12,
              borderRight: `1px solid ${GRID_LINE}`,
              borderBottom: `1px solid ${GRID_LINE}`,
              background: isSearch ? EMERALD_LIGHT : WHITE,
              boxSizing: 'border-box',
              flexShrink: 0,
              gap: 0,
            }}>
              <span style={{ fontSize: 28, fontWeight: 500, color: DARK, fontFamily: FONT }}>
                {row.label}
              </span>
              {isSearch && <SearchChip opacity={chipOpacity} />}
            </div>

            {/* Value cells */}
            {row.values.map((val, ci) => (
              <Cell
                key={ci}
                width={COL_WIDTHS[ci + 1]}
                align="right"
                isFormula={!!row.formula && ci === 0}
                highlight={isSearch}
              >
                {row.formula && ci === 0 ? row.formula : val}
              </Cell>
            ))}
          </div>
        );
      })}
    </div>
  );
};
