import React from "react";
import { interpolate, Easing } from "remotion";

interface KineticTextProps {
  text: string;
  frame: number;
  startAt?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  letterSpacing?: string;
  textAlign?: "left" | "center" | "right";
  style?: React.CSSProperties;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  frame,
  startAt = 0,
  fontSize = 72,
  color = "#2A2A28",
  fontFamily = "Cormorant Garamond, Georgia, serif",
  fontWeight = 700,
  letterSpacing = "0.02em",
  textAlign = "left",
  style,
}) => {
  const localFrame = frame - startAt;
  const fadeDuration = 10;

  const opacity = interpolate(localFrame, [0, fadeDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const translateY = interpolate(localFrame, [0, fadeDuration], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontSize,
        color,
        fontFamily,
        fontWeight,
        letterSpacing,
        textAlign,
        lineHeight: 1.15,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
