import React from "react";
import {
  AbsoluteFill,
  // Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { ASSETS } from "./gusshausAssets";
import { COPY } from "./gusshausScript";
import "./gusshausStyles.css";

// ─── Design tokens ────────────────────────────────────────────────────────────
const BURGUNDY = "#7A0E36";
const OFF_WHITE = "#E9E4DC";
const CHARCOAL = "#252322";
const SOFT_WHITE = "#F4F1EC";
const FONT_SERIF = 'Georgia, "Times New Roman", serif';
const FONT_SANS = 'Inter, "Helvetica Neue", Arial, sans-serif';
const FADE = 20;

// ─── Animation helpers ────────────────────────────────────────────────────────
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

/** Opacity fade-in from 0→1 */
const fi = (frame: number, start: number, dur = FADE): number =>
  interpolate(frame, [start, start + dur], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.quad),
  });

/** Y-translate slide-up */
const su = (frame: number, start: number, dur = FADE, dist = 18): number =>
  interpolate(frame, [start, start + dur], [dist, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

/** Scene-level opacity: fade in at start, fade out at end */
const sceneAlpha = (frame: number, dur: number): number =>
  interpolate(frame, [0, FADE, dur - FADE, dur], [0, 1, 1, 0], clamp);

/** Scene-level opacity: fade in only (last scene — holds final frame) */
const sceneAlphaIn = (frame: number): number =>
  interpolate(frame, [0, FADE], [0, 1], clamp);

// ─── Reusable components ──────────────────────────────────────────────────────

const CornerMarks: React.FC<{ opacity?: number }> = ({ opacity = 0.32 }) => {
  const S = 28, M = 44, W = 1920, H = 1080;
  const paths = [
    `M ${M} ${M + S} L ${M} ${M} L ${M + S} ${M}`,
    `M ${W - M - S} ${M} L ${W - M} ${M} L ${W - M} ${M + S}`,
    `M ${M} ${H - M - S} L ${M} ${H - M} L ${M + S} ${H - M}`,
    `M ${W - M - S} ${H - M} L ${W - M} ${H - M} L ${W - M} ${H - M - S}`,
  ];
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" } as React.CSSProperties}
      viewBox="0 0 1920 1080"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={OFF_WHITE} strokeWidth="1" strokeOpacity={opacity} />
      ))}
    </svg>
  );
};

interface AccentLineProps {
  frame: number;
  x1: number; y1: number; x2: number; y2: number;
  startFrame?: number; dur?: number;
  color?: string; strokeWidth?: number;
}

const AccentLine: React.FC<AccentLineProps> = ({
  frame, x1, y1, x2, y2,
  startFrame = 0, dur = 30,
  color = BURGUNDY, strokeWidth = 1.5,
}) => {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const offset = interpolate(frame, [startFrame, startFrame + dur], [length, 0], clamp);
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" } as React.CSSProperties}
      viewBox="0 0 1920 1080"
    >
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={length} strokeDashoffset={offset}
      />
    </svg>
  );
};

interface BgProps {
  src: string; frame: number; totalFrames: number;
  scaleFrom?: number; scaleTo?: number; panX?: number; panY?: number;
  lockAtFrame?: number;
}

const ReferenceImageBackground: React.FC<BgProps> = ({
  src, frame, totalFrames,
  scaleFrom = 1.0, scaleTo = 1.055,
  panX = 0, panY = 0,
  lockAtFrame,
}) => {
  const f = lockAtFrame !== undefined ? Math.min(frame, lockAtFrame) : frame;
  const scale = interpolate(f, [0, totalFrames], [scaleFrom, scaleTo], clamp);
  const tx = interpolate(f, [0, totalFrames], [0, panX], clamp);
  const ty = interpolate(f, [0, totalFrames], [0, panY], clamp);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <Img
        src={src}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
          transformOrigin: "center center",
        }}
      />
    </div>
  );
};

// ─── Scene 1 — Hook (0–5 s, frames 0–150) ────────────────────────────────────

