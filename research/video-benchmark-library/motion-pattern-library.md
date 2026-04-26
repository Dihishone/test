# Motion Pattern Library — 60–90 Second B2B Explainer

Each pattern describes motion behavior, not specific code. For Remotion implementation see `after-effects-to-remotion-patterns.md`. For HyperFrames implementation see `.claude/skills/hyperframes/references/motion-principles.md`.

---

## 1 · Kinetic Headline Reveal

**Motion behavior:** Headline text enters word-by-word or line-by-line; each word/line slides up from below (y offset) and fades in; stagger ~80ms between words
**Emotional effect:** Authority; clarity; the spoken word becomes visual
**Best scene type:** Hook (0–10s); product name reveal; CTA frame
**Timing guidance (75s video):** Entrance over 0.6–1.0s; hold for voiceover duration; no exit animation (transition handles it)
**When to avoid:** Mid-video benefit lists (too slow at word level; use line-level stagger instead); never for data labels
**Remotion implementation idea:** Array of words; each word wrapped in overflow-hidden container; `interpolate(frame, [delay + i*6, delay + i*6 + 18], [20, 0])` for y; matching opacity tween

---

## 2 · Staggered Card Entrance

**Motion behavior:** Cards enter sequentially from bottom or left; each card: y offset → resting position with ease-out; stagger 8–12 frames between cards; no exit until chapter transition
**Emotional effect:** Order; breadth without overwhelm; reading sequence is controlled
**Best scene type:** Benefits section; feature overview; "what's included" modules
**Timing guidance:** Full card set should complete entrance within 1.5s (avoid dragging); each card entrance ≤ 0.5s
**When to avoid:** More than 5 cards in a 60s video; avoid if copy per card exceeds 6 words
**Remotion implementation idea:** `cards.map((card, i) => <Card delay={i * 10} />)`; inside Card: `spring({ frame: frame - delay, fps, config: { damping: 20 } })`

---

## 3 · Progressive Disclosure

**Motion behavior:** A complex diagram or interface reveals elements one at a time, each appearing on a voiceover cue; previously revealed elements dim slightly but remain visible; the full picture accumulates
**Emotional effect:** Comprehension; the viewer is guided, not overwhelmed; the diagram "builds" the argument
**Best scene type:** Architecture diagrams; platform module reveals; compliance framework layers
**Timing guidance:** One new element per 3–5s of voiceover; total disclosure over 15–20s maximum
**When to avoid:** When all elements are needed simultaneously for comprehension; don't stagger a simple 3-item list
**Remotion implementation idea:** Array of diagram elements; each has an `activateFrame`; `opacity: frame >= activateFrame ? 1 : 0` with `interpolate` for smooth fade; earlier elements: `opacity: interpolate(frame, [activateFrame, activateFrame+10], [0, 0.4])` after next element activates

---

## 4 · Data Stream Animation

**Motion behavior:** Flowing particles or dashed lines travel along paths from source nodes to destination nodes; continuous flow; velocity varies (faster near center/platform, slower at edges)
**Emotional effect:** Activity; scale; the platform is always processing
**Best scene type:** "Data flow" or "traffic" visualization; background ambient layer during product demo
**Timing guidance:** Treat as ambient; should not demand attention — it reinforces, not drives the narrative
**When to avoid:** If it competes with foreground UI or copy; never as the primary visual in a scene
**Remotion implementation idea:** SVG path with `strokeDashoffset` animated by `(frame * speed) % pathLength`; multiple particles at offset phases; `useCurrentFrame()` drives all

---

## 5 · Compression / Convergence

**Motion behavior:** Multiple scattered elements (tool logos, nodes, document icons) animate toward a single central point; they merge or are replaced by the product; the convergence is the moment of transformation
**Emotional effect:** Relief; control; the complexity is resolved
**Best scene type:** Platform consolidation reveal; "replace N tools with one" narrative pivot
**Timing guidance:** Scatter → convergence over 1.0–1.5s; hold convergence for 0.5s before product reveal; total ≤ 2s
**When to avoid:** If the "many things" cannot be shown simultaneously in legible form at the canvas size
**Remotion implementation idea:** Each element has start position (scattered) and end position (center); `interpolate(frame, [start, end], [startX, centerX])` for x and y; `spring()` for the final snap to center

---

## 6 · Zoom Into System Layer

