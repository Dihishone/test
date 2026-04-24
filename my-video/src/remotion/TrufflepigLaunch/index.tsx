import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Series,
  useCurrentFrame,
} from 'remotion';
import { ChartReveal } from './ChartReveal';
import { EndCard } from './EndCard';
import { ImportCard, ImportedRows } from './ImportCard';
import { PromptBar } from './PromptBar';
import {
  BG, CLAMP, DARK, EASE_OUT_EXPO, EMERALD, EMERALD_LIGHT,
  FONT, MID, PNL_ROWS, WHITE,
} from './shared';
import { SpreadsheetGrid } from './SpreadsheetGrid';

// ─── Shared layout helpers ────────────────────────────────────────────────────

const PROMPT_TEXT = 'Build a monthly P&L from this data';
const CHARS_PER_FRAME = 0.55;

/** Fade + slide-up entrance, reset-on-scene timing */
const enter = (frame: number, delay = 0, dist = 36) => ({
  opacity: interpolate(frame, [delay, delay + 22], [0, 1], CLAMP),
  transform: `translateY(${interpolate(frame, [delay, delay + 22], [dist, 0], {
    ...CLAMP,
    easing: Easing.bezier(...EASE_OUT_EXPO),
  })}px)`,
});

/** Fade-out at end of scene */
const exit = (frame: number, sceneLen: number, dur = 18) =>
  interpolate(frame, [sceneLen - dur, sceneLen], [1, 0], CLAMP);

/** Top brand strip shown on every scene except CTA */
const BrandStrip: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <div style={{
    opacity,
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 4,
  }}>
    <div style={{
      width: 44,
      height: 44,
      borderRadius: 12,
      background: EMERALD,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
    }}>🐷</div>
    <span style={{
      fontSize: 34,
      fontWeight: 700,
      color: DARK,
      fontFamily: FONT,
      letterSpacing: '-0.03em',
    }}>trufflepig</span>
  </div>
);

/** Scene label badge */
const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    background: EMERALD_LIGHT,
    border: `1px solid #86EFAC`,
    borderRadius: 30,
    padding: '6px 20px',
    fontSize: 24,
    fontWeight: 600,
    color: EMERALD,
    fontFamily: FONT,
    letterSpacing: '0.02em',
  }}>
    {children}
  </div>
);

/** Standard scene wrapper with padding */
const Scene: React.FC<{
  children: React.ReactNode;
  sceneLen: number;
  bg?: string;
}> = ({ children, sceneLen, bg = BG }) => {
  const frame = useCurrentFrame();
  const opacity = exit(frame, sceneLen);
  return (
    <AbsoluteFill style={{
      background: bg,
      opacity,
      paddingLeft: 60,
      paddingRight: 60,
      paddingTop: 110,
      paddingBottom: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 0,
      fontFamily: FONT,
    }}>
      {children}
    </AbsoluteFill>
  );
};

// ─── Scene 1 — Hook (120 frames / 4 s) ───────────────────────────────────────

const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const DUR = 120;

  const headlineStyle = enter(frame, 5);
  const gridStyle = enter(frame, 20, 50);
  const promptStyle = enter(frame, 36, 40);

  const charsVisible = Math.max(0, (frame - 42) * CHARS_PER_FRAME);

  return (
    <Scene sceneLen={DUR}>
      <BrandStrip />
      <div style={{ height: 40 }} />

      {/* Headline */}
      <div style={{ ...headlineStyle, marginBottom: 52 }}>
        <div style={{
          fontSize: 66,
          fontWeight: 700,
          color: DARK,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          maxWidth: 860,
        }}>
          Spreadsheets finally speak your language.
        </div>
      </div>

      {/* Empty grid */}
      <div style={{ ...gridStyle, marginBottom: 36 }}>
        <SpreadsheetGrid rowsVisible={0} />
      </div>

      {/* Prompt bar */}
      <div style={{ ...promptStyle, width: '100%' }}>
        <PromptBar
          prompt={PROMPT_TEXT}
          charsVisible={charsVisible}
        />
      </div>
    </Scene>
  );
};

// ─── Scene 2 — AI builds the model (150 frames / 5 s) ────────────────────────

