import React from "react";
import { Composition } from "remotion";
import { GusshausExplainer } from "./GusshausExplainer";

export const Root: React.FC = () => {
  return (
    <Composition
      id="GusshausExplainer"
      component={GusshausExplainer}
      durationInFrames={1800}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
