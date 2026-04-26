# Storyboard — [CUSTOMER_NAME] — [VERSION]
**Target duration: 60–90 seconds**
Status: [ ] Draft / [ ] In review / [ ] Approved

---

## Scene S01 · Hook

| Field | Value |
|---|---|
| **Objective** | Establish the core pain within 10 seconds |
| **Duration** | ~10s (300 frames at 30fps) |
| **Narrative pattern** | [e.g., Risk Reduction / Executive Urgency Hook] |
| **Visual concept** | [Describe what the viewer sees — one paragraph, no jargon] |
| **Design pattern** | [e.g., Abstract Data Flow Layer] |
| **Motion concept** | [e.g., Kinetic Headline Reveal — word by word on VO beat] |
| **On-screen copy** | [MAX 5 WORDS] |
| **Voiceover** | [First VO line] |
| **Claims used** | None |
| **Assets required** | [e.g., None / Background SVG / Customer logo] |
| **Implementation notes** | [e.g., `src/scenes/S01Hook.tsx`; timing constants from `HOOK_START`] |
| **Status** | [ ] Draft / [ ] Approved |

---

## Scene S02 · Agitate

| Field | Value |
|---|---|
| **Objective** | Show the cost of the problem — make inaction uncomfortable |
| **Duration** | ~15s (450 frames) |
| **Visual concept** | [Describe: e.g., Fragmented tool landscape — multiple app windows scattered; each represents a different step in the broken workflow] |
| **Design pattern** | [e.g., System Map Simplification — full complexity state] |
| **Motion concept** | [e.g., Progressive Disclosure — each pain element appears on VO cue] |
| **On-screen copy** | [MAX 5 WORDS per beat] |
| **Voiceover** | [VO text] |
| **Claims used** | None |
| **Assets required** | [e.g., Tool logo SVGs] |
| **Implementation notes** | [e.g., `src/scenes/S02Agitate.tsx`] |
| **Status** | [ ] Draft / [ ] Approved |

---

## Scene S03 · Solution

| Field | Value |
|---|---|
| **Objective** | Introduce the product as the resolution to the stated pain |
| **Duration** | ~20s (600 frames) |
| **Visual concept** | [e.g., Product UI appears as a floating premium interface; the chaos from S02 converges into it] |
| **Design pattern** | [e.g., Premium Enterprise Interface / Compression-Convergence] |
| **Motion concept** | [e.g., Compression / Convergence → Spring Entrance of product panel] |
| **On-screen copy** | [Product name + short tagline] |
| **Voiceover** | [VO text] |
| **Claims used** | CLAIM_001 |
| **Assets required** | [Product UI asset / logo SVG] |
| **Implementation notes** | [e.g., `src/scenes/S03Solution.tsx`; product panel uses `spring()` entrance] |
| **Status** | [ ] Draft / [ ] Approved |

---

## Scene S04 · Benefits

| Field | Value |
|---|---|
| **Objective** | Demonstrate 2–3 concrete outcomes |
| **Duration** | ~20s (600 frames) |
| **Visual concept** | [e.g., Modular card grid — 3 cards, each with icon, headline, one-line outcome] |
| **Design pattern** | [e.g., Modular Card Grid] |
| **Motion concept** | [e.g., Staggered Card Entrance — 10-frame stagger] |
| **On-screen copy** | [Benefit 1 headline / Benefit 2 headline / Benefit 3 headline] |
| **Voiceover** | [VO text] |
| **Claims used** | CLAIM_002 |
| **Assets required** | [Icon set] |
| **Implementation notes** | [e.g., `src/scenes/S04Benefits.tsx`; `<BenefitCard>` component with delay prop] |
| **Status** | [ ] Draft / [ ] Approved |

---

## Scene S05 · Proof

| Field | Value |
|---|---|
| **Objective** | Anchor credibility with one strong proof signal |
| **Duration** | ~8s (240 frames) |
| **Visual concept** | [e.g., Metric build — large animated number with customer attribution / OR: logo wall — 4 recognizable customer logos] |
| **Design pattern** | [e.g., Executive KPI Board / Restrained Proof Wall] |
| **Motion concept** | [e.g., Graph / Metric Build — counter from 0 to value] |
| **On-screen copy** | [Stat + source / Customer logos] |
| **Voiceover** | [VO text] |
| **Claims used** | CLAIM_003 |
| **Assets required** | [Customer logo SVGs if proof wall] |
| **Implementation notes** | [e.g., `src/scenes/S05Proof.tsx`; `<MetricCounter>` component] |
| **Status** | [ ] Draft / [ ] Approved |

---

## Scene S06 · CTA

| Field | Value |
|---|---|
| **Objective** | Give the viewer one clear next action |
| **Duration** | ~7s minimum hold (210 frames) |
| **Visual concept** | [e.g., Dark background, centered CTA headline, URL below, product logo top-left] |
| **Design pattern** | [e.g., Calm CTA Closing Frame] |
| **Motion concept** | [e.g., Calm CTA Landing — headline fades in, URL 0.5s after; nothing else moves] |
| **On-screen copy** | [CTA COPY — e.g., "Book your demo"] + [URL] |
| **Voiceover** | [CTA VO line] |
| **Claims used** | None |
| **Assets required** | [Logo SVG] |
| **Implementation notes** | [e.g., `src/scenes/S06CTA.tsx`; composition must end on this frame — no exit animation] |
| **Status** | [ ] Draft / [ ] Approved |
