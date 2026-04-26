import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../colors";
import { FPS, FADE_DURATION } from "../timing";
import { fontFamily } from "../font";
import { GusshausLogo } from "../components/GusshausLogo";

export const B8CTA: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  const logoOpacity = interpolate(frame, [6, 6 + FADE_DURATION * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  const headlineStart = Math.round(1.2 * FPS);
  const headlineOpacity = interpolate(frame, [headlineStart, headlineStart + FADE_DURATION * 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });
  const headlineY = interpolate(frame, [headlineStart, headlineStart + FADE_DURATION * 3], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  const sublineStart = headlineStart + Math.round(0.45 * FPS);
  const sublineOpacity = interpolate(frame, [sublineStart, sublineStart + FADE_DURATION * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  const urlStart = sublineStart + Math.round(0.45 * FPS);
  const urlOpacity = interpolate(frame, [urlStart, urlStart + FADE_DURATION * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

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
      {/* Logo — top center, well-padded */}
      <div style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", opacity: logoOpacity }}>
        <GusshausLogo variant="light" width={180} />
      </div>

      {/* CTA copy — vertically centered */}
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            fontFamily,
            fontSize: 84,
            fontWeight: 700,
            color: COLORS.TEXT_LIGHT,
            letterSpacing: "0.015em",
            lineHeight: 1.1,
            marginBottom: 28,
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
            marginBottom: 52,
          }}
        >
          Kostenlos. Auch virtuell.
        </div>

        <div
          style={{
            opacity: urlOpacity,
            fontFamily,
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.TEXT_LIGHT,
            letterSpacing: "0.06em",
          }}
        >
          gusshaus.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
