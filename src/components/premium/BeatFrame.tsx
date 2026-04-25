import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COPY, STAKEHOLDERS, EDGES } from '../../gusshausPremiumData';
import { ASSETS } from '../../gusshausPremiumAssets';
import {
  fadeIn, liftIn, drawProgress, nodeOpacity, edgeOpacity,
} from '../../gusshausPremiumMotion';
import {
  TextReveal, WordReveal, TrackedReveal, RuleReveal,
} from './EditorialTypography';
import { PhotoBackground } from './PhotoBackground';

// ─── Beat 1: Hook ────────────────────────────────────────────────────────────

export const BeatHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { brand, tagline, subtitle } = COPY.hook;

  const tag1 = liftIn(frame, 42);
  const tag2 = liftIn(frame, 58);
  const sub  = liftIn(frame, 108);
  const screenFade = fadeIn(frame, 0, 10);

  return (
    <AbsoluteFill style={{ opacity: screenFade }}>
      {/* Aerial people photo — right side visible, dark gradient left for text */}
      <PhotoBackground
        src={ASSETS.beat01}
        frame={frame}
        beatDuration={150}
        objectPosition="65% center"
        scaleFrom={1.0}
        scaleTo={1.035}
        overlay="linear-gradient(100deg, rgba(11,9,8,0.95) 0%, rgba(11,9,8,0.88) 36%, rgba(11,9,8,0.55) 62%, rgba(11,9,8,0.28) 100%)"
      />
      {/* Brand wordmark — top-left */}
      <TrackedReveal
        frame={frame} start={12} text={brand}
        style={{
          position: 'absolute',
          top: 120, left: 120,
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: '0.46em',
          textTransform: 'uppercase',
          color: '#C4A96D',
        }}
      />

      <RuleReveal frame={frame} start={28} style={{ position: 'absolute', top: 154, left: 120 }} />

      {/* Display headline stacked — "Volle" / "Verantwortung." */}
      <div style={{ position: 'absolute', left: 120, top: 340 }}>
        <div style={{
          opacity: tag1.opacity,
          transform: `translateY(${tag1.translateY}px)`,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 148,
          fontWeight: 300,
          lineHeight: 1.0,
          letterSpacing: '-0.01em',
          color: '#F0EBE1',
        }}>
          Volle
        </div>
        <div style={{
          opacity: tag2.opacity,
          transform: `translateY(${tag2.translateY}px)`,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 148,
          fontWeight: 300,
          lineHeight: 1.0,
          letterSpacing: '-0.01em',
          color: '#F0EBE1',
        }}>
          Verantwortung.
        </div>
      </div>

      {/* Subtitle */}
      <div style={{
        position: 'absolute',
        left: 122,
        bottom: 172,
        opacity: sub.opacity,
        transform: `translateY(${sub.translateY}px)`,
        fontFamily: "'Helvetica Neue', sans-serif",
        fontSize: 26,
        fontWeight: 300,
        color: 'rgba(240,235,225,0.55)',
      }}>
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};

// ─── Beat 2: Problem ─────────────────────────────────────────────────────────

