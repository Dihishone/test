# Design Pattern Library — 60–90 Second B2B Explainer

Visual design patterns. Each maps to a specific use case and video position.

---

## 1 · Premium Enterprise Interface

**Visual structure:** Dark background (near-black, not pure black); UI shown as floating panel in 3D space, slightly angled; clean data with no clutter; 2-color accent system
**Where it fits:** Product reveal scene (0:28–0:50 in a 75s video); sustained through benefits section
**Why it works:** Signals "built for serious work"; dark mode = visual empathy with technical buyers; floating UI = premium staging, not a screenshot dump
**Suitable customers:** Cybersecurity, DevOps, observability, enterprise SaaS with technical buyer
**Risks:** Can feel cold for HR/people-ops or customer-success products; don't pair with playful copy
**Remotion components:** `<AbsoluteFill>` with dark bg; UI panel as `<div>` with subtle box-shadow and 3D `perspective`; `interpolate` for floating entrance from below

---

## 2 · Modular Card Grid

**Visual structure:** 3–6 cards enter in staggered sequence; each card = one benefit or feature; cards have consistent size, icon, headline, and one-line descriptor; white or dark bg
**Where it fits:** Benefits section (0:45–1:05); also works for "what's included" in platform explainers
**Why it works:** Creates visual order from complexity; stagger creates reading sequence; each card is a discrete claim, making the video scannable
**Suitable customers:** SaaS with multiple features, platform products, multi-module suites
**Risks:** More than 4 cards in 60s = cognitive overload; copy must be terse (3–5 words per card)
**Remotion components:** Card component with `spring()` entrance; stagger via `delay = index * 8` frames; exit via opacity fade at chapter end

---

## 3 · Split-Screen Before / After

**Visual structure:** Screen divides (vertical or diagonal wipe); left = before state (desaturated, cluttered, red accents); right = after state (clean, color-brand, ordered); optional: wipe animates across as a reveal
**Where it fits:** Core transformation scene; most effective at 0:20–0:40 in contrast narratives
**Why it works:** Allows simultaneous comparison; motion of the wipe itself = the transformation moment
**Suitable customers:** Any product with a clear workflow change; especially automation, consolidation, compliance
**Risks:** Before-state must be immediately recognizable; if both sides look similar, the pattern fails
**Remotion components:** Two `<AbsoluteFill>` layers; clipPath on right panel driven by `interpolate(frame, [wipeStart, wipeEnd], [0, 100])`; color grade shift using CSS filter on left panel

---

## 4 · Abstract Data Flow Layer

**Visual structure:** Animated lines or particles flow between nodes on a dark canvas; nodes represent data sources, systems, or endpoints; flow direction = data movement or signal propagation
**Where it fits:** Problem visualization (data chaos), platform architecture reveal, or background motion layer
**Why it works:** Makes invisible infrastructure legible; abstract enough to avoid product specificity; premium motion feel with relatively simple geometry
**Suitable customers:** Data platforms, observability, security, network/cloud infrastructure
**Risks:** Overused in the category; needs distinctive color or node design to avoid generic "tech lines" look
**Remotion components:** SVG path animation via `strokeDashoffset` driven by `useCurrentFrame()`; node circles as `<circle>` elements with `spring()` radius pulse; layer as background `<AbsoluteFill>` behind UI content

---

## 5 · System Map Simplification

**Visual structure:** Complex system diagram shown at full complexity → elements fade or consolidate → simplified version remains; before/after on same canvas
**Where it fits:** Problem/solution pivot; especially effective for platform consolidation and architecture explainers
**Why it works:** Shows the product's value as "making complexity manageable"; the simplification IS the demonstration
**Suitable customers:** IT/infra buyers, network security, cloud management, platform consolidation
**Risks:** Initial complexity must be legible as "your world," not random noise; avoid too many node types
**Remotion components:** Node positions interpolated between "scattered" and "organized" states; edges fade via opacity; product node enters at center using `spring()` scale from 0

