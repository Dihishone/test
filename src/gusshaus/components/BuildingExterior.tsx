import React from "react";

// Premium alpine residential building exterior — proof/reference visual
export const BuildingExterior: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <svg
    width="1920"
    height="1080"
    viewBox="0 0 1920 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", inset: 0, opacity }}
  >
    {/* Sky — warm late afternoon */}
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#B8C4C8" />
      <stop offset="60%" stopColor="#D4CEC8" />
      <stop offset="100%" stopColor="#D8D4CE" />
    </linearGradient>
    <rect width="1920" height="1080" fill="url(#sky)" />

    {/* Mountain silhouette — alpine context */}
    <path d="M 0 580 L 200 340 L 380 480 L 560 260 L 780 500 L 960 320 L 1140 460 L 1360 280 L 1580 420 L 1780 300 L 1920 420 L 1920 1080 L 0 1080 Z"
      fill="#A8B0B4" fillOpacity={0.35} />
    <path d="M 0 640 L 160 480 L 340 560 L 500 400 L 680 540 L 860 380 L 1020 500 L 1200 360 L 1400 480 L 1600 360 L 1780 460 L 1920 380 L 1920 1080 L 0 1080 Z"
      fill="#B8B4AE" fillOpacity={0.4} />

    {/* Ground / lawn */}
    <rect x={0} y={840} width={1920} height={240} fill="#B4B09E" />
    <rect x={0} y={840} width={1920} height={30} fill="#A8A490" />

    {/* Driveway / pathway */}
    <path d="M 760 1080 L 820 840 L 1100 840 L 1160 1080 Z" fill="#C8C4BC" />
    <line x1={960} y1={840} x2={960} y2={1080} stroke="#B8B4AC" strokeWidth={2} strokeDasharray="20 16" />

    {/* Main building — contemporary alpine residential */}
    {/* Foundation */}
    <rect x={420} y={820} width={1080} height={40} fill="#8A8880" />

    {/* Ground floor */}
    <rect x={420} y={480} width={1080} height={340} fill="#D8D4CE" />
    {/* Ground floor facade — concrete + wood panels */}
    <rect x={420} y={480} width={480} height={340} fill="#C8C4BE" />
    <rect x={900} y={480} width={600} height={340} fill="#D0CCC6" />
    {/* Horizontal cladding lines */}
    {Array.from({ length: 12 }).map((_, i) => (
      <line key={`gc${i}`} x1={420} y1={480 + i * 28} x2={900} y2={480 + i * 28} stroke="#B8B4AE" strokeWidth={0.8} strokeOpacity={0.6} />
    ))}

    {/* Upper floor — slightly recessed, darker concrete */}
    <rect x={460} y={220} width={1000} height={260} fill="#C0BDB8" />
    {/* Horizontal band */}
    <rect x={420} y={472} width={1080} height={12} fill="#A8A49E" />

    {/* Roof — flat with parapet */}
    <rect x={440} y={200} width={1040} height={24} fill="#909090" />
    <rect x={440} y={196} width={1040} height={8} fill="#A0A09A" />

    {/* Large windows — ground floor */}
    {/* Left window group */}
    <rect x={460} y={520} width={160} height={260} rx={2} fill="#2A3035" fillOpacity={0.7} stroke="#D8D4CE" strokeWidth={2} />
    <rect x={640} y={520} width={160} height={260} rx={2} fill="#2A3035" fillOpacity={0.7} stroke="#D8D4CE" strokeWidth={2} />
    {/* Center entrance */}
    <rect x={840} y={580} width={240} height={200} rx={3} fill="#1E2428" fillOpacity={0.9} stroke="#D8D4CE" strokeWidth={2} />
    {/* Door detail */}
    <rect x={920} y={640} width={80} height={140} rx={2} fill="#1A1E22" stroke="#909090" strokeWidth={1} />
    <circle cx={908} cy={714} r={5} fill="#909090" />
    {/* Right window group */}
    <rect x={1120} y={520} width={180} height={260} rx={2} fill="#2A3035" fillOpacity={0.7} stroke="#D8D4CE" strokeWidth={2} />
    <rect x={1320} y={520} width={140} height={260} rx={2} fill="#2A3035" fillOpacity={0.7} stroke="#D8D4CE" strokeWidth={2} />

    {/* Upper floor windows — continuous band */}
    <rect x={500} y={248} width={920} height={140} rx={2} fill="#252C32" fillOpacity={0.75} stroke="#B8B4AE" strokeWidth={1.5} />
    {/* Window dividers */}
    {[1, 2, 3, 4, 5].map((i) => (
      <line key={i} x1={500 + i * 184} y1={248} x2={500 + i * 184} y2={388} stroke="#B8B4AE" strokeWidth={1} />
    ))}

    {/* Balcony — upper floor */}
    <rect x={460} y={385} width={1000} height={12} fill="#A8A49E" />
    {/* Balcony railing */}
    <rect x={460} y={390} width={1000} height={82} fill="none" stroke="#C8C4BE" strokeWidth={1} strokeOpacity={0.4} />
    {Array.from({ length: 20 }).map((_, i) => (
      <line key={i} x1={460 + i * 52} y1={390} x2={460 + i * 52} y2={472} stroke="#C8C4BE" strokeWidth={0.8} strokeOpacity={0.3} />
    ))}

    {/* Trees / greenery flanking building */}
    {/* Left trees */}
    <ellipse cx={300} cy={680} rx={80} ry={200} fill="#8A9080" fillOpacity={0.7} />
    <ellipse cx={200} cy={720} rx={60} ry={160} fill="#7A8070" fillOpacity={0.6} />
    <rect x={288} y={820} width={24} height={60} fill="#6A6458" />
    {/* Right trees */}
    <ellipse cx={1620} cy={680} rx={80} ry={200} fill="#8A9080" fillOpacity={0.7} />
    <ellipse cx={1740} cy={700} rx={70} ry={180} fill="#7A8070" fillOpacity={0.6} />
    <rect x={1608} y={820} width={24} height={60} fill="#6A6458" />

    {/* Foreground landscaping */}
    <ellipse cx={600} cy={860} rx={100} ry={24} fill="#9A9888" fillOpacity={0.5} />
    <ellipse cx={1320} cy={855} rx={80} ry={20} fill="#9A9888" fillOpacity={0.5} />

    {/* Light/shadow on building */}
    <linearGradient id="bldShadow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#2A2A28" stopOpacity={0.12} />
      <stop offset="40%" stopColor="transparent" />
      <stop offset="100%" stopColor="#2A2A28" stopOpacity={0.08} />
    </linearGradient>
    <rect x={420} y={200} width={1080} height={660} fill="url(#bldShadow)" />

    {/* Bottom vignette */}
    <linearGradient id="botV" x1="0" y1="0" x2="0" y2="1">
      <stop offset="75%" stopColor="transparent" />
      <stop offset="100%" stopColor="#2A2A28" stopOpacity={0.3} />
    </linearGradient>
    <rect width="1920" height="1080" fill="url(#botV)" />

    {/* Overall warm tone overlay */}
    <rect width="1920" height="1080" fill="#D8C8A0" fillOpacity={0.06} />
  </svg>
);
