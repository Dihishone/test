import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Img, staticFile } from "remotion";
import { COLORS } from "../colors";
import { FPS, FADE_DURATION } from "../timing";
import { fontFamily } from "../font";
import { FoundersPlaceholder } from "../components/FoundersPlaceholder";

const FOUNDER_PHOTO = "gusshaus/founders.jpg";

// Try real photo; fall back to illustrated placeholder
const FoundersImage: React.FC = () => {
  const [useFallback, setUseFallback] = React.useState(false);

  if (useFallback) {
    return <FoundersPlaceholder />;
  }

  return (
    <Img
      src={staticFile(FOUNDER_PHOTO)}
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
      onError={() => setUseFallback(true)}
    />
  );
};

export const B5Solution: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameStart = Math.round(1.2 * FPS);
  const nameOpacity = interpolate(frame, [nameStart, nameStart + FADE_DURATION * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const nameY = interpolate(frame, [nameStart, nameStart + FADE_DURATION * 2], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const brandStart = Math.round(5.0 * FPS);
  const brandOpacity = interpolate(frame, [brandStart, brandStart + Math.round(0.5 * FPS) * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const brandScale = interpolate(frame, [brandStart, brandStart + Math.round(0.5 * FPS) * 2], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const bodyOpacity = interpolate(frame, [Math.round(2.5 * FPS), Math.round(3.2 * FPS)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill style={{ background: COLORS.BG_WARM, opacity: bgOpacity }}>
      {/* Left: Founder photo or illustrated placeholder */}
      <AbsoluteFill
        style={{
          width: "50%",
          background: COLORS.BG_DARK,
          overflow: "hidden",
        }}
      >
        <FoundersImage />

        {/* Name label — Bauchbinde style */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 48,
            right: 48,
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
          }}
        >
          <div
            style={{
              background: "rgba(42,42,40,0.82)",
              padding: "16px 24px",
              display: "inline-block",
            }}
          >
            <div
              style={{
                fontFamily,
                fontSize: 26,
                fontWeight: 700,
                color: COLORS.TEXT_LIGHT,
                letterSpacing: "0.08em",
              }}
            >
              MANFRED &amp; MATTHÄUS HEIGL
            </div>
            <div
              style={{
                fontFamily,
                fontSize: 18,
                fontWeight: 400,
                color: COLORS.TEXT_MUTED,
                letterSpacing: "0.04em",
                marginTop: 4,
              }}
            >
              Gründer, Gusshaus GmbH
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Right: Brand reveal + body copy */}
      <AbsoluteFill
        style={{
          left: "50%",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            opacity: brandOpacity,
            transform: `scale(${brandScale})`,
            transformOrigin: "left center",
            fontFamily,
            fontSize: 88,
            fontWeight: 700,
            color: COLORS.ACCENT_MAGENTA,
            letterSpacing: "0.02em",
            marginBottom: 32,
          }}
        >
          Gusshaus.
        </div>

        <div
          style={{
            opacity: bodyOpacity,
            fontFamily,
            fontSize: 28,
            fontWeight: 400,
            color: COLORS.TEXT_DARK,
            lineHeight: 1.6,
            letterSpacing: "0.01em",
          }}
        >
          Gegründet 2021.
          <br />
          Ein Planungs- und Baumanagement-Büro,
          <br />
          das von der ersten Skizze bis zur
          <br />
          Schlüsselübergabe vollständig plant,
          <br />
          steuert und umsetzt — und dabei bleibt.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