---

## 6 · Executive KPI Board

**Visual structure:** 3–4 large metric tiles; each metric animates from 0 (or from "bad" baseline) to the outcome value; labels are short; color shifts from neutral to positive on completion
**Where it fits:** Outcome/proof section (0:50–1:10); works as a closing beat before CTA
**Why it works:** Executives scan for numbers; animated metrics are more credible than spoken claims; the animation implies the metric is real-time
**Suitable customers:** CFO/CRO/CISO audience; any product with quantifiable ROI
**Risks:** Metrics must be real or sourced; animated fake numbers = credibility damage if buyer notices
**Remotion components:** Counter animation via `Math.floor(interpolate(frame, [start, end], [0, targetValue]))` with `font-variant-numeric: tabular-nums`; color transition on completion via `interpolate` on hue

---

## 7 · Infrastructure Network Map

**Visual structure:** Stylized network of nodes (cloud, endpoints, data centers, users); nodes grouped by zone (internal, edge, cloud); threat paths or data flows animate between them
**Where it fits:** Problem visualization (attack surface, data exposure) and solution demonstration (coverage)
**Why it works:** Makes the scope of the problem — and the solution's coverage — immediately spatial and comprehensible
**Suitable customers:** Network security, cloud security, SASE, SD-WAN, observability
**Risks:** Must be abstract enough to feel universal, not client-specific; avoid over-detailing node types
**Remotion components:** SVG-based node layout; threat path as animated `strokeDasharray`; coverage zones as semi-transparent `<rect>` or `<ellipse>`; product logo at center with `spring()` entrance

---

## 8 · Security Boundary Abstraction

**Visual structure:** Concentric rings or zones around a protected asset; outer rings = threat surface; inner rings = product's control layers; threats approach from outside and are stopped at ring boundaries
**Where it fits:** Security product reveal and capability demonstration
**Why it works:** "Perimeter" is a core mental model for security buyers; concentric rings = depth of defense; threats being stopped at rings = product mechanism without technical jargon
**Suitable customers:** Endpoint security, network security, identity/access management, zero-trust products
**Risks:** Can feel dated if rendered generically (old-school firewall visual); needs modern execution
**Remotion components:** Rings as `<circle>` SVG elements; threat icons translate inward then stop via `spring()` with overshoot; ring color transitions from gray to blue on activation

---

## 9 · Restrained Proof Wall

**Visual structure:** 4–8 customer logos arranged in a clean grid or single row; enters as a group with subtle stagger; no animation beyond entrance; dark bg or light bg depending on brand
**Where it fits:** Proof signal section (last 15s before CTA); also works as a brief 3s flash in the middle of a narrative
**Why it works:** Social proof through recognition; restraint = confidence (premium brands don't beg for credibility)
**Suitable customers:** Any B2B product with recognizable customers; most effective for enterprise-tier signaling
**Risks:** If logos are not recognizable to the specific ICP, they carry no weight; don't use startup or SMB logos for enterprise-tier credibility
**Remotion components:** Logo components with `opacity` and `y` entrance via `spring()`; stagger delay per logo; hold for minimum 3s

---

## 10 · Calm CTA Closing Frame

**Visual structure:** Single-color background (brand primary or deep dark); large centered headline (the CTA action); URL or button below; optional: product logo top-left; no animation beyond entrance fade
**Where it fits:** Final scene; minimum 6s hold
**Why it works:** Visual calm after motion = the eye rests on the CTA; zero competing elements = zero distraction
**Suitable customers:** All B2B video types
**Risks:** If the CTA copy is weak ("Learn more"), the frame's calm amplifies the weakness; invest in CTA copy
**Remotion components:** `<AbsoluteFill>` with brand bg; headline animates in with `interpolate` opacity + subtle y; URL fades in 0.5s after headline; no exit animation — composition ends on this frame
