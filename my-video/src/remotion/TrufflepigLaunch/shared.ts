export const EMERALD = '#16A34A';
export const EMERALD_LIGHT = '#DCFCE7';
export const EMERALD_BORDER = '#86EFAC';
export const BG = '#F8F8F6';
export const DARK = '#0F172A';
export const MID = '#475569';
export const GRAY = '#94A3B8';
export const GRID_LINE = '#E8EBF0';
export const WHITE = '#FFFFFF';
export const FONT = '"Inter", system-ui, sans-serif';

export const CLAMP = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const;

// P&L data rows
export const PNL_HEADERS = ['Category', 'Jan', 'Feb', 'Mar'];
export const PNL_ROWS = [
  { label: 'Revenue',      values: ['$124,000', '$138,000', '$152,000'], formula: null },
  { label: 'COGS',         values: ['$62,000',  '$69,000',  '$76,000'],  formula: null },
  { label: 'Gross Profit', values: ['$62,000',  '$69,000',  '$76,000'],  formula: '=B2−B3' },
  { label: 'EBITDA',       values: ['$31,000',  '$35,200',  '$40,500'],  formula: null },
];

export const CHART_DATA = [
  { label: 'Jan', value: 124000 },
  { label: 'Feb', value: 138000 },
  { label: 'Mar', value: 152000 },
];
