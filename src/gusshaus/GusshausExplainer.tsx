import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  FPS, DURATION,
  B1_START, B1_DUR,
  B2_START, B2_DUR,
  B3_START, B3_DUR,
  B4_START, B4_DUR,
  B5_START, B5_DUR,
  B6_START, B6_DUR,
  B7_START, B7_DUR,
  B8_START, B8_DUR,
} from "./timing";
import { B1Hook } from "./scenes/B1Hook";
import { B2Problem } from "./scenes/B2Problem";
import { B3Stakes } from "./scenes/B3Stakes";
import { B4Bridge } from "./scenes/B4Bridge";
import { B5Solution } from "./scenes/B5Solution";
import { B6Mechanism } from "./scenes/B6Mechanism";
import { B7Proof } from "./scenes/B7Proof";
import { B8CTA } from "./scenes/B8CTA";

// Font loaded via delayRender in font.ts — import triggers registration
import "./font";

// Cross-fade overlap in frames
const OVERLAP = 6;

export const GusshausExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#2A2A28" }}>
      <Sequence from={B1_START} durationInFrames={B1_DUR + OVERLAP} premountFor={30}>
        <B1Hook />
      </Sequence>

      <Sequence from={B2_START - OVERLAP} durationInFrames={B2_DUR + OVERLAP * 2} premountFor={30}>
        <B2Problem />
      </Sequence>

      <Sequence from={B3_START - OVERLAP} durationInFrames={B3_DUR + OVERLAP * 2} premountFor={30}>
        <B3Stakes />
      </Sequence>

      <Sequence from={B4_START - OVERLAP} durationInFrames={B4_DUR + OVERLAP * 2} premountFor={30}>
        <B4Bridge />
      </Sequence>

      <Sequence from={B5_START - OVERLAP} durationInFrames={B5_DUR + OVERLAP * 2} premountFor={30}>
        <B5Solution />
      </Sequence>

      <Sequence from={B6_START - OVERLAP} durationInFrames={B6_DUR + OVERLAP * 2} premountFor={30}>
        <B6Mechanism />
      </Sequence>

      <Sequence from={B7_START - OVERLAP} durationInFrames={B7_DUR + OVERLAP * 2} premountFor={30}>
        <B7Proof />
      </Sequence>

      <Sequence from={B8_START - OVERLAP} durationInFrames={B8_DUR + OVERLAP} premountFor={30}>
        <B8CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
