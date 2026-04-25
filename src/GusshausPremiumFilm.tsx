import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';

import { BEATS } from './gusshausPremiumData';
import { MotionBackground } from './components/premium/MotionBackground';
import { ArchitecturalOverlay } from './components/premium/ArchitecturalOverlay';
import {
  BeatHook,
  BeatProblem,
  BeatStakes,
  BeatBridge,
  BeatSolution,
} from './components/premium/BeatFrame';
import { MechanismSystem } from './components/premium/MechanismSystem';
import { ProofMoment } from './components/premium/ProofMoment';
import { CTAInvitation } from './components/premium/CTAInvitation';

import './styles/gusshausPremium.css';

function dur(beat: { start: number; end: number }): number {
  return beat.end - beat.start;
}

export const GusshausPremiumFilm: React.FC = () => {
  return (
    <AbsoluteFill className="gph-root">
      {/* ── Persistent layers (run for full 1800 frames) ── */}
      <MotionBackground />
      <ArchitecturalOverlay />

      {/* ── Beat 1 · Hook · 0–150 ── */}
      <Sequence from={BEATS.HOOK.start} durationInFrames={dur(BEATS.HOOK)}>
        <BeatHook />
      </Sequence>

      {/* ── Beat 2 · Problem · 150–390 ── */}
      <Sequence from={BEATS.PROBLEM.start} durationInFrames={dur(BEATS.PROBLEM)}>
        <BeatProblem />
      </Sequence>

      {/* ── Beat 3 · Stakes · 390–570 ── */}
      <Sequence from={BEATS.STAKES.start} durationInFrames={dur(BEATS.STAKES)}>
        <BeatStakes />
      </Sequence>

      {/* ── Beat 4 · Bridge · 570–750 ── */}
      <Sequence from={BEATS.BRIDGE.start} durationInFrames={dur(BEATS.BRIDGE)}>
        <BeatBridge />
      </Sequence>

      {/* ── Beat 5 · Solution · 750–990 ── */}
      <Sequence from={BEATS.SOLUTION.start} durationInFrames={dur(BEATS.SOLUTION)}>
        <BeatSolution />
      </Sequence>

      {/* ── Beat 6 · Mechanism · 990–1260 ── */}
      <Sequence from={BEATS.MECHANISM.start} durationInFrames={dur(BEATS.MECHANISM)}>
        <MechanismSystem />
      </Sequence>

      {/* ── Beat 7 · Proof · 1260–1470 ── */}
      <Sequence from={BEATS.PROOF.start} durationInFrames={dur(BEATS.PROOF)}>
        <ProofMoment />
      </Sequence>

      {/* ── Beat 8 · CTA · 1470–1800 ── */}
      <Sequence from={BEATS.CTA.start} durationInFrames={dur(BEATS.CTA)}>
        <CTAInvitation />
      </Sequence>
    </AbsoluteFill>
  );
};
