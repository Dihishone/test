import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { FPS, FADE_DURATION } from "../timing";
import { fontFamily } from "../font";
import { PlanningDetail } from "../components/PlanningDetail";

export const B3Stakes: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bodyOpacity = interpolate(frame, [8, 8 + FADE_DURATION * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const accentStartFrame = Math.round(3.5 * FPS);
  const accentOpacity = interpolate(frame, [accentStartFrame, accentStartFrame + FADE_DURATION * 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill style={{ opacity: bgOpacity }}>
      {/* Planning detail illustration — architectural drawings */}
      <PlanningDetail />

      {/* Left side gradient overlay for text */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(to right, rgba(216,212,206,0.96) 38%, rgba(216,212,206,0.7) 60%, transparent 100%)",
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
        <div style={{ maxWidth: 680 }}>
          <div
            style={{
              opacity: bodyOpacity,
              fontFamily,
              fontSize: 40,
              fontWeight: 400,
              color: COLORS.TEXT_DARK,
              lineHeight: 1.55,
              letterSpacing: "0.01em",
            }}
          >
            Jeder Schritt in der Planung hat
            <br />
            finanzielle und langfristige Auswirkungen
            <br />
            auf Ihre Wohnqualität.
          </div>

          <div
            style={{
              opacity: accentOpacity,
              marginTop: 48,
              fontFamily,
              fontSize: 60,
              fontWeight: 700,
              color: COLORS.TEXT_DARK,
              letterSpacing: "0.01em",
              borderLeft: `5px solid ${COLORS.ACCENT_MAGENTA}`,
              paddingLeft: 28,
            }}
          >
            Fehler kosten dauerhaft.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
