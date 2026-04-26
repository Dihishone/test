import React from "react";
import { COLORS } from "../colors";

interface Props {
  showLabel1?: boolean;
  showLabel2?: boolean;
  showLabel3?: boolean;
}

// Three disconnected "islands" — visual metaphor for fragmented responsibility
export const FragmentationVisual: React.FC<Props> = ({
  showLabel1 = true,
  showLabel2 = true,
  showLabel3 = true,
}) => (
  <svg
    width="1920"
    height="1080"
    viewBox="0 0 1920 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", inset: 0 }}
  >
    <rect width="1920" height="1080" fill="#3A3835" />

    {/* Subtle background grid */}
    {Array.from({ length: 16 }).map((_, i) => (
      <line key={`h${i}`} x1={0} y1={68 * i} x2={1920} y2={68 * i} stroke="#45423F" strokeWidth={0.4} />
    ))}

    {/* Island 1 — Planer */}
    {showLabel1 && (
      <g>
        <rect x={160} y={280} width={380} height={420} rx={8} fill="#2A2725" stroke="#909090" strokeWidth={1.5} strokeOpacity={0.6} />
        {/* Floor plan inside */}
        <rect x={190} y={320} width={160} height={120} stroke="#D8D4CE" strokeOpacity={0.25} strokeWidth={1} fill="none" />
        <line x1={270} y1={320} x2={270} y2={440} stroke="#D8D4CE" strokeOpacity={0.15} strokeWidth={0.8} />
        <line x1={190} y1={380} x2={350} y2={380} stroke="#D8D4CE" strokeOpacity={0.15} strokeWidth={0.8} />
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={i} x1={380} y1={320 + i * 36} x2={520} y2={320 + i * 36} stroke="#D8D4CE" strokeOpacity={0.12} strokeWidth={0.8} />
        ))}
        <text x={350} y={490} textAnchor="middle" fontFamily="Georgia, serif" fontSize={18} fill="#909090" fillOpacity={0.7} letterSpacing="2">PLANUNG</text>
        {/* Person icon */}
        <circle cx={350} cy={560} r={22} fill="#909090" fillOpacity={0.5} />
        <ellipse cx={350} cy={598} rx={34} ry={16} fill="#909090" fillOpacity={0.35} />
        {/* Scope label */}
        <text x={350} y={650} textAnchor="middle" fontFamily="Georgia, serif" fontSize={13} fill="#7BA0A6" letterSpacing="1.5">NUR ENTWURF</text>
      </g>
    )}

    {/* Island 2 — Bauleitung */}
    {showLabel2 && (
      <g>
        <rect x={770} y={200} width={380} height={480} rx={8} fill="#2A2725" stroke="#909090" strokeWidth={1.5} strokeOpacity={0.6} />
        {/* Building blocks inside */}
        <rect x={810} y={240} width={300} height={160} rx={3} fill="#35322F" stroke="#555250" strokeWidth={1} />
        {Array.from({ length: 5 }).map((_, i) => (
          <rect key={i} x={820 + i * 56} y={260} width={42} height={120} rx={2} fill="#3E3B38" stroke="#555250" strokeWidth={0.8} />
        ))}
        {/* Crane suggestion */}
        <line x1={960} y1={240} x2={960} y2={140} stroke="#555250" strokeWidth={2} />
        <line x1={960} y1={145} x2={1060} y2={145} stroke="#555250" strokeWidth={1.5} />
        <line x1={1060} y1={145} x2={1060} y2={220} stroke="#555250" strokeWidth={1} strokeDasharray="4 3" />
        <text x={960} y={440} textAnchor="middle" fontFamily="Georgia, serif" fontSize={18} fill="#909090" fillOpacity={0.7} letterSpacing="2">BAULEITUNG</text>
        <circle cx={960} cy={520} r={22} fill="#909090" fillOpacity={0.5} />
        <ellipse cx={960} cy={558} rx={34} ry={16} fill="#909090" fillOpacity={0.35} />
        <text x={960} y={620} textAnchor="middle" fontFamily="Georgia, serif" fontSize={13} fill="#7BA0A6" letterSpacing="1.5">NUR AUSFÜHRUNG</text>
      </g>
    )}

    {/* Island 3 — Koordination (missing / question mark) */}
    {showLabel3 && (
      <g>
        <rect x={1380} y={310} width={380} height={400} rx={8} fill="#2A2725" stroke="#8C1A7E" strokeWidth={1.5} strokeOpacity={0.5} strokeDasharray="8 5" />
        {/* Empty / void inside */}
        <text x={1570} y={470} textAnchor="middle" fontFamily="Georgia, serif" fontSize={96} fill="#8C1A7E" fillOpacity={0.3}>?</text>
        <text x={1570} y={560} textAnchor="middle" fontFamily="Georgia, serif" fontSize={18} fill="#909090" fillOpacity={0.7} letterSpacing="2">KOORDINATION</text>
        <text x={1570} y={610} textAnchor="middle" fontFamily="Georgia, serif" fontSize={13} fill="#8C1A7E" fillOpacity={0.8} letterSpacing="1.5">ÜBERNIMMT KEINER</text>
      </g>
    )}

    {/* Disconnecting gaps — visual tension lines */}
    {showLabel1 && showLabel2 && (
      <g>
        <line x1={540} y1={490} x2={770} y2={440} stroke="#555250" strokeWidth={1} strokeDasharray="6 8" strokeOpacity={0.5} />
        <text x={655} y={480} textAnchor="middle" fontFamily="Georgia, serif" fontSize={12} fill="#555250" fillOpacity={0.8} transform="rotate(-8 655 480)">keine Übergabe</text>
      </g>
    )}
    {showLabel2 && showLabel3 && (
      <g>
        <line x1={1150} y1={440} x2={1380} y2={490} stroke="#555250" strokeWidth={1} strokeDasharray="6 8" strokeOpacity={0.5} />
        <text x={1265} y={478} textAnchor="middle" fontFamily="Georgia, serif" fontSize={12} fill="#555250" fillOpacity={0.8} transform="rotate(8 1265 478)">kein Ansprechpartner</text>
      </g>
    )}

    {/* Vignette */}
    <radialGradient id="vigF" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stopColor="transparent" />
      <stop offset="100%" stopColor="#1A1916" stopOpacity={0.6} />
    </radialGradient>
    <rect width="1920" height="1080" fill="url(#vigF)" />
  </svg>
);
