import { staticFile } from "remotion";

export const ASSETS = {
  hook: staticFile("gusshaus/beat-01-hook.png"),
  problem: staticFile("gusshaus/beat-02-problem.png"),
  stakes: staticFile("gusshaus/beat-03-stakes.png"),
  bridge: staticFile("gusshaus/beat-04-bridge.png"),
  solution: staticFile("gusshaus/beat-05-solution.png"),
  mechanism: staticFile("gusshaus/beat-06-mechanism.png"),
  proof: staticFile("gusshaus/beat-07-proof.png"),
  cta: staticFile("gusshaus/beat-08-cta.png"),
} as const;
