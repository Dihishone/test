# After Effects → Remotion Pattern Translation

> **HyperFrames reference:** For motion fundamentals (easing philosophy, choreography, scene pacing, anti-patterns) see `.claude/skills/hyperframes/references/motion-principles.md`. This file covers only the translation of AE-style intent into Remotion React/TypeScript primitives.
>
> **Remotion skill reference:** For Remotion-specific implementation rules (compositions, sequencing, audio, fonts, captions) see `.claude/skills/remotion/SKILL.md` and the rules in `.claude/skills/remotion/rules/`.

Do not re-implement what those skills cover. This file is the bridge layer.

---

## Core Remotion Primitives (Reference)

| AE Concept | Remotion Equivalent |
|---|---|
| Composition | `<Composition>` in Root.tsx |
| Layer | JSX element inside `<AbsoluteFill>` |
| Keyframe | `interpolate(frame, [f1, f2], [v1, v2])` |
| Ease in/out | `Easing.bezier(x1, y1, x2, y2)` passed to `interpolate` `easing` option |
| Spring | `spring({ frame, fps, config: { damping, stiffness, mass } })` |
| Sequence | `<Sequence from={f} durationInFrames={d}>` |
| Pre-comp | Child `<Composition>` or extracted React component |
| Time remapping | Drive child component via `frame - offset` |

See `.claude/skills/remotion/rules/timing.md` and `animations.md` for full detail.

---

## Pattern Translations

### 1 · Kinetic Type (Word-by-Word Reveal)

**AE-style:** Text animator with Position/Opacity range selector, staggered by character or word
**Remotion approach:**
```tsx
const words = text.split(' ');
words.map((word, i) => {
  const delay = i * 6; // frames between words
  const progress = interpolate(frame, [delay, delay + 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return (
    <span style={{ opacity: progress, transform: `translateY(${(1 - progress) * 20}px)`, display: 'inline-block' }}>
      {word}&nbsp;
    </span>
  );
})
```
**Reusable component:** `<KineticText text={} startFrame={} wordDelay={6} />`
**Performance:** Pure CSS transform + opacity — GPU-accelerated, no layout thrash

---

### 2 · Staggered Card Entrance

**AE-style:** Multiple layers with staggered in-point; each slides + fades from below
**Remotion approach:**
```tsx
cards.map((card, i) => {
  const delay = i * 10;
  const s = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120 } });
  return <Card style={{ opacity: s, transform: `translateY(${(1 - s) * 40}px)` }} />;
})
```
**Reusable component:** `<StaggeredGrid items={[]} itemDelay={10} />`
**Performance:** Springs are computed per-frame; keep card count ≤ 6 to avoid render cost

---

### 3 · Counter / Metric Build

**AE-style:** Expression-driven number property with ease-out to target value
**Remotion approach:**
```tsx
const value = Math.floor(
  interpolate(frame, [buildStart, buildEnd], [0, targetValue], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  })
);
// render: <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value.toLocaleString()}</span>
```
**Reusable component:** `<MetricCounter target={} unit="%" startFrame={} endFrame={} />`
**Performance:** Pure arithmetic per frame — negligible cost

---

### 4 · SVG Path Draw (Stroke Animation)

**AE-style:** Trim Paths effect on shape layer; Start/End properties keyframed
**Remotion approach:**
```tsx
// Measure path length once (hardcode or use ref + useEffect for static paths)
const pathLength = 340;
const progress = interpolate(frame, [drawStart, drawEnd], [0, 1], {
  extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic),
});
// SVG element:
<path strokeDasharray={pathLength} strokeDashoffset={pathLength * (1 - progress)} />
```
**Reusable component:** `<AnimatedPath d={} drawStart={} drawEnd={} />`
**Performance:** SVG stroke animation is GPU-composited; avoid animating `d` attribute (expensive)

---

### 5 · Zoom Punch (Scale + Translate)

**AE-style:** Scale keyframe + position offset to simulate camera push into a layer
**Remotion approach:**
```tsx
const scale = interpolate(frame, [zoomStart, zoomEnd], [1, 2.5], {
  extrapolateRight: 'clamp', easing: Easing.out(Easing.expo),
});
const x = interpolate(frame, [zoomStart, zoomEnd], [0, -targetX], { extrapolateRight: 'clamp' });
const y = interpolate(frame, [zoomStart, zoomEnd], [0, -targetY], { extrapolateRight: 'clamp' });
// Apply to wrapper:
<div style={{ transform: `scale(${scale}) translate(${x}px, ${y}px)`, transformOrigin: 'center center' }}>
```
**Performance:** `transform` is GPU-composited; avoid scaling containers with many DOM children simultaneously

