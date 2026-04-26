import React from "react";

// Two-person silhouette on concrete wall texture — stands in for founder photo
export const FoundersPlaceholder: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <svg
    width="960"
    height="1080"
    viewBox="0 0 960 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", opacity }}
  >
    {/* Concrete wall background */}
    <rect width="960" height="1080" fill="#3A3835" />

    {/* Concrete texture — horizontal form lines */}
    {Array.from({ length: 18 }).map((_, i) => (
      <line key={i} x1={0} y1={60 * i} x2={960} y2={60 * i} stroke="#454240" strokeWidth={i % 4 === 0 ? 1.2 : 0.5} strokeOpacity={0.6} />
    ))}
    {/* Vertical variation */}
    {Array.from({ length: 6 }).map((_, i) => (
      <rect key={i} x={160 * i} y={0} width={160} height={1080} fill={i % 2 === 0 ? "#3C3936" : "#3A3835"} fillOpacity={0.3} />
    ))}

    {/* Subtle light from above */}
    <radialGradient id="toplight" cx="50%" cy="0%" r="80%">
      <stop offset="0%" stopColor="#6A6560" stopOpacity={0.4} />
      <stop offset="100%" stopColor="transparent" />
    </radialGradient>
    <rect width="960" height="1080" fill="url(#toplight)" />

    {/* Person 1 — left, slightly taller (Manfred, smiling) */}
    <g transform="translate(280, 180)">
      {/* Head */}
      <circle cx={0} cy={0} r={52} fill="#555250" />
      {/* Slight smile tilt */}
      <circle cx={0} cy={0} r={48} fill="#4E4B48" />
      {/* Neck */}
      <rect x={-18} y={46} width={36} height={40} rx={8} fill="#555250" />
      {/* Shoulders + body — dark blazer */}
      <path d="M -100 120 Q -80 90 -18 86 L 18 86 Q 80 90 100 120 L 110 420 L -110 420 Z" fill="#2A2825" />
      {/* Collar / white shirt */}
      <path d="M -18 86 L 0 130 L 18 86" fill="#D8D4CE" fillOpacity={0.7} />
      {/* Lapels */}
      <path d="M -18 86 L -60 150 L -30 160 L 0 130" fill="#222220" />
      <path d="M 18 86 L 60 150 L 30 160 L 0 130" fill="#222220" />
    </g>

    {/* Person 2 — right, arms crossed (Matthäus) */}
    <g transform="translate(660, 200)">
      {/* Head */}
      <circle cx={0} cy={0} r={50} fill="#525050" />
      <circle cx={0} cy={0} r={46} fill="#4C4A47" />
      {/* Neck */}
      <rect x={-17} y={44} width={34} height={38} rx={7} fill="#525050" />
      {/* Body — dark blazer */}
      <path d="M -95 115 Q -75 88 -17 84 L 17 84 Q 75 88 95 115 L 105 420 L -105 420 Z" fill="#272523" />
      {/* Collar */}
      <path d="M -17 84 L 0 126 L 17 84" fill="#D8D4CE" fillOpacity={0.65} />
      <path d="M -17 84 L -58 146 L -28 156 L 0 126" fill="#1E1C1A" />
      <path d="M 17 84 L 58 146 L 28 156 L 0 126" fill="#1E1C1A" />
      {/* Crossed arms */}
      <path d="M -95 220 Q -40 210 0 230 Q 40 210 95 220 Q 80 280 0 270 Q -80 280 -95 220 Z" fill="#272523" />
    </g>

    {/* Ground shadow */}
    <ellipse cx={480} cy={980} rx={300} ry={30} fill="#1A1916" fillOpacity={0.4} />

    {/* Bottom vignette */}
    <linearGradient id="botvig" x1="0" y1="0" x2="0" y2="1">
      <stop offset="70%" stopColor="transparent" />
      <stop offset="100%" stopColor="#1A1916" stopOpacity={0.6} />
    </linearGradient>
    <rect width="960" height="1080" fill="url(#botvig)" />

    {/* Top vignette */}
    <linearGradient id="topvig" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#1A1916" stopOpacity={0.3} />
      <stop offset="15%" stopColor="transparent" />
    </linearGradient>
    <rect width="960" height="1080" fill="url(#topvig)" />
  </svg>
);
