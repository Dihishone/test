import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { FPS, FADE_DURATION } from "../timing";
import { fontFamily } from "../font";
import { BuildingExterior } from "../components/BuildingExterior";

// ⚑ PLATZHALTER — vor Final-Render durch echte Werte ersetzen
const PROOF_PROJECT_NAME = "⚑ Projektname A";
const PROOF_REGION = "⚑ Region A";

export const B7Proof: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const projectNameOpacity = interpolate(frame, [8, 8 + FADE_DURATION * 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const projectNameScale = interpolate(frame, [8, 8 + FADE_DURATION * 3], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const label1Start = Math.round(1.8 * FPS);
  const label1Opacity = interpolate(frame, [label1Start, label1Start + FADE_DURATION * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const label2Start = Math.round(2.5 * FPS);
  const label2Opacity = interpolate(frame, [label2Start, label2Start + FADE_DURATION * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const label3Start = Math.round(3.8 * FPS);
  const label3Opacity = interpolate(frame, [label3Start, label3Start + FADE_DURATION * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill style={{ opacity: bgOpacity }}>
      {/* Building exterior illustration */}
      <BuildingExterior />

      {/* Dark overlay — bottom area for text */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(to top, rgba(30,28,26,0.95) 38%, rgba(30,28,26,0.5) 65%, transparent 100%)",
        }}
      />

      {/* Text — bottom aligned */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 140px 100px",
        }}
      >
        {/* Placeholder notice */}
        <div style={{ fontFamily, fontSize: 14, color: COLORS.ACCENT_TEAL, letterSpacing: "0.12em", marginBottom: 16, textTransform: "uppercase" }}>
          Referenzprojekt — ⚑ Platzhalter aktiv
        </div>

        <div
          style={{
            opacity: projectNameOpacity,
            transform: `scale(${projectNameScale})`,
            transformOrigin: "left bottom",
          }}
        >
          <div style={{ fontFamily, fontSize: 68, fontWeight: 700, color: COLORS.TEXT_LIGHT, letterSpacing: "0.01em" }}>
            {PROOF_PROJECT_NAME}
          </div>
          <div style={{ fontFamily, fontSize: 28, fontWeight: 400, color: COLORS.TEXT_MUTED, letterSpacing: "0.04em", marginBottom: 40 }}>
            {PROOF_REGION}
          </div>
        </div>

        {/* Outcome labels */}
        <div style={{ display: "flex", gap: 56 }}>
          <div style={{ opacity: label1Opacity }}>
            <div style={{ fontFamily, fontSize: 18, fontWeight: 700, color: COLORS.ACCENT_TEAL, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Termin</div>
            <div style={{ fontFamily, fontSize: 34, fontWeight: 700, color: COLORS.TEXT_LIGHT }}>Eingehalten.</div>
          </div>
          <div style={{ opacity: label2Opacity }}>
            <div style={{ fontFamily, fontSize: 18, fontWeight: 700, color: COLORS.ACCENT_TEAL, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Budget</div>
            <div style={{ fontFamily, fontSize: 34, fontWeight: 700, color: COLORS.TEXT_LIGHT }}>Eingehalten.</div>
          </div>
          <div style={{ opacity: label3Opacity, maxWidth: 400 }}>
            <div style={{ fontFamily, fontSize: 18, fontWeight: 700, color: COLORS.ACCENT_TEAL, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Bauherr</div>
            <div style={{ fontFamily, fontSize: 34, fontWeight: 400, color: COLORS.TEXT_LIGHT, fontStyle: "italic" }}>Kam beim nächsten Projekt wieder.</div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
