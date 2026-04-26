import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { SLOW_FADE, FPS } from "../timing";
import { fontFamily } from "../font";

export const B1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, SLOW_FADE], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const textOpacity = interpolate(frame, [SLOW_FADE, SLOW_FADE + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const textY = interpolate(frame, [SLOW_FADE, SLOW_FADE + 14], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const line2Opacity = interpolate(frame, [SLOW_FADE + 8, SLOW_FADE + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const line2Y = interpolate(frame, [SLOW_FADE + 8, SLOW_FADE + 22], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.BG_DARK,
        opacity: bgOpacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "0 140px",
      }}
    >
      <div style={{ maxWidth: 900 }}>
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontFamily,
            fontSize: 64,
            fontWeight: 400,
            color: COLORS.TEXT_LIGHT,
            lineHeight: 1.3,
            letterSpacing: "0.01em",
          }}
        >
          Ein Bauprojekt hat viele Beteiligte.
        </div>
        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            fontFamily,
            fontSize: 64,
            fontWeight: 700,
            color: COLORS.TEXT_LIGHT,
            lineHeight: 1.3,
            letterSpacing: "0.01em",
            marginTop: 8,
          }}
        >
          Aber nur einen, der am Ende den Kopf
          <br />
          hinhalten muss:{" "}
          <span style={{ color: COLORS.ACCENT_TEAL }}>Sie.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
