import React from 'react';
import { interpolate, Easing } from 'remotion';

interface PhotoBackgroundProps {
  src: string;
  frame: number;
  beatDuration: number;
  overlay: string;
  objectPosition?: string;
  scaleFrom?: number;
  scaleTo?: number;
  fadeInDuration?: number;
}

export const PhotoBackground: React.FC<PhotoBackgroundProps> = ({
  src,
  frame,
  beatDuration,
  overlay,
  objectPosition = 'center center',
  scaleFrom = 1.0,
  scaleTo = 1.04,
  fadeInDuration = 22,
}) => {
  const opacity = interpolate(frame, [0, fadeInDuration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const scale = interpolate(frame, [0, beatDuration], [scaleFrom, scaleTo], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      <img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          display: 'block',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: overlay }} />
    </div>
  );
};
