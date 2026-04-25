import { Easing, interpolate } from "remotion";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

/** Slow cinematic scale — eased, never linear */
export const cinematicPush = (
  frame: number,
  totalFrames: number,
  from = 1.0,
  to = 1.06
): number =>
  interpolate(frame, [0, totalFrames], [from, to], {
    ...clamp,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

/** Opacity + subtle Y lift — editorial entrance */
export const editorialFade = (
  frame: number,
  start: number,
  duration = 24
): { opacity: number; transform: string } => {
  const opacity = interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.quad),
  });
  const y = interpolate(frame, [start, start + duration], [12, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return { opacity, transform: `translateY(${y}px)` };
};

/**
 * Mask reveal using clip-path inset.
 * direction "up"    → content slides up into view (bottom clip moves up)
 * direction "right" → content wipes left-to-right
 */
export const maskReveal = (
  frame: number,
  start: number,
  duration = 26,
  direction: "up" | "right" = "up"
): string => {
  const pct = interpolate(frame, [start, start + duration], [100, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return direction === "up"
    ? `inset(${pct}% -4px 0 -4px)`
    : `inset(-4px ${pct}% -4px -4px)`;
};

/** Scale X from 0 → 1 — for thin line draws */
export const lineDraw = (
  frame: number,
  start: number,
  duration = 28
): number =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

/** Background parallax — image moves slower than overlays */
export const softParallax = (
  frame: number,
  totalFrames: number,
  strength = 20
): number =>
  interpolate(frame, [0, totalFrames], [0, strength], {
    ...clamp,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

/** Translucent warm light pass — 0 → peak → 0 */
export const lightSweep = (
  frame: number,
  start: number,
  duration = 60
): number =>
  interpolate(
    frame,
    [start, start + duration * 0.4, start + duration],
    [0, 0.07, 0],
    { ...clamp, easing: Easing.out(Easing.cubic) }
  );

/** A deliberately quiet window — nothing new enters */
export const luxuryHold = (
  frame: number,
  start: number,
  duration: number
): number =>
  interpolate(
    frame,
    [start, start + 8, start + duration - 8, start + duration],
    [0, 1, 1, 0],
    clamp
  );

/** Numeric count-up — returns rounded integer */
export const countUp = (
  frame: number,
  start: number,
  duration: number,
  target: number
): number =>
  Math.round(
    interpolate(frame, [start, start + duration], [0, target], {
      ...clamp,
      easing: Easing.out(Easing.cubic),
    })
  );

/** Scene-level crossfade opacity */
export const sceneAlpha = (
  frame: number,
  dur: number,
  fadeIn = 20,
  fadeOut = 20
): number =>
  interpolate(frame, [0, fadeIn, dur - fadeOut, dur], [0, 1, 1, 0], clamp);

/** Scene-level fade-in only — holds final frame */
export const sceneAlphaIn = (frame: number, fadeIn = 20): number =>
  interpolate(frame, [0, fadeIn], [0, 1], clamp);
