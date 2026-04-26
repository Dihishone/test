import React from "react";

// Close-up architectural drawing — technical plan detail on warm paper
export const PlanningDetail: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <svg
    width="1920"
    height="1080"
    viewBox="0 0 1920 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", inset: 0, opacity }}
  >
    {/* Warm paper background */}
    <rect width="1920" height="1080" fill="#D8D4CE" />

    {/* Paper texture — subtle grain */}
    {Array.from({ length: 28 }).map((_, i) => (
      <line key={`h${i}`} x1={0} y1={38 * i} x2={1920} y2={38 * i} stroke="#C8C4BE" strokeWidth={0.4} strokeOpacity={0.5} />
    ))}

    {/* Large floor plan — architectural drawing */}
    {/* Outer walls */}
    <rect x={280} y={160} width={880} height={620} stroke="#2A2A28" strokeWidth={4} fill="none" />

    {/* Interior walls */}
    <line x1={280} y1={420} x2={720} y2={420} stroke="#2A2A28" strokeWidth={3} />
    <line x1={720} y1={160} x2={720} y2={560} stroke="#2A2A28" strokeWidth={3} />
    <line x1={560} y1={420} x2={560} y2={780} stroke="#2A2A28" strokeWidth={3} />
    <line x1={560} y1={600} x2={1160} y2={600} stroke="#2A2A28" strokeWidth={3} />
    <line x1={900} y1={160} x2={900} y2={600} stroke="#2A2A28" strokeWidth={3} />

    {/* Door arcs */}
    <path d="M 370 420 A 90 90 0 0 1 370 330" stroke="#2A2A28" strokeWidth={1.5} fill="none" />
    <line x1={370} y1={420} x2={370} y2={330} stroke="#2A2A28" strokeWidth={1.5} />
    <path d="M 720 300 A 80 80 0 0 0 640 300" stroke="#2A2A28" strokeWidth={1.5} fill="none" />
    <line x1={720} y1={300} x2={720} y2={220} stroke="#2A2A28" strokeWidth={1} />

    {/* Window indicators */}
    {[340, 550, 780, 1020].map((x) => (
      <g key={x}>
        <rect x={x} y={156} width={80} height={8} fill="#F2F0EE" stroke="#2A2A28" strokeWidth={1} />
        <line x1={x} y1={160} x2={x + 80} y2={160} stroke="#2A2A28" strokeWidth={0.8} />
      </g>
    ))}
    {[220, 440, 650].map((y) => (
      <g key={y}>
        <rect x={276} y={y} width={8} height={60} fill="#F2F0EE" stroke="#2A2A28" strokeWidth={1} />
      </g>
    ))}

    {/* Room labels */}
    <text x={480} y={305} textAnchor="middle" fontFamily="Georgia, serif" fontSize={16} fill="#2A2A28" fillOpacity={0.6} letterSpacing="2">WOHNRAUM</text>
    <text x={840} y={380} textAnchor="middle" fontFamily="Georgia, serif" fontSize={14} fill="#2A2A28" fillOpacity={0.6} letterSpacing="1.5">KÜCHE</text>
    <text x={400} y={600} textAnchor="middle" fontFamily="Georgia, serif" fontSize={13} fill="#2A2A28" fillOpacity={0.5} letterSpacing="1">BAD</text>
    <text x={840} y={700} textAnchor="middle" fontFamily="Georgia, serif" fontSize={14} fill="#2A2A28" fillOpacity={0.5} letterSpacing="1.5">SCHLAFZIMMER</text>

    {/* Dimension lines */}
    <line x1={280} y1={840} x2={1160} y2={840} stroke="#2A2A28" strokeWidth={1} />
    <line x1={280} y1={830} x2={280} y2={850} stroke="#2A2A28" strokeWidth={1} />
    <line x1={1160} y1={830} x2={1160} y2={850} stroke="#2A2A28" strokeWidth={1} />
    <text x={720} y={870} textAnchor="middle" fontFamily="Georgia, serif" fontSize={15} fill="#2A2A28" fillOpacity={0.7}>22.40 m</text>

    <line x1={140} y1={160} x2={140} y2={780} stroke="#2A2A28" strokeWidth={1} />
    <line x1={130} y1={160} x2={150} y2={160} stroke="#2A2A28" strokeWidth={1} />
    <line x1={130} y1={780} x2={150} y2={780} stroke="#2A2A28" strokeWidth={1} />
    <text x={100} y={480} textAnchor="middle" fontFamily="Georgia, serif" fontSize={15} fill="#2A2A28" fillOpacity={0.7} transform="rotate(-90 100 480)">16.30 m</text>

    {/* Cost table — right side */}
    <rect x={1280} y={160} width={480} height={520} rx={4} fill="#F2F0EE" fillOpacity={0.6} stroke="#2A2A28" strokeWidth={1} strokeOpacity={0.4} />
    <line x1={1280} y1={205} x2={1760} y2={205} stroke="#2A2A28" strokeWidth={1} strokeOpacity={0.4} />
    <text x={1520} y={190} textAnchor="middle" fontFamily="Georgia, serif" fontSize={15} fill="#2A2A28" fillOpacity={0.8} letterSpacing="2">KOSTENAUFSTELLUNG</text>

    {[
      ["Rohbau", "EUR 280.000"],
      ["Haustechnik", "EUR 95.000"],
      ["Innenausbau", "EUR 140.000"],
      ["Aussenanlagen", "EUR 38.000"],
      ["Planung 15%", "EUR 83.000"],
      ["Reserve 10%", "EUR 63.600"],
    ].map(([label, value], i) => (
      <g key={i}>
        <line x1={1280} y1={250 + i * 68} x2={1760} y2={250 + i * 68} stroke="#2A2A28" strokeWidth={0.5} strokeOpacity={0.2} />
        <text x={1300} y={240 + i * 68} fontFamily="Georgia, serif" fontSize={14} fill="#2A2A28" fillOpacity={0.65}>{label}</text>
        <text x={1740} y={240 + i * 68} textAnchor="end" fontFamily="Georgia, serif" fontSize={14} fill="#2A2A28" fillOpacity={0.65}>{value}</text>
      </g>
    ))}
    <line x1={1280} y1={660} x2={1760} y2={660} stroke="#2A2A28" strokeWidth={1.5} strokeOpacity={0.5} />
    <text x={1300} y={685} fontFamily="Georgia, serif" fontSize={15} fontWeight="bold" fill="#2A2A28" fillOpacity={0.9}>Gesamt</text>
    <text x={1740} y={685} textAnchor="end" fontFamily="Georgia, serif" fontSize={15} fontWeight="bold" fill="#2A2A28" fillOpacity={0.9}>EUR 699.600</text>

    {/* Title block bottom right */}
    <rect x={1280} y={740} width={480} height={160} rx={4} fill="none" stroke="#2A2A28" strokeWidth={1} strokeOpacity={0.4} />
    <text x={1300} y={775} fontFamily="Georgia, serif" fontSize={13} fill="#2A2A28" fillOpacity={0.5} letterSpacing="1">PROJEKT</text>
    <text x={1300} y={800} fontFamily="Georgia, serif" fontSize={18} fill="#2A2A28" fillOpacity={0.8}>⚑ Referenzprojekt</text>
    <text x={1300} y={835} fontFamily="Georgia, serif" fontSize={13} fill="#2A2A28" fillOpacity={0.5} letterSpacing="1">MASSSTAB</text>
    <text x={1300} y={858} fontFamily="Georgia, serif" fontSize={16} fill="#2A2A28" fillOpacity={0.7}>1 : 100</text>
    <text x={1600} y={835} fontFamily="Georgia, serif" fontSize={13} fill="#2A2A28" fillOpacity={0.5} letterSpacing="1">DATUM</text>
    <text x={1600} y={858} fontFamily="Georgia, serif" fontSize={16} fill="#2A2A28" fillOpacity={0.7}>2026</text>

    {/* Warm overlay to soften */}
    <rect width="1920" height="1080" fill="#D8D4CE" fillOpacity={0.15} />
  </svg>
);
