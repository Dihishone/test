import React from "react";
import { COLORS } from "../colors";

// Top-down architectural planning scene — people around a table with plans
export const PlanningScene: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <svg
    width="1920"
    height="1080"
    viewBox="0 0 1920 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", inset: 0, opacity }}
  >
    {/* Background */}
    <rect width="1920" height="1080" fill="#3A3835" />

    {/* Subtle floor grid */}
    {Array.from({ length: 20 }).map((_, i) => (
      <line key={`h${i}`} x1={0} y1={54 * i} x2={1920} y2={54 * i} stroke="#4A4845" strokeWidth={0.5} />
    ))}
    {Array.from({ length: 36 }).map((_, i) => (
      <line key={`v${i}`} x1={54 * i} y1={0} x2={54 * i} y2={1080} stroke="#4A4845" strokeWidth={0.5} />
    ))}

    {/* Large conference table — top-down */}
    <rect x={580} y={340} width={760} height={400} rx={12} fill="#2A2725" stroke="#555250" strokeWidth={2} />
    {/* Table wood grain lines */}
    {Array.from({ length: 6 }).map((_, i) => (
      <line key={`g${i}`} x1={580} y1={360 + i * 60} x2={1340} y2={360 + i * 60} stroke="#302E2C" strokeWidth={1} />
    ))}

    {/* Plans/drawings on table */}
    <rect x={630} y={380} width={340} height={240} rx={4} fill="#D8D4CE" fillOpacity={0.12} stroke="#D8D4CE" strokeOpacity={0.3} strokeWidth={1} />
    {/* Plan lines */}
    {Array.from({ length: 5 }).map((_, i) => (
      <line key={`pl${i}`} x1={645} y1={400 + i * 40} x2={955} y2={400 + i * 40} stroke="#D8D4CE" strokeOpacity={0.25} strokeWidth={0.8} />
    ))}
    <rect x={645} y={400} width={140} height={100} stroke="#D8D4CE" strokeOpacity={0.3} strokeWidth={1} fill="none" />
    <line x1={645} y1={450} x2={785} y2={450} stroke="#D8D4CE" strokeOpacity={0.2} strokeWidth={0.8} />
    <line x1={715} y1={400} x2={715} y2={500} stroke="#D8D4CE" strokeOpacity={0.2} strokeWidth={0.8} />

    <rect x={990} y={400} width={300} height={180} rx={3} fill="#D8D4CE" fillOpacity={0.08} stroke="#D8D4CE" strokeOpacity={0.2} strokeWidth={1} />
    {Array.from({ length: 6 }).map((_, i) => (
      <line key={`rl${i}`} x1={1005} y1={415 + i * 26} x2={1275} y2={415 + i * 26} stroke="#D8D4CE" strokeOpacity={0.15} strokeWidth={0.8} />
    ))}

    {/* Figures around table — top-down silhouettes */}
    {/* Top side — 3 people */}
    {[680, 960, 1240].map((x, i) => (
      <g key={`top${i}`}>
        <circle cx={x} cy={300} r={28} fill="#909090" fillOpacity={0.7} />
        <ellipse cx={x} cy={338} rx={38} ry={20} fill="#909090" fillOpacity={0.5} />
      </g>
    ))}
    {/* Bottom side — 3 people */}
    {[680, 960, 1240].map((x, i) => (
      <g key={`bot${i}`}>
        <circle cx={x} cy={780} r={28} fill="#909090" fillOpacity={0.7} />
        <ellipse cx={x} cy={742} rx={38} ry={20} fill="#909090" fillOpacity={0.5} />
      </g>
    ))}
    {/* Left side — 1 person */}
    <circle cx={520} cy={540} r={28} fill="#909090" fillOpacity={0.7} />
    <ellipse cx={558} cy={540} rx={20} ry={36} fill="#909090" fillOpacity={0.5} />
    {/* Right side — 2 people */}
    {[480, 620].map((dy, i) => (
      <g key={`rt${i}`}>
        <circle cx={1400} cy={380 + dy} r={28} fill="#909090" fillOpacity={0.7} />
        <ellipse cx={1362} cy={380 + dy} rx={20} ry={36} fill="#909090" fillOpacity={0.5} />
      </g>
    ))}

    {/* Conversation arrows — scattered directions */}
    <path d="M 680 318 Q 720 310 750 310" stroke="#7BA0A6" strokeOpacity={0.4} strokeWidth={1.5} fill="none" markerEnd="url(#arrowTeal)" />
    <path d="M 1240 318 Q 1200 310 1170 310" stroke="#7BA0A6" strokeOpacity={0.4} strokeWidth={1.5} fill="none" />
    <path d="M 680 762 Q 820 800 960 762" stroke="#909090" strokeOpacity={0.3} strokeWidth={1} fill="none" />
    <path d="M 538 520 Q 560 490 600 470" stroke="#D8D4CE" strokeOpacity={0.2} strokeWidth={1} fill="none" />

    {/* Subtle vignette */}
    <radialGradient id="vig" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stopColor="transparent" />
      <stop offset="100%" stopColor="#1A1916" stopOpacity={0.7} />
    </radialGradient>
    <rect width="1920" height="1080" fill="url(#vig)" />
  </svg>
);