const SceneHook: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(frame, durationInFrames) }}>
      <ReferenceImageBackground
        src={ASSETS.hook} frame={frame} totalFrames={durationInFrames}
        scaleTo={1.06} panX={30}
      />
      {/* Burgundy gradient left */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(122,14,54,0.88) 0%, rgba(122,14,54,0.45) 35%, rgba(0,0,0,0.15) 65%, transparent 100%)" } as React.CSSProperties} />
      {/* Dark bottom vignette */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" } as React.CSSProperties} />
      <CornerMarks />
      <AccentLine frame={frame} x1={92} y1={220} x2={92} y2={780} startFrame={10} dur={35} />
      {/* Static thin arc */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" } as React.CSSProperties} viewBox="0 0 1920 1080">
        <circle cx={160} cy={540} r={380} fill="none" stroke={OFF_WHITE} strokeWidth="0.5" strokeOpacity="0.18" />
      </svg>
      {/* Text */}
      <div style={{ position: "absolute", left: 120, top: "50%", transform: "translateY(-50%)" }}>
        {COPY.scene1.headlineLines.map((line, i) => (
          <div key={i} style={{ opacity: fi(frame, 18 + i * 5), transform: `translateY(${su(frame, 18 + i * 5)}px)` }}>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 80, fontWeight: 300, color: SOFT_WHITE, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              {line}
            </div>
          </div>
        ))}
        <div style={{ marginTop: 28, opacity: fi(frame, 34) }}>
          {COPY.scene1.subtextLines.map((l, i) => (
            <div key={i} style={{ opacity: fi(frame, 34 + i * 6), transform: `translateY(${su(frame, 34 + i * 6)}px)` }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: OFF_WHITE, opacity: 0.75, lineHeight: 1.7 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2 — Problem (5–13 s, frames 150–390) ───────────────────────────────

const SceneProblem: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(frame, durationInFrames) }}>
      <ReferenceImageBackground
        src={ASSETS.problem} frame={frame} totalFrames={durationInFrames}
        scaleTo={1.04} panX={-25}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 40%, transparent 75%)" } as React.CSSProperties} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)" } as React.CSSProperties} />
      <CornerMarks />
      <AccentLine frame={frame} x1={100} y1={180} x2={100} y2={780} startFrame={8} dur={40} strokeWidth={2} />
      <div style={{ position: "absolute", left: 140, top: "50%", transform: "translateY(-50%)" }}>
        {COPY.scene2.headlineLines.map((line, i) => (
          <div key={i} style={{ opacity: fi(frame, 22 + i * 12), transform: `translateY(${su(frame, 22 + i * 12)}px)` }}>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 72, fontWeight: 300, color: SOFT_WHITE, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              {line}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3 — Stakes (13–19 s, frames 390–570) ───────────────────────────────

const SceneStakes: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(frame, durationInFrames) }}>
      <ReferenceImageBackground
        src={ASSETS.stakes} frame={frame} totalFrames={durationInFrames} scaleTo={1.055}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(90,8,30,0.80) 0%, rgba(90,8,30,0.35) 40%, transparent 70%)" } as React.CSSProperties} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" } as React.CSSProperties} />
      <CornerMarks />
      <AccentLine frame={frame} x1={110} y1={520} x2={560} y2={520} startFrame={10} dur={30} />
      <div style={{ position: "absolute", left: 120, top: "50%", transform: "translateY(-50%)" }}>
        {COPY.scene3.headlineLines.map((line, i) => (
          <div key={i} style={{ opacity: fi(frame, 18 + i * 8), transform: `translateY(${su(frame, 18 + i * 8)}px)` }}>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 88, fontWeight: 300, color: SOFT_WHITE, lineHeight: 1.1 }}>{line}</div>
          </div>
        ))}
        <div style={{ width: 60, height: 1, backgroundColor: BURGUNDY, marginTop: 24, marginBottom: 24, opacity: fi(frame, 42) }} />
        {COPY.scene3.subtextLines.map((l, i) => (
          <div key={i} style={{ opacity: fi(frame, 50 + i * 7), transform: `translateY(${su(frame, 50 + i * 7)}px)` }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: OFF_WHITE, opacity: 0.8, lineHeight: 1.6 }}>{l}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4 — Bridge (19–25 s, frames 570–750) ───────────────────────────────

const SceneBridge: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(frame, durationInFrames) }}>
      <ReferenceImageBackground
        src={ASSETS.bridge} frame={frame} totalFrames={durationInFrames}
        scaleTo={1.03} panY={-10}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" } as React.CSSProperties} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)" } as React.CSSProperties} />
      <CornerMarks />
      <AccentLine frame={frame} x1={120} y1={600} x2={720} y2={600} startFrame={12} dur={35} color={OFF_WHITE} strokeWidth={1} />
      <div style={{ position: "absolute", left: 120, top: "50%", transform: "translateY(-50%)" }}>
        {COPY.scene4.headlineLines.map((line, i) => (
          <div key={i} style={{ opacity: fi(frame, 20 + i * 10), transform: `translateY(${su(frame, 20 + i * 10)}px)` }}>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 76, fontWeight: 300, color: SOFT_WHITE, lineHeight: 1.2 }}>{line}</div>
          </div>
        ))}
        <div style={{ width: 50, height: 1, backgroundColor: OFF_WHITE, marginTop: 20, marginBottom: 20, opacity: fi(frame, 50) * 0.4 }} />
        {COPY.scene4.subtextLines.map((l, i) => (
          <div key={i} style={{ opacity: fi(frame, 55 + i * 8), transform: `translateY(${su(frame, 55 + i * 8)}px)` }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: OFF_WHITE, opacity: 0.65, lineHeight: 1.65, letterSpacing: "0.03em" }}>{l}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 5 — Solution (25–33 s, frames 750–990) ────────────────────────────

const SceneSolution: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(frame, durationInFrames) }}>
      {/* Portrait — no translate, only minimal push-in */}
      <ReferenceImageBackground
        src={ASSETS.solution} frame={frame} totalFrames={durationInFrames}
        scaleTo={1.025}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(20,15,12,0.88) 0%, rgba(20,15,12,0.6) 35%, rgba(0,0,0,0.2) 60%, transparent 85%)" } as React.CSSProperties} />
      <CornerMarks />
      <AccentLine frame={frame} x1={96} y1={200} x2={96} y2={840} startFrame={10} dur={40} strokeWidth={1.5} />
      <div style={{ position: "absolute", left: 120, top: "50%", transform: "translateY(-50%)" }}>
        <div style={{ opacity: fi(frame, 10), fontFamily: FONT_SANS, fontSize: 14, color: BURGUNDY, letterSpacing: "0.18em", marginBottom: 20 }}>
          2021
        </div>
        {COPY.scene5.headlineLines.map((line, i) => (
          <div key={i} style={{ opacity: fi(frame, 20 + i * 8), transform: `translateY(${su(frame, 20 + i * 8)}px)` }}>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 72, fontWeight: 300, color: SOFT_WHITE, lineHeight: 1.2 }}>{line}</div>
          </div>
        ))}
        <div style={{ width: 48, height: 1, backgroundColor: BURGUNDY, marginTop: 20, marginBottom: 20, opacity: fi(frame, 40) }} />
        {COPY.scene5.subtextLines.map((l, i) => (
          <div key={i} style={{ opacity: fi(frame, 45 + i * 8), transform: `translateY(${su(frame, 45 + i * 8)}px)` }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 21, color: OFF_WHITE, opacity: 0.7, lineHeight: 1.65 }}>{l}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 6 — Mechanism (33–42 s, frames 990–1260) ──────────────────────────

const SceneMechanism: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const items = COPY.scene6.items;
  const footer = COPY.scene6.footerLines;
  const footerStart = 32 + (items.length - 1) * 18 + 22;
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(frame, durationInFrames) }}>
      <ReferenceImageBackground
        src={ASSETS.mechanism} frame={frame} totalFrames={durationInFrames} scaleTo={1.03}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(37,35,34,0.80)" } as React.CSSProperties} />
      <CornerMarks />
      <div style={{ position: "absolute", left: 120, top: "50%", transform: "translateY(-50%)", maxWidth: 540 }}>
        <div style={{ opacity: fi(frame, 18), fontFamily: FONT_SANS, fontSize: 13, color: BURGUNDY, letterSpacing: "0.18em", marginBottom: 32 }}>
          LEISTUNGEN
        </div>
        {items.map((item, i) => {
          const s = 32 + i * 18;
          const lineW = interpolate(frame, [s + 20, s + 35], [0, 300], clamp);
          return (
            <div key={i} style={{ opacity: fi(frame, s), transform: `translateY(${su(frame, s)}px)`, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
                <div style={{ width: 6, height: 6, backgroundColor: BURGUNDY, transform: "rotate(45deg)", flexShrink: 0 }} />
                <div style={{ fontFamily: FONT_SERIF, fontSize: 38, fontWeight: 300, color: SOFT_WHITE, lineHeight: 1.1 }}>
                  {item}
                </div>
              </div>
              <div style={{ height: 1, width: lineW, backgroundColor: BURGUNDY, opacity: 0.45, marginLeft: 20 }} />
            </div>
          );
        })}
        <div style={{ opacity: fi(frame, footerStart), marginTop: 12 }}>
          {footer.map((l, i) => (
            <div key={i} style={{ fontFamily: FONT_SANS, fontSize: 18, color: OFF_WHITE, opacity: 0.6, letterSpacing: "0.05em", lineHeight: 1.6 }}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 7 — Proof (42–49 s, frames 1260–1470) ─────────────────────────────

const SceneProof: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const s1Scale = interpolate(frame, [40, 60], [0.85, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const s2Scale = interpolate(frame, [55, 75], [0.85, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(frame, durationInFrames) }}>
      <ReferenceImageBackground
        src={ASSETS.proof} frame={frame} totalFrames={durationInFrames} scaleTo={1.04}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,15,12,0.82)" } as React.CSSProperties} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)" } as React.CSSProperties} />
      <CornerMarks />
      <AccentLine frame={frame} x1={760} y1={60} x2={1160} y2={60} startFrame={10} dur={30} color={BURGUNDY} />
      <AccentLine frame={frame} x1={760} y1={1020} x2={1160} y2={1020} startFrame={10} dur={30} color={BURGUNDY} />
      {/* Centered column layout */}
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          {COPY.scene7.headlineLines.map((line, i) => (
            <div key={i} style={{ opacity: fi(frame, 18 + i * 8), transform: `translateY(${su(frame, 18 + i * 8)}px)` }}>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 56, fontWeight: 300, color: SOFT_WHITE, lineHeight: 1.2 }}>{line}</div>
            </div>
          ))}
        </div>
        {/* Stats row */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 120, marginTop: 48 }}>
          <div style={{ opacity: fi(frame, 40), transform: `scale(${s1Scale})`, textAlign: "center" }}>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 108, fontWeight: 700, color: BURGUNDY, lineHeight: 1 }}>
              {COPY.scene7.stat1Number}
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 20, color: SOFT_WHITE, opacity: 0.85, marginTop: 8 }}>
              {COPY.scene7.stat1Label}
            </div>
          </div>
          {/* Divider */}
          <div style={{ width: 1, height: 80, backgroundColor: OFF_WHITE, opacity: fi(frame, 50) * 0.2 }} />
          <div style={{ opacity: fi(frame, 55), transform: `scale(${s2Scale})`, textAlign: "center" }}>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 108, fontWeight: 700, color: BURGUNDY, lineHeight: 1 }}>
              {COPY.scene7.stat2Number}
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 20, color: SOFT_WHITE, opacity: 0.85, marginTop: 8, lineHeight: 1.4 }}>
              {COPY.scene7.stat2LabelLines.map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </div>
        </div>
        {/* Footnote */}
        <div style={{ marginTop: 24, opacity: fi(frame, 70) * 0.38, fontFamily: FONT_SANS, fontSize: 15, color: OFF_WHITE }}>
          {COPY.scene7.footnote}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── Scene 8 — CTA (49–60 s, frames 1470–1800) ───────────────────────────────

const SceneCTA: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  // Animation locks at frame 285 so last ~1.5 s is a clean static hold
  const animFrame = Math.min(frame, 285);
  return (
    <AbsoluteFill style={{ opacity: sceneAlphaIn(frame) }}>
      <ReferenceImageBackground
        src={ASSETS.cta} frame={animFrame} totalFrames={durationInFrames}
        scaleTo={1.04} panX={15} lockAtFrame={285}
      />
      {/* Burgundy gradient left */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(90,8,30,0.85) 0%, rgba(90,8,30,0.5) 35%, rgba(0,0,0,0.2) 60%, transparent 90%)" } as React.CSSProperties} />
      {/* Dark bottom */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" } as React.CSSProperties} />
      <CornerMarks />
      <AccentLine frame={animFrame} x1={94} y1={180} x2={94} y2={870} startFrame={10} dur={40} strokeWidth={1.5} />
      <div style={{ position: "absolute", left: 120, top: "50%", transform: "translateY(-50%)" }}>
        {/* Label */}
        <div style={{ opacity: fi(animFrame, 14), fontFamily: FONT_SANS, fontSize: 13, color: BURGUNDY, letterSpacing: "0.18em", marginBottom: 28 }}>
          KONTAKT
        </div>
        {/* Headline */}
        {COPY.scene8.headlineLines.map((line, i) => (
          <div key={i} style={{ opacity: fi(animFrame, 20 + i * 8), transform: `translateY(${su(animFrame, 20 + i * 8)}px)` }}>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 72, fontWeight: 300, color: SOFT_WHITE, lineHeight: 1.15 }}>{line}</div>
          </div>
        ))}
        {/* CTA bordered box */}
        <div style={{ opacity: fi(animFrame, 52), transform: `translateY(${su(animFrame, 52)}px)`, marginTop: 36, display: "inline-block" }}>
          <div style={{ padding: "14px 28px", border: "1px solid rgba(122,14,54,0.7)", display: "inline-block" }}>
            {COPY.scene8.ctaLines.map((l, i) => (
              <div key={i} style={{ fontFamily: FONT_SERIF, fontSize: 28, color: SOFT_WHITE, letterSpacing: "0.02em", lineHeight: 1.4 }}>{l}</div>
            ))}
          </div>
        </div>
        {/* Underline accent on CTA */}
        <AccentLine frame={animFrame} x1={120} y1={670} x2={420} y2={670} startFrame={65} dur={25} color={BURGUNDY} strokeWidth={1} />
        {/* Footer URL */}
        <div style={{ opacity: fi(animFrame, 72) * 0.55, marginTop: 32, fontFamily: FONT_SANS, fontSize: 17, color: OFF_WHITE, letterSpacing: "0.08em" }}>
          {COPY.scene8.footer}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main composition ─────────────────────────────────────────────────────────

export const GusshausExplainer: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: CHARCOAL }} className="gusshaus-root">
    <Sequence from={0} durationInFrames={150}>
      <SceneHook durationInFrames={150} />
    </Sequence>
    <Sequence from={150} durationInFrames={240}>
      <SceneProblem durationInFrames={240} />
    </Sequence>
    <Sequence from={390} durationInFrames={180}>
      <SceneStakes durationInFrames={180} />
    </Sequence>
    <Sequence from={570} durationInFrames={180}>
      <SceneBridge durationInFrames={180} />
    </Sequence>
    <Sequence from={750} durationInFrames={240}>
      <SceneSolution durationInFrames={240} />
    </Sequence>
    <Sequence from={990} durationInFrames={270}>
      <SceneMechanism durationInFrames={270} />
    </Sequence>
    <Sequence from={1260} durationInFrames={210}>
      <SceneProof durationInFrames={210} />
    </Sequence>
    <Sequence from={1470} durationInFrames={330}>
      <SceneCTA durationInFrames={330} />
    </Sequence>
    {/* Optional voiceover — place file at public/gusshaus/voiceover.mp3 and uncomment: */}
    {/* <Audio src={staticFile("gusshaus/voiceover.mp3")} /> */}
  </AbsoluteFill>
);
