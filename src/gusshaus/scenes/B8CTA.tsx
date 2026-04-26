import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { FPS, FADE_DURATION } from "../timing";
import { fontFamily } from "../font";
import { GusshausLogo } from "../components/GusshausLogo";

export const B8CTA: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const logoOpacity = interpolate(frame, [4, 4 + FADE_DURATION * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const headlineStart = Math.round(1.0 * FPS);
  const headlineOpacity = interpolate(frame, [headlineStart, headlineStart + FADE_DURATION * 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const headlineY = interpolate(frame, [headlineStart, headlineStart + FADE_DURATION * 3], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const sublineStart = headlineStart + Math.round(0.4 * FPS);
  const sublineOpacity = interpolate(frame, [sublineStart, sublineStart + FADE_DURATION * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const urlStart = sublineStart + Math.round(0.4 * FPS);
  const urlOpacity = interpolate(frame, [urlStart, urlStart + FADE_DURATION * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.BG_MAGENTA,
        opacity: bgOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Logo top-center */}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: logoOpacity,
        }}
      >
        <GusshausLogo color={COLORS.TEXT_LIGHT} width={260} />
      </div>

      {/* CTA content */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            fontFamily,
            fontSize: 80,
            fontWeight: 700,
            color: COLORS.TEXT_LIGHT,
            letterSpacing: "0.02em",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Erstgespräch vereinbaren.
        </div>

        <div
          style={{
            opacity: sublineOpacity,
            fontFamily,
            fontSize: 36,
            fontWeight: 400,
            color: COLORS.TEXT_LIGHT,
            letterSpacing: "0.04em",
            marginBottom: 48,
          }}
        >
          Kostenlos. Auch virtuell.
        </div>

        <div
          style={{
            opacity: urlOpacity,
            fontFamily,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.TEXT_LIGHT,
            letterSpacing: "0.08em",
            textTransform: "lowercase",
          }}
        >
          gusshaus.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
