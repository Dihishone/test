import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { FPS, FADE_DURATION } from "../timing";
import { fontFamily } from "../font";

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
    <AbsoluteFill
      style={{
        background: COLORS.BG_WARM,
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
            opacity: bodyOpacity,
            fontFamily,
            fontSize: 44,
            fontWeight: 400,
            color: COLORS.TEXT_DARK,
            lineHeight: 1.5,
            letterSpacing: "0.01em",
          }}
        >
          Jeder Schritt in der Planung hat finanzielle
          <br />
          und langfristige Auswirkungen auf Ihre Wohnqualität.
        </div>

        <div
          style={{
            opacity: accentOpacity,
            marginTop: 40,
            fontFamily,
            fontSize: 64,
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
  );
};