**Motion behavior:** Camera (scale + translate) moves into a detail layer of a diagram or interface; like a zoom punch into a region of the product; surrounding context fades
**Emotional effect:** Focus; precision; "this is what matters"
**Best scene type:** Transitioning from overview architecture to specific product capability; moving from problem level to solution detail
**Timing guidance:** Zoom over 0.8–1.2s; immediately follow with content reveal in the zoomed layer; don't linger on the zoom itself
**When to avoid:** More than once per 60–90s video (repeated zoom = no hierarchy)
**Remotion implementation idea:** `scale: interpolate(frame, [zoomStart, zoomEnd], [1, 2.5])` + matching `translateX/Y` on `<AbsoluteFill>` container; surrounding elements fade via opacity tween

---

## 7 · Graph / Metric Build

**Motion behavior:** Bar chart bars grow from 0 to value; line chart traces from left to right; counter ticks from 0 to target number; easing is ease-out (fast start, decelerates to final value)
**Emotional effect:** Momentum; proof; the metric is "happening" in real time
**Best scene type:** Outcome/proof section; KPI board; "results" framing
**Timing guidance:** Each metric builds over 1.0–1.5s; stagger multiple metrics by 0.3–0.5s; hold completed metrics for ≥ 2s
**When to avoid:** If the metric is not real or sourced; never animate a range ("up to 40%") as if it's a precise number
**Remotion implementation idea:** `Math.floor(interpolate(frame, [buildStart, buildEnd], [0, targetValue], { extrapolateRight: 'clamp' }))`; bar height as `interpolate` on `height` or `scaleY`; use `font-variant-numeric: tabular-nums`

---

## 8 · Node Connection Animation

**Motion behavior:** Two or more nodes on screen; a line or arc draws between them (stroke animation); on connection: both nodes pulse briefly; additional nodes may connect in sequence
**Emotional effect:** Integration; network effect; the product connects disparate things
**Best scene type:** Integration story; "connects your systems" positioning; network/platform reveal
**Timing guidance:** Each connection line draws over 0.4–0.6s; pulse on connection: 0.2s; maximum 4 connections before visual becomes crowded
**When to avoid:** When the connections are abstract (buyer can't identify what's being connected)
**Remotion implementation idea:** SVG `<line>` or `<path>`; `strokeDashoffset` from `pathLength` to 0 driven by `interpolate`; node pulse via `spring()` scale 1 → 1.2 → 1 at connection frame

---

## 9 · Mask Reveal

**Motion behavior:** Content is revealed from behind a mask that slides, expands, or wipes; the unrevealed content is hidden; the reveal is the moment of visual impact
**Emotional effect:** Surprise; emphasis; the revealed element feels earned
**Best scene type:** Product name reveal; key statistic; "after" state in a contrast narrative
**Timing guidance:** Mask should clear in 0.4–0.7s; revealed content should be worth the anticipation (a key number, the product name, the result)
**When to avoid:** When the masked content isn't a strong visual payoff; don't use as a generic transition
**Remotion implementation idea:** `clip-path: inset(0 ${interpolate(frame, [start, end], [100, 0])}% 0 0)` on the revealed element; or SVG `clipPath` rect with animated `x`/`width`

---

## 10 · Before / After Wipe

**Motion behavior:** A vertical or diagonal line sweeps across the frame, dividing before (left) and after (right) states; left side = problem state; right side = solution state; line animates from left to right
**Emotional effect:** Transformation; the sweep is the moment of change
**Best scene type:** Contrast narrative pivot; split-screen comparison
**Timing guidance:** Wipe over 0.8–1.2s; hold split for 1.5–3s for comparison reading; can be bi-directional (sweep in, hold, sweep out)
**When to avoid:** When before/after states aren't visually distinct enough; wipe on similar-looking states reads as arbitrary transition
**Remotion implementation idea:** Right panel: `clip-path: inset(0 ${interpolate(frame, [start, end], [100, 0], { extrapolateRight: 'clamp' })}% 0 0)`; divider line: `left: ${interpolate(...)}%` as absolute element

---

## 11 · Calm CTA Landing

**Motion behavior:** All prior motion settles; a single element (headline or button) fades in cleanly; no competing motion; background either holds still or has a very slow, nearly imperceptible drift
**Emotional effect:** Resolution; rest; the eye has nowhere to go but the CTA
**Best scene type:** Final scene; CTA frame (last 6–10s)
**Timing guidance:** Preceding scene transition resolves; CTA headline enters over 0.5s; URL/button fades 0.3s after; composition holds to end; no exit animation
**When to avoid:** Never skip this; a busy or abrupt CTA frame costs conversions
**Remotion implementation idea:** `opacity: interpolate(frame, [ctaStart, ctaStart+15], [0, 1])`; nothing else animates after `ctaStart`; use `durationInFrames` to ensure composition holds on this frame
