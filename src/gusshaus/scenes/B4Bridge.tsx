import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { FPS, SLOW_FADE } from "../timing";
import { fontFamily } from "../font";

export const B4Bridge: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(frame, [10, 10 + SLOW_FADE], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const textY = interpolate(frame, [10, 10 + SLOW_FADE], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  // Very slow Ken Burns scale
  const scale = interpolate(frame, [0, 6 * FPS], [1, 1.025], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.BG_WHITE, opacity: bgOpacity }}>
      {/* Subtle architectural texture — abstract line grid */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", opacity: 0.12 }}
        >
          {/* Architectural grid lines — blueprint aesthetic */}
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={80 + i * 68}
              x2={1920}
              y2={80 + i * 68}
              stroke={COLORS.TEXT_DARK}
              strokeWidth={0.5}
            />
          ))}
          {Array.from({ length: 22 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={80 + i * 84}
              y1={0}
              x2={80 + i * 84}
              y2={1080}
              stroke={COLORS.TEXT_DARK}
              strokeWidth={0.5}
            />
          ))}
          {/* Floor plan suggestion */}
          <rect x={680} y={300} width={560} height={480} stroke={COLORS.TEXT_DARK} strokeWidth={2} fill="none" />
          <line x1={680} y1={540} x2={1240} y2={540} stroke={COLORS.TEXT_DARK} strokeWidth={1} />
          <line x1={960} y1={300} x2={960} y2={780} stroke={COLORS.TEXT_DARK} strokeWidth={1} />
          {/* Door arc */}
          <path d="M 760 540 A 80 80 0 0 1 760 460" stroke={COLORS.TEXT_DARK} strokeWidth={1} fill="none" />
        </svg>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 200px",
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontFamily,
            fontSize: 56,
            fontWeight: 400,
            color: COLORS.TEXT_DARK,
            textAlign: "center",
            lineHeight: 1.4,
            letterSpacing: "0.02em",
            fontStyle: "italic",
          }}
        >
          Was wäre, wenn Sie von Anfang an
          <br />
          jemanden hätten — der nicht übergibt,
          <br />
          sondern bleibt?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
