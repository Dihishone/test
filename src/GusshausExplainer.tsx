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
import {
  cinematicPush,
  editorialFade,
  maskReveal,
  lineDraw,
  lightSweep,
  sceneAlpha,
  sceneAlphaIn,
  countUp,
} from "./motionPresets";
import "./gusshausStyles.css";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const B = "#7A0E36";          // burgundy
const OW = "#E9E4DC";         // off-white
const SW = "#F4F1EC";         // soft white
const CH = "#252322";         // charcoal
const CREAM = "#E8E3D9";      // mechanism cream
const FS = 'Georgia,"Times New Roman",serif';
const FN = 'Inter,"Helvetica Neue",Arial,sans-serif';
const C = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

// ─── Global overlays ──────────────────────────────────────────────────────────

const GrainOverlay: React.FC = () => {
  const seed = useCurrentFrame() % 89;
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.038, pointerEvents: "none" } as React.CSSProperties} viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <filter id={`g${seed}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="3" stitchTiles="stitch" seed={seed} />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="1920" height="1080" filter={`url(#g${seed})`} />
    </svg>
  );
};

const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.45 }) => (
  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 60% 50%, transparent 35%, rgba(0,0,0,${strength}) 100%)`, pointerEvents: "none" } as React.CSSProperties} />
);

const CornerMarks: React.FC = () => {
  const S = 24, M = 40, W = 1920, H = 1080;
  const paths = [
    `M${M} ${M+S}L${M} ${M}L${M+S} ${M}`,
    `M${W-M-S} ${M}L${W-M} ${M}L${W-M} ${M+S}`,
    `M${M} ${H-M-S}L${M} ${H-M}L${M+S} ${H-M}`,
    `M${W-M-S} ${H-M}L${W-M} ${H-M}L${W-M} ${H-M-S}`,
  ];
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" } as React.CSSProperties} viewBox="0 0 1920 1080">
      {paths.map((d, i) => <path key={i} d={d} fill="none" stroke={OW} strokeWidth="1" strokeOpacity="0.28" />)}
    </svg>
  );
};

// ─── Cinematic background ─────────────────────────────────────────────────────
interface BgProps { src: string; frame: number; total: number; from?: number; to?: number; panX?: number; panY?: number; lock?: number; }
const CinematicBg: React.FC<BgProps> = ({ src, frame, total, from = 1.0, to = 1.055, panX = 0, panY = 0, lock }) => {
  const f = lock ? Math.min(frame, lock) : frame;
  const s = cinematicPush(f, total, from, to);
  const tx = interpolate(f, [0, total], [0, panX], C);
  const ty = interpolate(f, [0, total], [0, panY], C);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${s}) translate(${tx}px,${ty}px)`, transformOrigin: "center center" }} />
    </div>
  );
};

// ─── Accent line (SVG stroke-dashoffset draw) ─────────────────────────────────
interface ALProps { frame: number; x1: number; y1: number; x2: number; y2: number; start?: number; dur?: number; color?: string; w?: number; }
const AL: React.FC<ALProps> = ({ frame, x1, y1, x2, y2, start = 0, dur = 30, color = B, w = 1.5 }) => {
  const len = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
  const off = interpolate(frame, [start, start + dur], [len, 0], { ...C, easing: Easing.out(Easing.cubic) });
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" } as React.CSSProperties} viewBox="0 0 1920 1080">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeDasharray={len} strokeDashoffset={off} />
    </svg>
  );
};

