import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { FPS, FADE_DURATION } from "../timing";
import { fontFamily } from "../font";
import { PlanningDetail } from "../components/PlanningDetail";

export const B3Stakes: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const bodyOpacity = interpolate(frame, [10, 10 + FADE_DURATION * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });
  const bodyY = interpolate(frame, [10, 10 + FADE_DURATION * 2], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  const accentStart = Math.round(3.5 * FPS);
  const accentOpacity = interpolate(frame, [accentStart, accentStart + FADE_DURATION * 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });
  const accentY = interpolate(frame, [accentStart, accentStart + FADE_DURATION * 3], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  return (
    <AbsoluteFill style={{ opacity: bgOpacity }}>
      <PlanningDetail />
      {/* Right-side gradient to keep illustration visible on right, text clear on left */}
      <AbsoluteFill style={{ background: "linear-gradient(to right, rgba(216,212,206,0.97) 44%, rgba(216,212,206,0.75) 65%, rgba(216,212,206,0.0) 100%)" }} />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0 160px",
        }}
      >
        <div style={{ maxWidth: 620 }}>
          <div
            style={{
              opacity: bodyOpacity,
              transform: `translateY(${bodyY}px)`,
              fontFamily,
              fontSize: 38,
              fontWeight: 400,
              color: COLORS.TEXT_DARK,
              lineHeight: 1.6,
              letterSpacing: "0.01em",
              marginBottom: 48,
            }}
          >
            Jeder Schritt in der Planung hat finanzielle
            <br />und langfristige Auswirkungen
            <br />auf Ihre Wohnqualität.
          </div>

          <div
            style={{
              opacity: accentOpacity,
              transform: `translateY(${accentY}px)`,
              fontFamily,
              fontSize: 56,
              fontWeight: 700,
              color: COLORS.TEXT_DARK,
              letterSpacing: "0.01em",
              borderLeft: `5px solid ${COLORS.ACCENT_MAGENTA}`,
              paddingLeft: 28,
              lineHeight: 1.2,
            }}
          >
            Fehler kosten<br />dauerhaft.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
