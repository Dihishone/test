import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { FPS, SLOW_FADE } from "../timing";
import { fontFamily } from "../font";

export const B4Bridge: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const scale = interpolate(frame, [0, 6 * FPS], [1, 1.025], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const textOpacity = interpolate(frame, [12, 12 + SLOW_FADE], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });
  const textY = interpolate(frame, [12, 12 + SLOW_FADE], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  return (
    <AbsoluteFill style={{ background: COLORS.BG_WHITE, opacity: bgOpacity }}>
      {/* Architectural grid — full screen, no floating box */}
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={68 * i} x2={1920} y2={68 * i} stroke={COLORS.TEXT_DARK} strokeWidth={0.5} />
          ))}
          {Array.from({ length: 29 }).map((_, i) => (
            <line key={`v${i}`} x1={68 * i} y1={0} x2={68 * i} y2={1080} stroke={COLORS.TEXT_DARK} strokeWidth={0.5} />
          ))}
          {/* Floor plan — centered */}
          <rect x={580} y={240} width={760} height={560} stroke={COLORS.TEXT_DARK} strokeWidth={2} fill="none" />
          <line x1={580} y1={520} x2={1020} y2={520} stroke={COLORS.TEXT_DARK} strokeWidth={1} />
          <line x1={580} y1={380} x2={1340} y2={380} stroke={COLORS.TEXT_DARK} strokeWidth={1} />
          <line x1={960} y1={240} x2={960} y2={800} stroke={COLORS.TEXT_DARK} strokeWidth={1} />
          <line x1={1020} y1={240} x2={1020} y2={520} stroke={COLORS.TEXT_DARK} strokeWidth={1} />
          {/* Door arcs */}
          <path d="M 660 520 A 80 80 0 0 1 660 440" stroke={COLORS.TEXT_DARK} strokeWidth={1} fill="none" />
          <line x1={660} y1={520} x2={660} y2={440} stroke={COLORS.TEXT_DARK} strokeWidth={1} />
        </svg>
      </AbsoluteFill>

      {/* Centered text — no box border */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 220px",
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontFamily,
            fontSize: 60,
            fontWeight: 400,
            color: COLORS.TEXT_DARK,
            textAlign: "center",
            lineHeight: 1.45,
            letterSpacing: "0.015em",
            fontStyle: "italic",
          }}
        >
          Was wäre, wenn Sie von Anfang an
          <br />jemanden hätten —
          <br />der nicht übergibt, sondern bleibt?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