const StakeholderNetwork: React.FC<{ frame: number }> = ({ frame }) => {
  const nodes = STAKEHOLDERS;
  const edges = EDGES;

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* Edges */}
      {edges.map(([a, b], i) => {
        const na = nodeMap[a];
        const nb = nodeMap[b];
        if (!na || !nb) return null;
        const op = edgeOpacity(frame, na.delay, nb.delay);
        return (
          <line
            key={i}
            x1={na.x} y1={na.y}
            x2={nb.x} y2={nb.y}
            stroke={`rgba(196,169,109,${op})`}
            strokeWidth="0.8"
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const op = nodeOpacity(frame, node.delay);
        return (
          <g key={node.id} opacity={op}>
            <circle cx={node.x} cy={node.y} r={3.5} fill="#C4A96D" />
            <circle cx={node.x} cy={node.y} r={8} fill="rgba(196,169,109,0.08)" />
            <text
              x={node.x}
              y={node.y - 14}
              textAnchor="middle"
              fill="rgba(240,235,225,0.6)"
              fontSize={11}
              fontFamily="'Helvetica Neue', Helvetica, sans-serif"
              letterSpacing="1.5"
            >
              {node.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const BeatProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { headline, lines } = COPY.problem;
  const screenFade = fadeIn(frame, 0, 12);

  return (
    <AbsoluteFill style={{ opacity: screenFade }}>
      {/* Blueprint paper texture — architectural drawings as dark background */}
      <PhotoBackground
        src={ASSETS.beat02}
        frame={frame}
        beatDuration={240}
        objectPosition="center 30%"
        scaleFrom={1.03}
        scaleTo={1.0}
        overlay="linear-gradient(100deg, rgba(11,9,8,0.90) 0%, rgba(11,9,8,0.78) 38%, rgba(11,9,8,0.72) 100%)"
      />
      {/* Network fills canvas at low opacity */}
      <div style={{ opacity: 0.72 }}>
        <StakeholderNetwork frame={frame} />
      </div>

      {/* Dark gradient on left to make text legible */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, rgba(11,9,8,0.88) 0%, rgba(11,9,8,0.6) 52%, rgba(11,9,8,0.0) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Text block — left side */}
      <div style={{ position: 'absolute', left: 120, top: 240 }}>
        <TextReveal frame={frame} start={20} style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 80,
          fontWeight: 300,
          lineHeight: 1.0,
          letterSpacing: '-0.005em',
          color: '#F0EBE1',
          marginBottom: 36,
        }}>
          {headline}
        </TextReveal>

        {lines.map((line, i) => {
          const anim = liftIn(frame, 52 + i * 28);
          return (
            <div key={i} style={{
              opacity: anim.opacity,
              transform: `translateY(${anim.translateY}px)`,
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: i === 2 ? 22 : 24,
              fontWeight: 300,
              lineHeight: 1.6,
              color: i === 2 ? 'rgba(240,235,225,0.38)' : 'rgba(240,235,225,0.55)',
              marginBottom: i === 2 ? 0 : 14,
              whiteSpace: 'pre-line',
              maxWidth: 680,
            }}>
              {line}
            </div>
          );
        })}
      </div>

      {/* Brand mark top-left */}
      <TrackedReveal
        frame={frame} start={8} text="GUSSHAUS"
        style={{
          position: 'absolute', top: 120, left: 120,
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 13, fontWeight: 400,
          letterSpacing: '0.46em', textTransform: 'uppercase',
          color: 'rgba(196,169,109,0.55)',
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Beat 3: Stakes ──────────────────────────────────────────────────────────

export const BeatStakes: React.FC = () => {
  const frame = useCurrentFrame();
  const { intro, risks, close } = COPY.stakes;
  const screenFade = fadeIn(frame, 0, 12);

  return (
    <AbsoluteFill style={{ opacity: screenFade }}>
      {/* Premium building at dusk — behind the three risk columns */}
      <PhotoBackground
        src={ASSETS.beat03}
        frame={frame}
        beatDuration={180}
        objectPosition="70% center"
        scaleFrom={1.0}
        scaleTo={1.04}
        overlay="linear-gradient(180deg, rgba(11,9,8,0.72) 0%, rgba(11,9,8,0.58) 50%, rgba(11,9,8,0.68) 100%)"
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        padding: '120px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {/* Intro label */}
        <TextReveal frame={frame} start={14} style={{
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color: '#C4A96D',
          marginBottom: 48,
        }}>
          {intro}
        </TextReveal>

        {/* Three risk columns */}
        <div style={{ display: 'flex', gap: 2 }}>
          {risks.map(({ label, detail }, i) => {
            const colStart = 28 + i * 22;
            const clipP = interpolate(frame, [colStart, colStart + 30], [0, 100], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const textAnim = liftIn(frame, colStart + 18);

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: '48px 40px',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(240,235,225,0.08)',
                  boxSizing: 'border-box',
                  clipPath: `inset(0 ${(100 - clipP).toFixed(1)}% 0 0)`,
                }}
              >
                <div style={{
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#C4A96D',
                  marginBottom: 24,
                  opacity: textAnim.opacity,
                }}>
                  {`0${i + 1}`}
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 68,
                  fontWeight: 300,
                  lineHeight: 1.0,
                  color: '#F0EBE1',
                  marginBottom: 24,
                  opacity: textAnim.opacity,
                  transform: `translateY(${textAnim.translateY}px)`,
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: 18,
                  fontWeight: 300,
                  color: 'rgba(240,235,225,0.38)',
                  lineHeight: 1.6,
                  opacity: textAnim.opacity,
                }}>
                  {detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing line */}
        <TextReveal frame={frame} start={110} style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 34,
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'rgba(240,235,225,0.42)',
          marginTop: 52,
        }}>
          {close}
        </TextReveal>
      </div>

      <TrackedReveal
        frame={frame} start={8} text="GUSSHAUS"
        style={{
          position: 'absolute', top: 120, left: 120,
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 13, fontWeight: 400,
          letterSpacing: '0.46em', textTransform: 'uppercase',
          color: 'rgba(196,169,109,0.55)',
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Beat 4: Bridge ──────────────────────────────────────────────────────────

const ConvergenceVisual: React.FC<{ frame: number }> = ({ frame }) => {
  // Lines converging toward a single central point
  const spokes = [
    { angle: 30  },
    { angle: 70  },
    { angle: 110 },
    { angle: 155 },
    { angle: 200 },
    { angle: 250 },
    { angle: 300 },
    { angle: 340 },
  ];

  const cx = 1440;
  const cy = 540;
  const len = 600;

  return (
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
      {spokes.map(({ angle }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = cx + Math.cos(rad) * len;
        const y1 = cy + Math.sin(rad) * len;
        const converge = interpolate(frame, [i * 5, i * 5 + 50], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const x2 = x1 + (cx - x1) * converge;
        const y2 = y1 + (cy - y1) * converge;
        const op = interpolate(frame, [i * 5, i * 5 + 20], [0, 0.18], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <line
            key={i}
            x1={x2} y1={y2}
            x2={cx} y2={cy}
            stroke={`rgba(196,169,109,${op})`}
            strokeWidth="0.7"
          />
        );
      })}
      {/* Centre node */}
      <circle
        cx={cx} cy={cy} r={4}
        fill="#C4A96D"
        opacity={fadeIn(frame, 60, 20)}
      />
      <circle
        cx={cx} cy={cy} r={16}
        fill="rgba(196,169,109,0.07)"
        opacity={fadeIn(frame, 60, 20)}
      />
    </svg>
  );
};

export const BeatBridge: React.FC = () => {
  const frame = useCurrentFrame();
  const { question } = COPY.bridge;
  const screenFade = fadeIn(frame, 0, 12);

  return (
    <AbsoluteFill style={{ opacity: screenFade }}>
      {/* Minimalist interior + mountain view — most visible of all beats */}
      <PhotoBackground
        src={ASSETS.beat04}
        frame={frame}
        beatDuration={180}
        objectPosition="60% center"
        scaleFrom={1.0}
        scaleTo={1.042}
        overlay="linear-gradient(95deg, rgba(11,9,8,0.92) 0%, rgba(11,9,8,0.65) 42%, rgba(11,9,8,0.18) 100%)"
      />
      <ConvergenceVisual frame={frame} />

      {/* Gradient mask on right so convergence is background only */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(11,9,8,0.0) 40%, rgba(11,9,8,0.45) 100%)',
        pointerEvents: 'none',
      }} />

      {/* The question — centred in left/centre zone */}
      <div style={{
        position: 'absolute',
        left: 120,
        top: '50%',
        transform: 'translateY(-50%)',
        maxWidth: 860,
      }}>
        <TextReveal frame={frame} start={38} duration={40} style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 88,
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.22,
          letterSpacing: '-0.01em',
          color: '#F0EBE1',
          whiteSpace: 'pre-line',
        }}>
          {question}
        </TextReveal>
      </div>

      <TrackedReveal
        frame={frame} start={8} text="GUSSHAUS"
        style={{
          position: 'absolute', top: 120, left: 120,
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 13, fontWeight: 400,
          letterSpacing: '0.46em', textTransform: 'uppercase',
          color: 'rgba(196,169,109,0.55)',
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Beat 5: Solution ────────────────────────────────────────────────────────

const SolutionNode: React.FC<{ frame: number }> = ({ frame }) => {
  const nodeSpokes = [0, 45, 90, 135, 180, 225, 270, 315];
  const cx = 1460;
  const cy = 540;

  return (
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
      {nodeSpokes.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const r = 240;
        const x2 = cx + Math.cos(rad) * r;
        const y2 = cy + Math.sin(rad) * r;
        const op = interpolate(frame, [30 + i * 8, 60 + i * 8], [0, 0.22], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const endNodeOp = interpolate(frame, [40 + i * 8, 65 + i * 8], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={`rgba(196,169,109,${op})`} strokeWidth="0.8" />
            <circle cx={x2} cy={y2} r={3} fill="#C4A96D" opacity={endNodeOp * 0.7} />
          </g>
        );
      })}
      {/* Central Gusshaus node */}
      <circle cx={cx} cy={cy} r={22} fill="rgba(196,169,109,0.08)" opacity={fadeIn(frame, 20, 18)} />
      <circle cx={cx} cy={cy} r={8}  fill="#C4A96D" opacity={fadeIn(frame, 20, 18)} />
      {/* Label */}
      <text
        x={cx} y={cy + 50}
        textAnchor="middle"
        fill="rgba(196,169,109,0.7)"
        fontSize={10}
        fontFamily="'Helvetica Neue', Helvetica, sans-serif"
        letterSpacing="2"
        opacity={fadeIn(frame, 40, 20)}
      >
        GUSSHAUS
      </text>
    </svg>
  );
};

export const BeatSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { brand, headline, sub } = COPY.solution;
  const screenFade = fadeIn(frame, 0, 12);

  const h1 = liftIn(frame, 26);
  const h2 = liftIn(frame, 44);
  const subAnim = liftIn(frame, 90);

  return (
    <AbsoluteFill style={{ opacity: screenFade }}>
      {/* Founders photo — subtly visible right side, strong dark left for text */}
      <PhotoBackground
        src={ASSETS.beat05}
        frame={frame}
        beatDuration={240}
        objectPosition="70% center"
        scaleFrom={1.02}
        scaleTo={1.0}
        overlay="linear-gradient(95deg, rgba(11,9,8,0.95) 0%, rgba(11,9,8,0.82) 48%, rgba(11,9,8,0.62) 100%)"
      />
      <SolutionNode frame={frame} />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(11,9,8,0.6) 0%, rgba(11,9,8,0.25) 58%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Brand wordmark */}
      <TrackedReveal
        frame={frame} start={12} text={brand}
        style={{
          position: 'absolute', top: 120, left: 120,
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 13, fontWeight: 400,
          letterSpacing: '0.46em', textTransform: 'uppercase',
          color: '#C4A96D',
        }}
      />

      <RuleReveal frame={frame} start={20} style={{ position: 'absolute', top: 154, left: 120 }} />

      {/* Headline — stacked two lines */}
      <div style={{ position: 'absolute', left: 120, top: 320 }}>
        {['Ein Büro.', 'Volle Verantwortung.'].map((line, i) => {
          const a = liftIn(frame, 26 + i * 18);
          return (
            <div key={i} style={{
              opacity: a.opacity,
              transform: `translateY(${a.translateY}px)`,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 130,
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              color: '#F0EBE1',
            }}>
              {line}
            </div>
          );
        })}

        {/* Sub */}
        <div style={{
          marginTop: 44,
          opacity: subAnim.opacity,
          transform: `translateY(${subAnim.translateY}px)`,
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 26,
          fontWeight: 300,
          lineHeight: 1.6,
          color: 'rgba(240,235,225,0.55)',
          whiteSpace: 'pre-line',
          maxWidth: 780,
        }}>
          {sub}
        </div>
      </div>
    </AbsoluteFill>
  );
};