// ─── Scene 1 — Hook (0–5 s) ───────────────────────────────────────────────────
const SceneHook: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const sweep = lightSweep(f, 85, 60);
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(f, dur) }}>
      <CinematicBg src={ASSETS.hook} frame={f} total={dur} to={1.065} panX={32} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(12,4,4,0.90) 0%,rgba(12,4,4,0.58) 28%,rgba(0,0,0,0.12) 58%,transparent 82%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.52) 0%,transparent 48%)" }} />
      {sweep > 0 && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg,transparent 30%,rgba(255,240,210,${sweep}) 55%,transparent 75%)`, pointerEvents: "none" }} />}
      <Vignette strength={0.38} />
      <CornerMarks />
      <AL frame={f} x1={88} y1={210} x2={88} y2={830} start={8} dur={40} />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" } as React.CSSProperties} viewBox="0 0 1920 1080">
        <circle cx={155} cy={540} r={370} fill="none" stroke={OW} strokeWidth="0.8" strokeOpacity="0.22"
          strokeDasharray={2 * Math.PI * 370}
          strokeDashoffset={interpolate(f, [20, 110], [2 * Math.PI * 370, 0], { ...C, easing: Easing.out(Easing.cubic) })} />
      </svg>
      <div style={{ position: "absolute", left: 118, top: "50%", transform: "translateY(-50%)" }}>
        {COPY.scene1.headlineLines.map((line, i) => (
          <div key={i} style={{ overflow: "hidden", lineHeight: 1.18, marginBottom: 4 }}>
            <div style={{ clipPath: maskReveal(f, 18 + i * 10, 26), fontFamily: FS, fontSize: 82, fontWeight: 300, color: SW, letterSpacing: "-0.022em" }}>{line}</div>
          </div>
        ))}
        <div style={{ ...editorialFade(f, 52), marginTop: 30 }}>
          {COPY.scene1.subtextLines.map((l, i) => (
            <div key={i} style={{ fontFamily: FN, fontSize: 24, color: OW, opacity: 0.74, lineHeight: 1.72 }}>{l}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2 — Problem (5–13 s) ───────────────────────────────────────────────
const SceneProblem: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const wipe = interpolate(f, [0, 28], [100, 0], { ...C, easing: Easing.out(Easing.cubic) });
  const dotX = interpolate(f, [55, 140], [112, 680], { ...C });
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(f, dur), clipPath: `inset(-4px ${wipe}% -4px -4px)` }}>
      <CinematicBg src={ASSETS.problem} frame={f} total={dur} to={1.04} panX={-18} panY={-10} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(8,8,8,0.82) 0%,rgba(8,8,8,0.52) 35%,rgba(0,0,0,0.08) 65%,transparent 85%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.38) 0%,transparent 45%)" }} />
      <Vignette strength={0.3} />
      <CornerMarks />
      <AL frame={f} x1={112} y1={740} x2={720} y2={740} start={44} dur={35} w={1} />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" } as React.CSSProperties} viewBox="0 0 1920 1080">
        <circle cx={dotX} cy={740} r={4} fill={B} opacity={interpolate(f, [50, 65], [0, 1], C)} />
      </svg>
      <div style={{ position: "absolute", left: 140, top: "50%", transform: "translateY(-50%)" }}>
        {COPY.scene2.headlineLines.map((line, i) => (
          <div key={i} style={{ overflow: "hidden", lineHeight: 1.22, marginBottom: 2 }}>
            <div style={{ clipPath: maskReveal(f, 30 + i * 16, 24), fontFamily: FS, fontSize: 72, fontWeight: 300, color: SW, letterSpacing: "-0.02em" }}>{line}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3 — Stakes (13–19 s) ───────────────────────────────────────────────
const SceneStakes: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const sweep = lightSweep(f, 30, 70);
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(f, dur) }}>
      <CinematicBg src={ASSETS.stakes} frame={f} total={dur} to={1.055} panX={10} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(55,6,22,0.88) 0%,rgba(55,6,22,0.48) 35%,rgba(0,0,0,0.12) 62%,transparent 82%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 50%)" }} />
      {sweep > 0 && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(100deg,transparent 40%,rgba(255,235,190,${sweep}) 62%,transparent 78%)`, pointerEvents: "none" }} />}
      <Vignette strength={0.42} />
      <CornerMarks />
      <div style={{ position: "absolute", left: 118, top: "50%", transform: "translateY(-52%)" }}>
        {COPY.scene3.headlineLines.map((line, i) => (
          <div key={i} style={{ overflow: "hidden", lineHeight: 1.1, marginBottom: 2 }}>
            <div style={{ clipPath: maskReveal(f, 16 + i * 10, 26), fontFamily: FS, fontSize: 92, fontWeight: 300, color: SW }}>{line}</div>
          </div>
        ))}
        <div style={{ width: `${lineDraw(f, 46, 28) * 64}px`, height: 1, background: B, marginTop: 26, marginBottom: 22 }} />
        {COPY.scene3.subtextLines.map((l, i) => (
          <div key={i} style={{ overflow: "hidden", lineHeight: 1.1 }}>
            <div style={{ clipPath: maskReveal(f, 52 + i * 9, 22), fontFamily: FN, fontSize: 23, color: OW, opacity: 0.82, lineHeight: 1.62 }}>{l}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4 — Bridge (19–25 s) ───────────────────────────────────────────────
const SceneBridge: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const entryDark = interpolate(f, [0, 14], [1, 0], C);
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(f, dur) }}>
      <CinematicBg src={ASSETS.bridge} frame={f} total={dur} to={1.032} panY={-14} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(30,12,8,0.82) 0%,rgba(30,12,8,0.44) 35%,rgba(0,0,0,0.08) 62%,transparent 82%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 52%)" }} />
      {entryDark > 0 && <div style={{ position: "absolute", inset: 0, background: `rgba(0,0,0,${entryDark * 0.92})` }} />}
      <Vignette strength={0.35} />
      <CornerMarks />
      <AL frame={f} x1={118} y1={610} x2={660} y2={610} start={14} dur={38} color={OW} w={0.8} />
      <div style={{ position: "absolute", left: 118, top: "50%", transform: "translateY(-50%)" }}>
        {COPY.scene4.headlineLines.map((line, i) => (
          <div key={i} style={{ overflow: "hidden", lineHeight: 1.2, marginBottom: 4 }}>
            <div style={{ clipPath: maskReveal(f, 32 + i * 14, 28), fontFamily: FS, fontSize: 78, fontWeight: 300, color: SW }}>{line}</div>
          </div>
        ))}
        <div style={{ ...editorialFade(f, 68), marginTop: 32 }}>
          {COPY.scene4.subtextLines.map((l, i) => (
            <div key={i} style={{ fontFamily: FN, fontSize: 23, color: OW, opacity: 0.62, lineHeight: 1.68, letterSpacing: "0.03em" }}>{l}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 5 — Solution (25–33 s) ────────────────────────────────────────────
const SceneSolution: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const lineS = lineDraw(f, 38, 30);
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(f, dur) }}>
      <CinematicBg src={ASSETS.solution} frame={f} total={dur} to={1.022} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(14,10,8,0.92) 0%,rgba(14,10,8,0.62) 32%,rgba(0,0,0,0.18) 58%,transparent 82%)" }} />
      <Vignette strength={0.32} />
      <CornerMarks />
      <AL frame={f} x1={94} y1={210} x2={94} y2={855} start={8} dur={42} w={1.5} />
      <div style={{ position: "absolute", left: 118, top: "50%", transform: "translateY(-50%)" }}>
        <div style={{ ...editorialFade(f, 10), fontFamily: FN, fontSize: 13, color: B, letterSpacing: "0.18em", marginBottom: 22 }}>2021 GEGRÜNDET</div>
        {COPY.scene5.headlineLines.map((line, i) => (
          <div key={i} style={{ overflow: "hidden", lineHeight: 1.2, marginBottom: 3 }}>
            <div style={{ clipPath: maskReveal(f, 18 + i * 10, 26), fontFamily: FS, fontSize: 74, fontWeight: 300, color: SW }}>{line}</div>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 20, marginBottom: 20 }}>
          <div style={{ width: `${lineS * 52}px`, height: 1, background: B }} />
        </div>
        {COPY.scene5.subtextLines.map((l, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <div style={{ clipPath: maskReveal(f, 46 + i * 10, 22), fontFamily: FN, fontSize: 21, color: OW, opacity: 0.72, lineHeight: 1.68 }}>{l}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 6 — Mechanism (33–42 s) ───────────────────────────────────────────
const SceneMechanism: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const items = COPY.scene6.items;
  const connH = interpolate(f, [14, 14 + items.length * 18 + 10], [0, 480], C);
  const footerStart = 20 + items.length * 18 + 18;
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(f, dur) }}>
      <CinematicBg src={ASSETS.mechanism} frame={f} total={dur} to={1.015} />
      <div style={{ position: "absolute", inset: 0, background: CREAM, opacity: 0.94 }} />
      <Vignette strength={0.12} />
      <CornerMarks />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" } as React.CSSProperties} viewBox="0 0 1920 1080">
        <line x1={118} y1={220} x2={118} y2={220 + connH} stroke={B} strokeWidth="1.5" />
      </svg>
      <div style={{ position: "absolute", left: 148, top: "50%", transform: "translateY(-50%)", maxWidth: 560 }}>
        <div style={{ ...editorialFade(f, 10), fontFamily: FN, fontSize: 12, color: B, letterSpacing: "0.2em", marginBottom: 36 }}>LEISTUNGEN</div>
        {items.map((item, i) => {
          const s = 20 + i * 18;
          const itemAlpha = interpolate(f, [s, s + 18], [0.32, 1], { ...C, easing: Easing.out(Easing.quad) });
          const itemX = interpolate(f, [s, s + 18], [12, 0], { ...C, easing: Easing.out(Easing.cubic) });
          const ruleW = interpolate(f, [s + 18, s + 34], [0, 320], C);
          return (
            <div key={i} style={{ opacity: itemAlpha, transform: `translateX(${itemX}px)`, marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 6 }}>
                <div style={{ width: 7, height: 7, background: B, transform: "rotate(45deg)", flexShrink: 0 }} />
                <div style={{ fontFamily: FS, fontSize: 40, fontWeight: 300, color: CH, lineHeight: 1.08 }}>{item}</div>
              </div>
              <div style={{ height: 1, width: ruleW, background: B, opacity: 0.38, marginLeft: 23 }} />
            </div>
          );
        })}
        <div style={{ ...editorialFade(f, footerStart), marginTop: 8 }}>
          {COPY.scene6.footerLines.map((l, i) => (
            <div key={i} style={{ fontFamily: FN, fontSize: 18, color: CH, opacity: 0.58, letterSpacing: "0.06em", lineHeight: 1.6 }}>{l}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 7 — Proof (42–49 s) ───────────────────────────────────────────────
const SceneProof: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const n1 = countUp(f, 50, 35, 50);
  const n2 = countUp(f, 62, 35, 98);
  const s1Scale = interpolate(f, [50, 70], [0.82, 1], { ...C, easing: Easing.out(Easing.cubic) });
  const s2Scale = interpolate(f, [65, 85], [0.82, 1], { ...C, easing: Easing.out(Easing.cubic) });
  const divH = interpolate(f, [55, 78], [0, 88], C);
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(f, dur) }}>
      <CinematicBg src={ASSETS.proof} frame={f} total={dur} to={1.04} panX={-14} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(10,8,6,0.88) 0%,rgba(10,8,6,0.62) 38%,rgba(0,0,0,0.14) 62%,transparent 80%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 48%)" }} />
      <Vignette strength={0.38} />
      <CornerMarks />
      <div style={{ position: "absolute", left: 118, top: "50%", transform: "translateY(-50%)" }}>
        {COPY.scene7.headlineLines.map((line, i) => (
          <div key={i} style={{ overflow: "hidden", lineHeight: 1.2, marginBottom: 3 }}>
            <div style={{ clipPath: maskReveal(f, 16 + i * 10, 26), fontFamily: FS, fontSize: 58, fontWeight: 300, color: SW }}>{line}</div>
          </div>
        ))}
        <div style={{ width: `${lineDraw(f, 40, 25) * 52}px`, height: 1, background: B, marginTop: 20, marginBottom: 36 }} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
          <div style={{ opacity: interpolate(f, [50, 68], [0, 1], C), transform: `scale(${s1Scale})`, transformOrigin: "left center" }}>
            <div style={{ fontFamily: FS, fontSize: 110, fontWeight: 700, color: B, lineHeight: 1 }}>{n1}+</div>
            <div style={{ fontFamily: FN, fontSize: 20, color: SW, opacity: 0.84, marginTop: 8 }}>{COPY.scene7.stat1Label}</div>
          </div>
          <div style={{ width: 1, height: divH, background: OW, opacity: 0.22, margin: "8px 52px 0" }} />
          <div style={{ opacity: interpolate(f, [65, 83], [0, 1], C), transform: `scale(${s2Scale})`, transformOrigin: "left center" }}>
            <div style={{ fontFamily: FS, fontSize: 110, fontWeight: 700, color: B, lineHeight: 1 }}>{n2}%</div>
            <div style={{ fontFamily: FN, fontSize: 20, color: SW, opacity: 0.84, marginTop: 8, lineHeight: 1.4 }}>
              {COPY.scene7.stat2LabelLines.map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </div>
        </div>
        <div style={{ ...editorialFade(f, 95), fontFamily: FN, fontSize: 14, color: OW, opacity: 0.36, marginTop: 24 }}>{COPY.scene7.footnote}</div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 8 — CTA (49–60 s) ─────────────────────────────────────────────────
const SceneCTA: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const af = Math.min(f, 270);
  const sweep = lightSweep(f, 180, 55);
  const ctaLineW = lineDraw(f, 68, 30);
  return (
    <AbsoluteFill style={{ opacity: sceneAlphaIn(f) }}>
      <CinematicBg src={ASSETS.cta} frame={af} total={dur} to={1.042} panX={16} lock={270} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(55,6,22,0.92) 0%,rgba(55,6,22,0.58) 32%,rgba(0,0,0,0.18) 60%,transparent 85%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 52%)" }} />
      {sweep > 0 && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(100deg,transparent 35%,rgba(255,235,200,${sweep}) 58%,transparent 74%)`, pointerEvents: "none" }} />}
      <Vignette strength={0.44} />
      <CornerMarks />
      <AL frame={af} x1={94} y1={185} x2={94} y2={875} start={8} dur={42} w={1.5} />
      <div style={{ position: "absolute", left: 118, top: "50%", transform: "translateY(-50%)" }}>
        <div style={{ ...editorialFade(f, 12), fontFamily: FN, fontSize: 12, color: B, letterSpacing: "0.2em", marginBottom: 30 }}>KONTAKT</div>
        {COPY.scene8.headlineLines.map((line, i) => (
          <div key={i} style={{ overflow: "hidden", lineHeight: 1.16, marginBottom: 3 }}>
            <div style={{ clipPath: maskReveal(f, 20 + i * 10, 28), fontFamily: FS, fontSize: 74, fontWeight: 300, color: SW }}>{line}</div>
          </div>
        ))}
        <div style={{ ...editorialFade(f, 55), marginTop: 38 }}>
          <div style={{ display: "inline-block", padding: "14px 30px", border: `1px solid rgba(122,14,54,0.65)` }}>
            {COPY.scene8.ctaLines.map((l, i) => (
              <div key={i} style={{ fontFamily: FS, fontSize: 29, color: SW, letterSpacing: "0.025em", lineHeight: 1.42 }}>{l}</div>
            ))}
          </div>
          <div style={{ width: `${ctaLineW * 260}px`, height: 1, background: B, marginTop: 6, marginLeft: 1 }} />
        </div>
        <div style={{ ...editorialFade(f, 78), marginTop: 28, fontFamily: FN, fontSize: 17, color: OW, opacity: 0.52, letterSpacing: "0.09em" }}>{COPY.scene8.footer}</div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main composition ─────────────────────────────────────────────────────────
export const GusshausExplainer: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: CH }} className="gusshaus-root">
    <Sequence from={0}    durationInFrames={150}><SceneHook     dur={150} /></Sequence>
    <Sequence from={150}  durationInFrames={240}><SceneProblem  dur={240} /></Sequence>
    <Sequence from={390}  durationInFrames={180}><SceneStakes   dur={180} /></Sequence>
    <Sequence from={570}  durationInFrames={180}><SceneBridge   dur={180} /></Sequence>
    <Sequence from={750}  durationInFrames={240}><SceneSolution dur={240} /></Sequence>
    <Sequence from={990}  durationInFrames={270}><SceneMechanism dur={270} /></Sequence>
    <Sequence from={1260} durationInFrames={210}><SceneProof    dur={210} /></Sequence>
    <Sequence from={1470} durationInFrames={330}><SceneCTA      dur={330} /></Sequence>
    <GrainOverlay />
    {/* <Audio src={staticFile("gusshaus/voiceover.mp3")} /> */}
  </AbsoluteFill>
);
