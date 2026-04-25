import React from "react";
import {
  AbsoluteFill,
  // Audio,
  Img,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { ASSETS } from "./gusshausAssets";
import "./gusshausStyles.css";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const FADE = 20;

/** Scene opacity: fade in at start, fade out at end */
const sceneAlpha = (frame: number, dur: number): number =>
  interpolate(frame, [0, FADE, dur - FADE, dur], [0, 1, 1, 0], clamp);

/** Scene opacity: fade in only — holds final frame (last scene) */
const sceneAlphaIn = (frame: number): number =>
  interpolate(frame, [0, FADE], [0, 1], clamp);

// ─── Background image with cinematic motion ───────────────────────────────────
interface BgProps {
  src: string;
  frame: number;
  totalFrames: number;
  scaleFrom?: number;
  scaleTo?: number;
  panX?: number;
  panY?: number;
  lockAtFrame?: number;
}

const CinematicBg: React.FC<BgProps> = ({
  src,
  frame,
  totalFrames,
  scaleFrom = 1.0,
  scaleTo = 1.05,
  panX = 0,
  panY = 0,
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
          width: "100%",
          height: "100%",
          objectFit: "cover",
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
      <CinematicBg src={ASSETS.hook} frame={frame} totalFrames={durationInFrames}
        scaleTo={1.06} panX={28} />
    </AbsoluteFill>
  );
};

// ─── Scene 2 — Problem (5–13 s, frames 150–390) ───────────────────────────────
const SceneProblem: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(frame, durationInFrames) }}>
      <CinematicBg src={ASSETS.problem} frame={frame} totalFrames={durationInFrames}
        scaleTo={1.04} panX={-22} />
    </AbsoluteFill>
  );
};

// ─── Scene 3 — Stakes (13–19 s, frames 390–570) ───────────────────────────────
const SceneStakes: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(frame, durationInFrames) }}>
      <CinematicBg src={ASSETS.stakes} frame={frame} totalFrames={durationInFrames}
        scaleTo={1.05} />
    </AbsoluteFill>
  );
};

// ─── Scene 4 — Bridge (19–25 s, frames 570–750) ───────────────────────────────
const SceneBridge: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(frame, durationInFrames) }}>
      <CinematicBg src={ASSETS.bridge} frame={frame} totalFrames={durationInFrames}
        scaleTo={1.03} panY={-8} />
    </AbsoluteFill>
  );
};

// ─── Scene 5 — Solution (25–33 s, frames 750–990) ────────────────────────────
const SceneSolution: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(frame, durationInFrames) }}>
      {/* Portrait — very subtle scale only, no translate */}
      <CinematicBg src={ASSETS.solution} frame={frame} totalFrames={durationInFrames}
        scaleTo={1.022} />
    </AbsoluteFill>
  );
};

// ─── Scene 6 — Mechanism (33–42 s, frames 990–1260) ──────────────────────────
const SceneMechanism: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(frame, durationInFrames) }}>
      {/* Light-background design frame — keep scale minimal */}
      <CinematicBg src={ASSETS.mechanism} frame={frame} totalFrames={durationInFrames}
        scaleFrom={1.0} scaleTo={1.018} />
    </AbsoluteFill>
  );
};

// ─── Scene 7 — Proof (42–49 s, frames 1260–1470) ─────────────────────────────
const SceneProof: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: sceneAlpha(frame, durationInFrames) }}>
      <CinematicBg src={ASSETS.proof} frame={frame} totalFrames={durationInFrames}
        scaleTo={1.04} panX={-15} />
    </AbsoluteFill>
  );
};

// ─── Scene 8 — CTA (49–60 s, frames 1470–1800) ───────────────────────────────
const SceneCTA: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  // Animation locks at frame 285 so last ~1.5 s is a clean static hold
  return (
    <AbsoluteFill style={{ opacity: sceneAlphaIn(frame) }}>
      <CinematicBg src={ASSETS.cta} frame={frame} totalFrames={durationInFrames}
        scaleTo={1.04} panX={14} lockAtFrame={285} />
    </AbsoluteFill>
  );
};

// ─── Main composition ─────────────────────────────────────────────────────────
export const GusshausExplainer: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#111010" }} className="gusshaus-root">
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
