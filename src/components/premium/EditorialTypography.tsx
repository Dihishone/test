import React, { CSSProperties } from 'react';
import { interpolate, Easing } from 'remotion';

interface TextRevealProps {
  frame: number;
  start: number;
  duration?: number;
  style?: CSSProperties;
  children: React.ReactNode;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  frame, start, duration = 22, style, children,
}) => {
  const p = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * 14}px)`, ...style }}>
      {children}
    </div>
  );
};

interface WordRevealProps {
  frame: number;
  start: number;
  text: string;
  stagger?: number;
  style?: CSSProperties;
  wordStyle?: CSSProperties;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  frame, start, text, stagger = 5, style, wordStyle,
}) => {
  const words = text.split(' ');
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.28em', rowGap: 0, ...style }}>
      {words.map((word, i) => {
        const ws = start + i * stagger;
        const p = interpolate(frame, [ws, ws + 20], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        });
        return (
          <span
            key={i}
            style={{ opacity: p, display: 'inline-block', transform: `translateY(${(1 - p) * 10}px)`, ...wordStyle }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

interface TrackedRevealProps {
  frame: number;
  start: number;
  text: string;
  style?: CSSProperties;
}

export const TrackedReveal: React.FC<TrackedRevealProps> = ({ frame, start, text, style }) => {
  const opacity = interpolate(frame, [start, start + 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  return <div style={{ opacity, ...style }}>{text}</div>;
};

interface RuleRevealProps {
  frame: number;
  start: number;
  width?: number;
  style?: CSSProperties;
}

export const RuleReveal: React.FC<RuleRevealProps> = ({ frame, start, width = 420, style }) => {
  const p = interpolate(frame, [start, start + 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{
      width: `${p * width}px`,
      height: '1px',
      background: 'rgba(196,169,109,0.38)',
      ...style,
    }} />
  );
};
