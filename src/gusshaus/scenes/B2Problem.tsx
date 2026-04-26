import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { FPS, TEXT_FADE } from "../timing";
import { fontFamily } from "../font";
import { FragmentationVisual } from "../components/FragmentationVisual";

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

  const label1Start = Math.round(1.0 * FPS);
  const label2Start = Math.round(2.8 * FPS);
  const label3Start = Math.round(4.8 * FPS);

  const bodyOpacity = interpolate(frame, [Math.round(5.5 * FPS), Math.round(6.2 * FPS)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  // Fragmentation islands fade in sync with labels
  const show1 = frame >= label1Start;
  const show2 = frame >= label2Start;
  const show3 = frame >= label3Start;

  return (
    <AbsoluteFill style={{ opacity: bgOpacity }}>
      {/* Fragmentation illustration */}
      <FragmentationVisual showLabel1={show1} showLabel2={show2} showLabel3={show3} />

      {/* Dark overlay — bottom half for text */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(to top, rgba(30,28,26,0.92) 40%, rgba(30,28,26,0.2) 80%, transparent 100%)",
        }}
      />

      {/* Text overlay — bottom aligned */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 140px 120px",
        }}
      >
        {/* Staggered labels */}
        <div style={{ display: "flex", gap: 48, marginBottom: 40, alignItems: "baseline" }}>
          <Label text="Planer." frame={frame} startAt={label1Start} />
          <Label text="Bauleitung." frame={frame} startAt={label2Start} color={COLORS.TEXT_MUTED} />
          <Label text="Koordination?" frame={frame} startAt={label3Start} color={COLORS.ACCENT_TEAL} />
        </div>

        {/* Body copy */}
        <div
          style={{
            opacity: bodyOpacity,
            fontFamily,
            fontSize: 36,
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
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