---

### 6 · Wipe / Clip Reveal

**AE-style:** Linear Wipe effect on layer; angle and completion keyframed
**Remotion approach:**
```tsx
const wipeProgress = interpolate(frame, [wipeStart, wipeEnd], [100, 0], {
  extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic),
});
// Right-to-left reveal:
<div style={{ clipPath: `inset(0 ${wipeProgress}% 0 0)` }}>
  {/* revealed content */}
</div>
```
**Reusable component:** `<WipeReveal direction="left" startFrame={} endFrame={} />`
**Performance:** `clip-path` on a single element is composited; avoid on deeply nested DOM trees

---

### 7 · Spring Entrance (Scale from 0)

**AE-style:** Scale keyframe 0% → 110% → 100% with overshoot (elastic ease)
**Remotion approach:**
```tsx
const s = spring({
  frame: frame - delay,
  fps,
  config: { damping: 12, stiffness: 200, mass: 0.8 },
});
<div style={{ transform: `scale(${s})`, opacity: Math.min(s * 2, 1) }}>
```
**Note:** `spring()` naturally produces overshoot when `damping` is low; increase `damping` (18–25) for authoritative entrance, decrease (8–12) for bouncy/playful
**Performance:** One spring per animated element; avoid hundreds of springs simultaneously

---

### 8 · Scene Architecture (Timed Sequences)

**AE-style:** Pre-comps nested in a master timeline with in/out points
**Remotion approach:**
```tsx
// In Root.tsx — timing constants as named exports
export const SCENE_1_START = 0;       // frame
export const SCENE_1_DURATION = 60;   // frames at 30fps = 2s
export const SCENE_2_START = 55;      // overlap for transition
export const SCENE_2_DURATION = 90;

// In composition:
<Sequence from={SCENE_1_START} durationInFrames={SCENE_1_DURATION}>
  <Scene1 />
</Sequence>
<Sequence from={SCENE_2_START} durationInFrames={SCENE_2_DURATION}>
  <Scene2 />
</Sequence>
```
**Convention:** Define all timing constants in a `src/timing.ts` file; never hardcode frame numbers inline
**See:** `.claude/skills/remotion/rules/sequencing.md` for full sequencing patterns

---

### 9 · Ambient Background Motion

**AE-style:** Looping background layer (noise, gradient drift, particle system) behind content
**Remotion approach:**
```tsx
// Slow drift — imperceptible but alive
const drift = interpolate(frame % 300, [0, 300], [0, 10]);
<div style={{
  position: 'absolute', inset: 0,
  background: `radial-gradient(ellipse at ${50 + drift}% ${50 - drift * 0.5}%, #1a1a3e, #0a0a1a)`,
}} />
```
**Rule:** Background motion must be imperceptible at normal viewing speed; if the viewer notices the background, it has failed
**Performance:** CSS gradient animation is cheap; avoid animating `background-image` with image assets

---

### 10 · Particle / Data Flow

**AE-style:** Particle system (CC Particle World, Trapcode Particular) emitting along paths
**Remotion approach:** Precompute particle positions as a data structure; drive via `useCurrentFrame()`
```tsx
const particles = Array.from({ length: 20 }, (_, i) => ({
  phase: i * (Math.PI * 2 / 20),
  speed: 0.5 + (i % 3) * 0.3,
}));
// Per frame:
particles.map(p => {
  const t = ((frame * p.speed + p.phase) % pathLength) / pathLength;
  const { x, y } = getPointOnPath(svgPath, t);
  return <circle cx={x} cy={y} r={3} opacity={0.6} />;
})
```
**Performance:** Keep particle count ≤ 30 for smooth playback in Studio; use `React.memo` on particle container

---

## Timing Architecture Convention

For all 60–90 second B2B videos, define timing in `src/timing.ts`:

```ts
export const FPS = 30;
export const DURATION_FRAMES = 75 * FPS; // 2250 for 75s

// Scene boundaries
export const HOOK_START = 0;
export const HOOK_END = 10 * FPS;
export const AGITATE_START = HOOK_END;
export const AGITATE_END = 25 * FPS;
export const SOLUTION_START = AGITATE_END;
export const SOLUTION_END = 45 * FPS;
export const BENEFITS_START = SOLUTION_END;
export const BENEFITS_END = 65 * FPS;
export const PROOF_START = BENEFITS_END;
export const CTA_START = 72 * FPS;
```
