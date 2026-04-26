import React from "react";

interface GusshausLogoProps {
  color?: string;
  width?: number;
}

// SVG approximation of GHB monogram + GUSSHAUS wordmark
export const GusshausLogo: React.FC<GusshausLogoProps> = ({
  color = "#F2F0EE",
  width = 220,
}) => {
  const h = Math.round(width * 0.28);
  const iconSize = h;
  const totalWidth = iconSize + 12 + (width - iconSize - 12);

  return (
    <svg
      width={totalWidth}
      height={h}
      viewBox={`0 0 ${totalWidth} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* GHB monogram block */}
      <rect width={iconSize} height={iconSize} rx={3} fill={color} fillOpacity={0.15} />
      <text
        x={iconSize / 2}
        y={iconSize * 0.68}
        textAnchor="middle"
        fontSize={iconSize * 0.52}
        fontWeight="700"
        fill={color}
        fontFamily="Georgia, serif"
        letterSpacing="-1"
      >
        GHB
      </text>

      {/* GUSSHAUS wordmark */}
      <text
        x={iconSize + 12}
        y={iconSize * 0.68}
        fontSize={iconSize * 0.38}
        fontWeight="700"
        fill={color}
        fontFamily="Georgia, serif"
        letterSpacing="3"
      >
        GUSSHAUS
      </text>
    </svg>
  );
};
