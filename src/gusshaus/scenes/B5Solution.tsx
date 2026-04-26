import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Img, staticFile } from "remotion";
import { COLORS } from "../colors";
import { FPS, FADE_DURATION } from "../timing";
import { fontFamily } from "../font";
import { FoundersPlaceholder } from "../components/FoundersPlaceholder";

const FOUNDER_PHOTO = "gusshaus/founders.jpg";

// Set to true once founders.jpg is saved to public/gusshaus/
const HAS_FOUNDER_PHOTO = true;

const FoundersImage: React.FC = () => {
  if (!HAS_FOUNDER_PHOTO) return <FoundersPlaceholder />;
  return (
    <Img
      src={staticFile(FOUNDER_PHOTO)}
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
    />
  );
};

export const B5Solution: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const nameStart = Math.round(1.4 * FPS);
  const nameOpacity = interpolate(frame, [nameStart, nameStart + FADE_DURATION * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });
  const nameY = interpolate(frame, [nameStart, nameStart + FADE_DURATION * 2], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  const brandStart = Math.round(4.5 * FPS);
  const brandOpacity = interpolate(frame, [brandStart, brandStart + Math.round(0.6 * FPS) * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });
  const brandScale = interpolate(frame, [brandStart, brandStart + Math.round(0.6 * FPS) * 2], [0.93, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  const bodyStart = Math.round(2.5 * FPS);
  const bodyOpacity = interpolate(frame, [bodyStart, bodyStart + Math.round(0.8 * FPS)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  return (
    <AbsoluteFill style={{ background: COLORS.BG_WARM, opacity: bgOpacity }}>
      {/* Left half: founder photo */}
      <AbsoluteFill style={{ width: "52%", background: "#2A2A28", overflow: "hidden" }}>
        <FoundersImage />

        {/* Name label — Bauchbinde, bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: 72,
            left: 56,
            right: 56,
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
          }}
        >
          <div style={{ background: "rgba(30,28,26,0.88)", padding: "18px 28px", display: "inline-block" }}>
            <div style={{ fontFamily, fontSize: 24, fontWeight: 700, color: COLORS.TEXT_LIGHT, letterSpacing: "0.1em" }}>
              MANFRED &amp; MATTHÄUS HEIGL
            </div>
            <div style={{ fontFamily, fontSize: 16, fontWeight: 400, color: COLORS.TEXT_MUTED, letterSpacing: "0.05em", marginTop: 5 }}>
              Gründer, Gusshaus GmbH · seit 2021
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Right half: brand + copy — vertically centered */}
      <AbsoluteFill
        style={{
          left: "52%",
          width: "48%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px 0 72px",
        }}
      >
        {/* "Gusshaus." Magenta reveal */}
        <div
          style={{
            opacity: brandOpacity,
            transform: `scale(${brandScale})`,
            transformOrigin: "left center",
            fontFamily,
            fontSize: 80,
            fontWeight: 700,
            color: COLORS.ACCENT_MAGENTA,
            letterSpacing: "0.02em",
            marginBottom: 36,
            lineHeight: 1,
          }}
        >
          Gusshaus.
        </div>

        <div
          style={{
            opacity: bodyOpacity,
            fontFamily,
            fontSize: 27,
            fontWeight: 400,
            color: COLORS.TEXT_DARK,
            lineHeight: 1.65,
            letterSpacing: "0.01em",
          }}
        >
          Gegründet 2021. Ein Planungs- und
          <br />Baumanagement-Büro, das von der
          <br />ersten Skizze bis zur Schlüsselübergabe
          <br />vollständig plant, steuert und umsetzt —
          <br />und dabei bleibt.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