const SceneModel: React.FC = () => {
  const frame = useCurrentFrame();
  const DUR = 150;

  // Rows appear one by one, staggered ~22 frames apart, starting at frame 15
  const rowsVisible = interpolate(
    frame,
    [15, 15 + PNL_ROWS.length * 22],
    [0, PNL_ROWS.length],
    { ...CLAMP, easing: Easing.bezier(0.33, 1, 0.68, 1) },
  );

  const formulaVisible = frame > 15 + 2 * 22; // after Gross Profit row appears
  const formulaText = formulaVisible ? '=B2−B3' : undefined;

  const headlineStyle = enter(frame, 0);
  const captionStyle = enter(frame, 12);
  const gridStyle = enter(frame, 8, 30);

  return (
    <Scene sceneLen={DUR}>
      <BrandStrip />
      <div style={{ height: 40 }} />

      {/* Scene label */}
      <div style={{ ...headlineStyle, marginBottom: 20 }}>
        <Badge>✦ AI Model</Badge>
      </div>

      {/* Headline */}
      <div style={{ ...headlineStyle, marginBottom: 8 }}>
        <div style={{ fontSize: 66, fontWeight: 700, color: DARK, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          From prompt → model
        </div>
      </div>

      {/* Caption */}
      <div style={{ ...captionStyle, marginBottom: 48 }}>
        <div style={{ fontSize: 30, color: MID, lineHeight: 1.4 }}>
          Linked formulas. Explainable logic.
        </div>
      </div>

      {/* Grid */}
      <div style={gridStyle}>
        <SpreadsheetGrid rowsVisible={rowsVisible} formulaText={formulaText} />
      </div>
    </Scene>
  );
};

// ─── Scene 3 — Web search in the grid (120 frames / 4 s) ─────────────────────

const SceneSearch: React.FC = () => {
  const frame = useCurrentFrame();
  const DUR = 120;

  const headlineStyle = enter(frame, 0);
  const captionStyle = enter(frame, 12);
  const gridStyle = enter(frame, 8, 30);

  return (
    <Scene sceneLen={DUR}>
      <BrandStrip />
      <div style={{ height: 40 }} />

      <div style={{ ...headlineStyle, marginBottom: 20 }}>
        <Badge>⌕ Web Search</Badge>
      </div>
      <div style={{ ...headlineStyle, marginBottom: 8 }}>
        <div style={{ fontSize: 66, fontWeight: 700, color: DARK, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Research without tab-hopping
        </div>
      </div>
      <div style={{ ...captionStyle, marginBottom: 48 }}>
        <div style={{ fontSize: 30, color: MID }}>
          AI web search, directly in the grid
        </div>
      </div>

      <div style={gridStyle}>
        <SpreadsheetGrid
          rowsVisible={PNL_ROWS.length}
          searchRows={[0, 1]}
        />
      </div>
    </Scene>
  );
};

// ─── Scene 4 — Multi-source import (120 frames / 4 s) ────────────────────────

const SceneImport: React.FC = () => {
  const frame = useCurrentFrame();
  const DUR = 120;

  const headlineStyle = enter(frame, 0);
  const captionStyle = enter(frame, 12);

  const TRANSFORM_START = 64;

  return (
    <Scene sceneLen={DUR}>
      <BrandStrip />
      <div style={{ height: 40 }} />

      <div style={{ ...headlineStyle, marginBottom: 20 }}>
        <Badge>📄 Import</Badge>
      </div>
      <div style={{ ...headlineStyle, marginBottom: 8 }}>
        <div style={{ fontSize: 66, fontWeight: 700, color: DARK, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          PDFs and images → structured data
        </div>
      </div>
      <div style={{ ...captionStyle, marginBottom: 48 }}>
        <div style={{ fontSize: 30, color: MID }}>No manual entry.</div>
      </div>

      {/* File cards slide in */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <ImportCard type="pdf" delay={10} transformStart={TRANSFORM_START} />
        <ImportCard type="image" delay={28} transformStart={TRANSFORM_START} />

        {/* Structured rows appear as cards dissolve */}
        <div style={{
          opacity: interpolate(frame, [TRANSFORM_START, TRANSFORM_START + 20], [0, 1], CLAMP),
          transform: `translateY(${interpolate(frame, [TRANSFORM_START, TRANSFORM_START + 20], [20, 0], CLAMP)}px)`,
        }}>
          <ImportedRows startFrame={TRANSFORM_START} />
        </div>
      </div>
    </Scene>
  );
};

// ─── Scene 5 — Instant charts (120 frames / 4 s) ─────────────────────────────

const SceneChart: React.FC = () => {
  const frame = useCurrentFrame();
  const DUR = 120;

  const headlineStyle = enter(frame, 0);
  const captionStyle = enter(frame, 12);
  const chartStyle = enter(frame, 18, 40);

  return (
    <Scene sceneLen={DUR}>
      <BrandStrip />
      <div style={{ height: 40 }} />

      <div style={{ ...headlineStyle, marginBottom: 20 }}>
        <Badge>📊 Charts</Badge>
      </div>
      <div style={{ ...headlineStyle, marginBottom: 8 }}>
        <div style={{ fontSize: 66, fontWeight: 700, color: DARK, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Charts on command
        </div>
      </div>
      <div style={{ ...captionStyle, marginBottom: 48 }}>
        <div style={{ fontSize: 30, color: MID }}>Presentation-ready in minutes.</div>
      </div>

      <div style={chartStyle}>
        <ChartReveal />
      </div>
    </Scene>
  );
};

// ─── Scene 6 — CTA end card (90 frames / 3 s) ────────────────────────────────

const SceneCta: React.FC = () => (
  <AbsoluteFill style={{ background: WHITE }}>
    <EndCard />
  </AbsoluteFill>
);

// ─── Root composition ─────────────────────────────────────────────────────────

export const TrufflepigLaunch: React.FC = () => (
  <AbsoluteFill style={{ background: BG, fontFamily: FONT }}>
    <Series>
      <Series.Sequence durationInFrames={120} premountFor={30}>
        <SceneHook />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150} premountFor={30}>
        <SceneModel />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120} premountFor={30}>
        <SceneSearch />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120} premountFor={30}>
        <SceneImport />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120} premountFor={30}>
        <SceneChart />
      </Series.Sequence>
      <Series.Sequence durationInFrames={90} premountFor={30}>
        <SceneCta />
      </Series.Sequence>
    </Series>
  </AbsoluteFill>
);
