import React from 'react';
import { Composition } from 'remotion';
import { GusshausPremiumFilm } from './GusshausPremiumFilm';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="GusshausPremiumFilm"
        component={GusshausPremiumFilm}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
