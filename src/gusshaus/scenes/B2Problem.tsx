import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { FPS, TEXT_FADE } from "../timing";
import { fontFamily } from "../font";

const Label: React.FC<{
  text: string;
  frame: number;
  startAt: number;
  color?: string;
}> = ({ text, frame, startAt, color = COLORS.TEXT_LIGHT }) => {
  const localFrame = frame - startAt;
  const opacity = interpolate(localFrame, [0, TEXT_FADE * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const y = interpolate(localFrame, [0, TEXT_FADE * 2], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontFamily,
        fontSize: 52,
        fontWeight: 700,
        color,
        letterSpacing: "0.02em",
      }}
    >
      {text}
    </div>
  );
};

export const B2Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Staggered labels: Planer. → Bauleitung. → Koordination?
  const label1Start = Math.round(1.0 * FPS);
  const label2Start = Math.round(2.8 * FPS);
  const label3Start = Math.round(4.8 * FPS);

  const bodyOpacity = interpolate(frame, [Math.round(5.5 * FPS), Math.round(6.2 * FPS)], [0, 1], {
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
      <div style={{ width: "100%" }}>
        {/* Staggered labels */}
        <div style={{ display: "flex", gap: 48, marginBottom: 60, alignItems: "baseline" }}>
          <Label text="Planer." frame={frame} startAt={label1Start} />
          <Label
            text="Bauleitung."
            frame={frame}
            startAt={label2Start}
            color={COLORS.TEXT_MUTED}
          />
          <Label
            text="Koordination?"
            frame={frame}
            startAt={label3Start}
            color={COLORS.ACCENT_TEAL}
          />
        </div>

        {/* Body copy */}
        <div
          style={{
            opacity: bodyOpacity,
            fontFamily,
            fontSize: 38,
            fontWeight: 400,
            color: COLORS.TEXT_LIGHT,
            lineHeight: 1.5,
            maxWidth: 820,
          }}
        >
          Termine verschieben sich. Kosten steigen.
          <br />
          Und Sie stehen mittendrin.
        </div>
      </div>
    </AbsoluteFill>
  );
};
