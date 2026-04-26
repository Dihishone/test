import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { FPS, FADE_DURATION } from "../timing";
import { fontFamily } from "../font";

// ⚑ PLATZHALTER — vor Final-Render ersetzen
const PROOF_PROJECT_NAME = "⚑ [PROJEKTNAME A]";
const PROOF_REGION = "⚑ [REGION A]";

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
      <div>
        {/* Placeholder notice (visible in draft) */}
        <div
          style={{
            fontFamily,
            fontSize: 16,
            color: COLORS.ACCENT_TEAL,
            letterSpacing: "0.12em",
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          Referenzprojekt — ⚑ Platzhalter aktiv
        </div>

        <div
          style={{
            opacity: projectNameOpacity,
            transform: `scale(${projectNameScale})`,
            transformOrigin: "left center",
            fontFamily,
            fontSize: 72,
            fontWeight: 700,
            color: COLORS.TEXT_LIGHT,
            letterSpacing: "0.01em",
            marginBottom: 8,
          }}
        >
          {PROOF_PROJECT_NAME}
        </div>
        <div
          style={{
            opacity: projectNameOpacity,
            fontFamily,
            fontSize: 32,
            fontWeight: 400,
            color: COLORS.TEXT_MUTED,
            letterSpacing: "0.04em",
            marginBottom: 48,
          }}
        >
          {PROOF_REGION}
        </div>

        {/* Outcome labels */}
        <div style={{ display: "flex", gap: 48 }}>
          <div style={{ opacity: label1Opacity }}>
            <div style={{ fontFamily, fontSize: 22, fontWeight: 700, color: COLORS.ACCENT_TEAL, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
              Termin
            </div>
            <div style={{ fontFamily, fontSize: 36, fontWeight: 700, color: COLORS.TEXT_LIGHT }}>
              Eingehalten.
            </div>
          </div>
          <div style={{ opacity: label2Opacity }}>
            <div style={{ fontFamily, fontSize: 22, fontWeight: 700, color: COLORS.ACCENT_TEAL, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
              Budget
            </div>
            <div style={{ fontFamily, fontSize: 36, fontWeight: 700, color: COLORS.TEXT_LIGHT }}>
              Eingehalten.
            </div>
          </div>
          <div style={{ opacity: label3Opacity, maxWidth: 380 }}>
            <div style={{ fontFamily, fontSize: 22, fontWeight: 700, color: COLORS.ACCENT_TEAL, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
              Bauherr
            </div>
            <div style={{ fontFamily, fontSize: 36, fontWeight: 400, color: COLORS.TEXT_LIGHT, fontStyle: "italic" }}>
              Kam beim nächsten Projekt wieder.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
