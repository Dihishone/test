import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { SLOW_FADE } from "../timing";
import { fontFamily } from "../font";
import { PlanningScene } from "../components/PlanningScene";

export const B1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, SLOW_FADE], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const line1Opacity = interpolate(frame, [SLOW_FADE, SLOW_FADE + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const line1Y = interpolate(frame, [SLOW_FADE, SLOW_FADE + 14], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const line2Opacity = interpolate(frame, [SLOW_FADE + 10, SLOW_FADE + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const line2Y = interpolate(frame, [SLOW_FADE + 10, SLOW_FADE + 24], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill style={{ opacity: bgOpacity }}>
      <PlanningScene />
      <AbsoluteFill style={{ background: "linear-gradient(to right, rgba(26,25,22,0.88) 50%, rgba(26,25,22,0.2) 100%)" }} />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0 160px",
        }}
      >
        <div style={{ maxWidth: 860 }}>
          <div
            style={{
              opacity: line1Opacity,
              transform: `translateY(${line1Y}px)`,
              fontFamily,
              fontSize: 58,
              fontWeight: 400,
              color: COLORS.TEXT_LIGHT,
              lineHeight: 1.3,
              letterSpacing: "0.01em",
              marginBottom: 16,
            }}
          >
            Ein Bauprojekt hat viele Beteiligte.
          </div>
          <div
            style={{
              opacity: line2Opacity,
              transform: `translateY(${line2Y}px)`,
              fontFamily,
              fontSize: 58,
              fontWeight: 700,
              color: COLORS.TEXT_LIGHT,
              lineHeight: 1.3,
              letterSpacing: "0.01em",
            }}
          >
            Aber nur einen, der am Ende den Kopf
            <br />hinhalten muss:{" "}
            <span style={{ color: COLORS.ACCENT_TEAL }}>Sie.</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
