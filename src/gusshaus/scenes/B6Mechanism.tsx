import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { FPS, TEXT_FADE } from "../timing";
import { fontFamily } from "../font";

const ServiceLabel: React.FC<{
  text: string;
  frame: number;
  startAt: number;
  index: number;
}> = ({ text, frame, startAt, index }) => {
  const localFrame = frame - startAt;
  const opacity = interpolate(localFrame, [0, TEXT_FADE * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const x = interpolate(localFrame, [0, TEXT_FADE * 2], [-24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginBottom: 24,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: COLORS.ACCENT_MAGENTA,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          fontFamily,
          fontSize: 52,
          fontWeight: 700,
          color: COLORS.TEXT_DARK,
          letterSpacing: "0.02em",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const B6Mechanism: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const s1Start = Math.round(0.5 * FPS);
  const s2Start = Math.round(2.0 * FPS);
  const s3Start = Math.round(3.5 * FPS);

  const bimStart = Math.round(5.0 * FPS);
  const bimOpacity = interpolate(frame, [bimStart, bimStart + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const conclusionStart = Math.round(7.5 * FPS);
  const conclusionOpacity = interpolate(frame, [conclusionStart, conclusionStart + 14], [0, 1], {
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
        padding: "0 140px",
      }}
    >
      <div style={{ width: "100%" }}>
        {/* Service labels */}
        <ServiceLabel text="Entwurfsplanung." frame={frame} startAt={s1Start} index={0} />
        <ServiceLabel text="Genehmigung." frame={frame} startAt={s2Start} index={1} />
        <ServiceLabel text="Baumanagement." frame={frame} startAt={s3Start} index={2} />

        {/* BIM/3D claim */}
        <div
          style={{
            opacity: bimOpacity,
            marginTop: 48,
            padding: "24px 32px",
            background: COLORS.BG_WHITE,
            borderLeft: `4px solid ${COLORS.ACCENT_TEAL}`,
            maxWidth: 760,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 28,
              fontWeight: 400,
              color: COLORS.TEXT_DARK,
              lineHeight: 1.5,
            }}
          >
            Mit BIM-Modellen und 3D-Scanning eliminieren
            <br />
            wir Fehler bevor sie entstehen.
          </div>
        </div>

        {/* Conclusion */}
        <div
          style={{
            opacity: conclusionOpacity,
            marginTop: 24,
            fontFamily,
            fontSize: 28,
            fontWeight: 400,
            color: COLORS.TEXT_MUTED,
            fontStyle: "italic",
            letterSpacing: "0.02em",
          }}
        >
          Nicht weil es modern klingt. Weil es funktioniert.
        </div>
      </div>
    </AbsoluteFill>
  );
};
