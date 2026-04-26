import React from "react";

// BIM wireframe model on monitor — technical competence visual
export const BIMScreen: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <svg
    width="1920"
    height="1080"
    viewBox="0 0 1920 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", inset: 0, opacity }}
  >
    <rect width="1920" height="1080" fill="#D8D4CE" />

    {/* Monitor frame */}
    <rect x={260} y={80} width={1180} height={780} rx={12} fill="#2A2A28" stroke="#3A3835" strokeWidth={3} />
    <rect x={276} y={96} width={1148} height={748} rx={6} fill="#111210" />
    {/* Monitor stand */}
    <rect x={800} y={860} width={120} height={60} rx={4} fill="#3A3835" />
    <rect x={700} y={918} width={320} height={16} rx={8} fill="#3A3835" />

    {/* BIM Interface — dark screen content */}
    {/* Toolbar */}
    <rect x={276} y={96} width={1148} height={36} fill="#1E1E1C" />
    {[20, 60, 100, 140, 200, 240].map((x) => (
      <rect key={x} x={296 + x} y={110} width={32} height={8} rx={2} fill="#555250" />
    ))}
    <text x={1340} y={118} textAnchor="end" fontFamily="monospace" fontSize={11} fill="#7BA0A6">BIM VIEW 3.2 · GUSSHAUS</text>

    {/* Side panel */}
    <rect x={276} y={132} width={200} height={712} fill="#191917" />
    {["OBJEKTE", "ETAGEN", "MATERIAL", "KOSTEN", "TERMINE"].map((label, i) => (
      <g key={label}>
        <rect x={280} y={148 + i * 136} width={192} height={120} rx={3} fill={i === 1 ? "#252523" : "#1E1E1C"} />
        <text x={376} y={200 + i * 136} textAnchor="middle" fontFamily="monospace" fontSize={10} fill="#7BA0A6" letterSpacing="1">{label}</text>
        {Array.from({ length: 3 }).map((_, j) => (
          <rect key={j} x={292} y={212 + i * 136 + j * 18} width={80 + j * 20} height={6} rx={2} fill="#3A3835" />
        ))}
      </g>
    ))}

    {/* 3D Building wireframe — isometric projection */}
    <g transform="translate(860, 480)">
      {/* Define isometric transforms */}
      {/* Ground floor */}
      <path d="M 0 0 L 280 -160 L 560 0 L 280 160 Z" stroke="#7BA0A6" strokeWidth={1.5} fill="#1A2A2C" fillOpacity={0.6} />
      {/* Floor 1 */}
      <path d="M 0 0 L 0 -120 L 280 -280 L 560 -120 L 560 0 L 280 160 Z" stroke="#7BA0A6" strokeWidth={1.5} fill="#152224" fillOpacity={0.8} />
      {/* Left face */}
      <path d="M 0 -120 L 0 0 L 280 160 L 280 40 Z" stroke="#7BA0A6" strokeWidth={1} fill="#0E1A1C" fillOpacity={0.9} />
      {/* Right face */}
      <path d="M 560 -120 L 560 0 L 280 160 L 280 40 Z" stroke="#7BA0A6" strokeWidth={1} fill="#111E20" fillOpacity={0.9} />

      {/* Floor 2 */}
      <path d="M 0 -120 L 0 -240 L 280 -400 L 560 -240 L 560 -120 L 280 40 Z" stroke="#7BA0A6" strokeWidth={1.5} fill="#152224" fillOpacity={0.7} />
      <path d="M 0 -240 L 0 -120 L 280 40 L 280 -80 Z" stroke="#7BA0A6" strokeWidth={1} fill="#0E1A1C" fillOpacity={0.9} />
      <path d="M 560 -240 L 560 -120 L 280 40 L 280 -80 Z" stroke="#7BA0A6" strokeWidth={1} fill="#111E20" fillOpacity={0.8} />

      {/* Roof */}
      <path d="M 0 -240 L 280 -400 L 560 -240 L 280 -80 Z" stroke="#7BA0A6" strokeWidth={1.5} fill="#1A2A2C" fillOpacity={0.6} />

      {/* Window grid overlays */}
      {[0, 1, 2].map((floor) =>
        [60, 160, 260, 360, 460].map((wx) => (
          <rect
            key={`w${floor}${wx}`}
            x={wx - 560 / 2 + 30}
            y={-140 - floor * 120 + 20}
            width={28}
            height={40}
            rx={2}
            fill="#7BA0A6"
            fillOpacity={0.15}
            stroke="#7BA0A6"
            strokeWidth={0.8}
            strokeOpacity={0.4}
          />
        ))
      )}

      {/* Dimension annotations */}
      <line x1={0} y1={200} x2={560} y2={200} stroke="#555250" strokeWidth={0.8} strokeDasharray="4 3" />
      <text x={280} y={220} textAnchor="middle" fontFamily="monospace" fontSize={11} fill="#7BA0A6">22.40 m</text>
      <line x1={620} y1={-240} x2={620} y2={0} stroke="#555250" strokeWidth={0.8} strokeDasharray="4 3" />
      <text x={660} y={-120} fontFamily="monospace" fontSize={11} fill="#7BA0A6">8.40 m</text>
    </g>

    {/* Status bar */}
    <rect x={276} y={820} width={1148} height={28} fill="#1E1E1C" />
    <text x={290} y={838} fontFamily="monospace" fontSize={10} fill="#555250">ELEMENTE: 2.847 · KOLLISIONEN: 0 · LAST UPDATE: HEUTE</text>
    <text x={1400} y={838} textAnchor="end" fontFamily="monospace" fontSize={10} fill="#7BA0A6">● BEREIT</text>

    {/* Subtle screen glow */}
    <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#7BA0A6" stopOpacity={0.06} />
      <stop offset="100%" stopColor="transparent" />
    </radialGradient>
    <rect x={276} y={96} width={1148} height={748} fill="url(#screenGlow)" />

    {/* Room context — desk surface under monitor */}
    <rect x={0} y={960} width={1920} height={120} fill="#C8C4BE" />
    <rect x={160} y={950} width={1600} height={20} rx={4} fill="#BCBAB4" />
  </svg>
);
