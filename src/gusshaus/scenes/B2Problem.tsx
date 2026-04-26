import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { FPS, TEXT_FADE } from "../timing";
import { fontFamily } from "../font";
import { FragmentationVisual } from "../components/FragmentationVisual";

const Label: React.FC<{ text: string; frame: number; startAt: number; color?: string }> = ({
  text, frame, startAt, color = COLORS.TEXT_LIGHT,
}) => {
  const local = frame - startAt;
  const opacity = interpolate(local, [0, TEXT_FADE * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });
  const y = interpolate(local, [0, TEXT_FADE * 2], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });
  return (
    <div style={{ opacity, transform: `translateY(${y}px)`, fontFamily, fontSize: 56, fontWeight: 700, color, letterSpacing: "0.02em" }}>
      {text}
    </div>
  );
};

export const B2Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const label1Start = Math.round(1.0 * FPS);
  const label2Start = Math.round(2.8 * FPS);
  const label3Start = Math.round(4.8 * FPS);
  const bodyOpacity = interpolate(frame, [Math.round(5.8 * FPS), Math.round(6.5 * FPS)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  return (
    <AbsoluteFill style={{ opacity: bgOpacity }}>
      <FragmentationVisual showLabel1={frame >= label1Start} showLabel2={frame >= label2Start} showLabel3={frame >= label3Start} />
      <AbsoluteFill style={{ background: "linear-gradient(to top, rgba(26,25,22,0.95) 35%, rgba(26,25,22,0.15) 75%, transparent 100%)" }} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px 160px",
        }}
      >
        <div style={{ display: "flex", gap: 52, alignItems: "baseline", marginBottom: 36 }}>
          <Label text="Planer." frame={frame} startAt={label1Start} />
          <Label text="Bauleitung." frame={frame} startAt={label2Start} color={COLORS.TEXT_MUTED} />
          <Label text="Koordination?" frame={frame} startAt={label3Start} color={COLORS.ACCENT_TEAL} />
        </div>
        <div style={{ opacity: bodyOpacity, fontFamily, fontSize: 36, fontWeight: 400, color: COLORS.TEXT_LIGHT, lineHeight: 1.55, maxWidth: 760 }}>
          Termine verschieben sich. Kosten steigen.
          <br />Und Sie stehen mittendrin.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
