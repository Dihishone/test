import { staticFile } from 'remotion';

export const ASSETS = {
  beat01: staticFile('gusshaus/beat-01-hook.png'),
  beat02: staticFile('gusshaus/beat-02-problem.png'),
  beat03: staticFile('gusshaus/beat-03-stakes.png'),
  beat04: staticFile('gusshaus/beat-04-bridge.png'),
  beat05: staticFile('gusshaus/beat-05-solution.png'),
  beat06: staticFile('gusshaus/beat-06-mechanism.png'),
  beat07: staticFile('gusshaus/beat-07-proof.png'),
  beat08: staticFile('gusshaus/beat-08-cta.png'),
} as const;
