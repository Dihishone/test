import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { SLOW_FADE, FPS } from "../timing";
import { fontFamily } from "../font";
import { PlanningScene } from "../components/PlanningScene";

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
    <AbsoluteFill style={{ opacity: bgOpacity }}>
      {/* Planning scene illustration */}
      <PlanningScene />

      {/* Dark gradient overlay so text reads cleanly */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(to right, rgba(30,28,26,0.85) 45%, rgba(30,28,26,0.3) 100%)",
        }}
      />

      {/* Text layer */}
      <AbsoluteFill
        style={{
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
    </AbsoluteFill>
  );
};
