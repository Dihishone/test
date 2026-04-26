# B2B Video Conception — Motion Principles (Quick Reference)
**Default video length: 60–90 seconds.**

Distilled from `research/video-benchmark-library/motion-pattern-library.md`.
For HyperFrames GSAP choreography fundamentals (easing philosophy, timing as weight, scene pacing) see `.claude/skills/hyperframes/references/motion-principles.md`.
For Remotion implementation (springs, interpolate, sequencing) see `.claude/skills/remotion/rules/animations.md` and `timing.md`.

---

## Motion Principles for 60–90s B2B Video

| Principle | Rule |
|---|---|
| **Voiceover lock** | Every animated element entry is tied to a specific spoken word or audio beat |
| **Fixed stagger** | Elements entering a scene stagger by a fixed interval (80–120ms / 2–4 frames at 30fps) |
| **Stillness first** | Large areas of visual stillness make the moving element command attention |
| **Ease-out authority** | Objects decelerate into final position; avoid symmetrical ease-in-out |
| **Motion economy** | Not everything moves. Reserve motion for emphasis. |
| **No infinite loops** | Ambient loops train viewers to ignore motion; all loops must be finite |
| **One zoom per video** | Zoom-punch used more than once loses hierarchy |
| **Amber motion** | If a non-technical viewer notices the background motion, it's too fast |

## B2B Category Motion Registers

| Buyer / Category | Motion Register | Avoid |
|---|---|---|
| Security / Infra | Controlled, authoritative, dark | Playful bounces, bright colors, consumer-style spring |
| Developer / DevOps | Minimal, precise, micro-animation | Decorative flourishes, character animation |
| Finance / CFO | Metric-build, clean, restrained | Excessive kinetics, ambient animation noise |
| Enterprise SaaS | Confident stagger, typographic motion | Default AE presets, template wipes |
| SMB / HR | Warmer spring, slightly more playful | Cold, dark, over-engineered |

## Motion Pattern Selection by Scene

| Scene Type | Primary Motion Pattern |
|---|---|
| Hook headline | Kinetic Headline Reveal |
| Problem visualization | Data Stream (ambient) + Progressive Disclosure |
| Platform consolidation | Compression / Convergence |
| Product reveal | Spring Entrance + Zoom Into System Layer |
| Benefits list | Staggered Card Entrance |
| Architecture demo | Progressive Disclosure + Node Connection |
| Outcome / proof | Graph / Metric Build |
| Before / after pivot | Before / After Wipe |
| CTA | Calm CTA Landing |

## Timing Constants Pattern

Always define in `src/timing.ts`. Example for 75s / 30fps:

```ts
export const FPS = 30;
export const HOOK_END = 10 * FPS;      // 300
export const SOLUTION_START = 25 * FPS; // 750
export const BENEFITS_START = 45 * FPS; // 1350
export const CTA_START = 72 * FPS;     // 2160
```
