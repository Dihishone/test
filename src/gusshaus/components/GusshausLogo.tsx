import React from "react";

interface GusshausLogoProps {
  // "light" = white on transparent (for dark/magenta bg)
  // "dark" = magenta on transparent (for light bg)
  variant?: "light" | "dark";
  width?: number;
}

export const GusshausLogo: React.FC<GusshausLogoProps> = ({
  variant = "light",
  width = 200,
}) => {
  const aspect = 820 / 980; // viewBox ratio
  const height = width / aspect;

  const magenta = "#8C1A7E";
  const grey = "#909090";
  const white = "#F2F0EE";
  const darkBg = "#2A2A28";

  const monogramFill = variant === "light" ? white : white;
  const wordmarkFill = variant === "light" ? white : white;
  const circleFill = variant === "light" ? grey : grey;
  const bgFill = variant === "light" ? magenta : magenta;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 820 980"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Magenta square background */}
      <rect width="820" height="820" fill={bgFill} />

      {/* Grey circle */}
      <circle cx="430" cy="390" r="270" fill={circleFill} />

      {/* C — large white arc/crescent, left side */}
      <path
        d="M 290 160 A 240 240 0 0 0 290 620 L 290 560 A 175 175 0 0 1 290 220 Z"
        fill={monogramFill}
      />

      {/* H — center of circle */}
      <g fill={monogramFill}>
        {/* Left vertical bar */}
        <rect x="340" y="220" width="55" height="340" />
        {/* Right vertical bar */}
        <rect x="500" y="220" width="55" height="340" />
        {/* Horizontal crossbar */}
        <rect x="340" y="365" width="215" height="50" />
      </g>

      {/* B — right side, overlapping circle and C */}
      <g fill={monogramFill}>
        {/* Vertical stem */}
        <rect x="540" y="190" width="55" height="400" />
        {/* Top bump */}
        <path
          d="M 595 190 Q 690 190 690 295 Q 690 370 595 380 L 595 190 Z"
          fill={monogramFill}
        />
        {/* Bottom bump */}
        <path
          d="M 595 380 Q 710 390 710 500 Q 710 590 595 590 L 595 380 Z"
          fill={monogramFill}
        />
      </g>

      {/* GUSSHAUS wordmark — bottom of square */}
      <text
        x="410"
        y="770"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="110"
        fontWeight="700"
        fill={wordmarkFill}
        letterSpacing="8"
      >
        GUSSHAUS
      </text>
    </svg>
  );
};
