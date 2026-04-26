# Narrative Pattern Library — 60–90 Second B2B Explainer

Each pattern is self-contained. Choose one per video.

---

## 1 · Executive Urgency Hook

**Best use:** C-suite / VP audience; market or regulatory shift as context
**60–90s structure:**
- 0–10s: One macro trend or risk that makes inaction costly ("By 2026, 80% of breaches originate in…")
- 10–25s: What this means for the buyer's business specifically
- 25–45s: Product as the required response (not optional upgrade)
- 45–65s: Outcomes (risk reduced, cost avoided, speed gained)
- 65–75s: Proof signal + CTA

**Scene logic:** Opens wide (market), narrows to buyer, narrows to product
**Strengths:** Creates urgency without manipulation; positions product as strategic, not tactical
**Risks:** Macro claim must be sourced or it reads as hype; fails for non-urgency buyers
**Remotion handoff:** Scene 1 = full-bleed data visualization or headline stat; Scene 2 = buyer-specific environment; rapid transition (wipe or zoom) into product interface

---

## 2 · Problem Compression

**Best use:** Complex multi-step pain with many stakeholders; enterprise workflow products
**60–90s structure:**
- 0–15s: Show the fragmented current state (many tools, many steps, many people waiting)
- 15–30s: Compress: all of that becomes one visual chaos moment
- 30–50s: Product resolves the compression — unified, clean, fast
- 50–70s: Benefits per stakeholder (brief, one line each)
- 70–80s: CTA

**Scene logic:** Expand chaos → compress it → release into order
**Strengths:** Works for platform consolidation stories; visually satisfying
**Risks:** Requires strong motion design; if chaos reads as "complicated product," it backfires
**Remotion handoff:** Use `spring()` for compression motion; staggered card entrance for the "many tools" state; single convergence animation toward product logo

---

## 3 · Hidden Cost Reveal

**Best use:** CFO / finance buyer; cost-of-doing-nothing narrative
**60–90s structure:**
- 0–12s: Seemingly normal business operation (nothing obviously wrong)
- 12–30s: Reveal the hidden cost: time wasted, risk accumulating, money leaking — quantified
- 30–50s: Product makes the invisible cost visible and then eliminates it
- 50–68s: ROI framing (time saved × headcount, risk exposure reduced)
- 68–78s: Proof + CTA

**Scene logic:** False normal → reveal → resolution → quantified value
**Strengths:** High relevance for finance buyers; quantified outcomes = credibility
**Risks:** Cost claim must be specific and believable; vague "wasted time" fails
**Remotion handoff:** Scene 2 uses counter animation (`interpolate` from 0 to dollar/hour value); color shift from neutral to warning red on reveal; green on resolution

---

## 4 · Before / After Transformation

**Best use:** Products with a clear workflow change; strong visual contrast between states
**60–90s structure:**
- 0–20s: Before state — show the pain viscerally (slow, broken, manual, risky)
- 20–22s: Hard cut or wipe transition (the moment of change)
- 22–55s: After state — same scenario, now fast / unified / automated / secure
- 55–70s: Outcome summary (what changed, in numbers if possible)
- 70–80s: CTA

**Scene logic:** Mirror before/after using identical visual elements in two states
**Strengths:** Highest visual impact; motion itself makes the argument
**Risks:** Before-state must be uncomfortable, not just "inconvenient"; after must feel earned
**Remotion handoff:** `before/after wipe` component using `interpolate` on clipPath width; shared element IDs in both scenes for continuity; transition at frame midpoint of total duration

---

## 5 · Data Chaos to Control

**Best use:** Data platforms, BI tools, observability, analytics products
**60–90s structure:**
- 0–15s: Data scattered, unreadable, coming from everywhere (visual noise)
- 15–30s: Consequences: missed signal, wrong decision, delayed response
- 30–50s: Platform ingests, organizes, surfaces signal — chaos becomes dashboard
- 50–68s: Decision enabled (what the buyer can now do)
- 68–78s: CTA

**Scene logic:** Entropy → collection → order → action
**Strengths:** Matches the product's literal function; satisfying visual arc
**Risks:** "Data chaos" visuals are overused; needs a fresh visual treatment to avoid cliché
**Remotion handoff:** Particle/node scatter animation → `spring()`-driven convergence → dashboard build animation (`interpolate` on bar heights, line traces)

---

## 6 · Scattered Tools to Unified Platform

**Best use:** Platform consolidation pitch; "replace 6 tools with one" positioning
**60–90s structure:**
- 0–15s: Show the tool sprawl (logos scattered, switching between tabs, copy-paste)
- 15–28s: Cost: context switching, data inconsistency, integration maintenance
- 28–50s: One platform replaces all — modules animate into a unified view
- 50–68s: Benefits: one source of truth, one workflow, one vendor
- 68–78s: CTA

**Scene logic:** Scatter → cost of scatter → convergence → unified state
**Strengths:** Resonates strongly with ops/IT buyers; clear visual payoff
**Risks:** Must name the category of tools being replaced; vague "consolidation" does not land
**Remotion handoff:** Tool logos as individual `<img>` elements with staggered scatter positions; `spring()` convergence into platform frame; opacity fade on competing logos

---

## 7 · Manual Work to Automation

**Best use:** Workflow automation, RPA, AI-powered process products
**60–90s structure:**
- 0–15s: Manual process shown step by step (slow, repetitive, error-prone)
- 15–25s: Human frustration / cost of manual (wasted hours, errors, delay)
- 25–48s: Same process — now automated: steps collapse, speed accelerates
- 48–65s: What the team does instead (higher-value work)
- 65–78s: CTA

**Scene logic:** Step-by-step slowness → collapse → acceleration → human upside
**Strengths:** Relatable across roles; quantifiable time savings
**Risks:** "Automation" has a layoff connotation; frame the upside as empowerment, not elimination
**Remotion handoff:** Step sequence using `Sequence` component with fixed timing per step; automation reveal collapses steps using `interpolate` on height/opacity; speed ramp on final sequence

---

## 8 · Product as Control Layer

**Best use:** Security, infrastructure, orchestration platforms
**60–90s structure:**
- 0–15s: Complex environment shown (cloud, network, apps, endpoints) — unmanaged
- 15–28s: What happens without control: a threat propagates, an outage cascades
- 28–50s: Product appears as a layer above the environment — sees everything, controls everything
- 50–68s: Specific capabilities (detect, respond, enforce) shown as interactions with the layer
- 68–78s: CTA

**Scene logic:** Environment → uncontrolled consequence → control layer appears → capabilities demonstrated
**Strengths:** Visually powerful for platform products; "control layer" metaphor is semantically precise
**Risks:** Abstract; requires strong motion execution to feel credible, not generic
**Remotion handoff:** Background = environment node map (SVG-based); product = overlay plane using z-axis separation; threat paths as animated SVG lines; control layer fades in using `interpolate(frame, [X, X+30], [0, 1])`

---

## 9 · Compliance / Trust Narrative

**Best use:** Regulated industries (finance, healthcare, legal); compliance or audit products
**60–90s structure:**
- 0–12s: Regulatory pressure stated (specific regulation or audit event)
- 12–28s: What non-compliance costs (fine, failed audit, reputational damage)
- 28–50s: Product makes compliance automatic / visible / auditable
- 50–65s: Certifications, frameworks supported (visual proof wall — restrained)
- 65–75s: CTA

**Scene logic:** Regulatory threat → cost → product as compliance engine → evidence
**Strengths:** High resonance in regulated verticals; urgency is external (not manufactured)
**Risks:** Over-claiming compliance scope creates legal risk; all claims require legal approval
**Remotion handoff:** Certification badges as styled components with `spring()` entrance; compliance status indicators using color transitions (gray → green); timeline animation for audit trail

---

## 10 · Proof-Led Explainer

**Best use:** Late-stage evaluation; proof of concept stage; account-based video
**60–90s structure:**
- 0–10s: One strong outcome claim (customer name + result if possible)
- 10–28s: The problem that produced this outcome (brief; buyer already knows the pain)
- 28–50s: How the product achieved it (mechanism, not feature list)
- 50–65s: 2–3 additional proof signals (stats, logos, quotes — not all three)
- 65–75s: CTA

**Scene logic:** Proof first → context → mechanism → more proof → action
**Strengths:** Highest conversion at evaluation stage; proof anchors the narrative
**Risks:** Fails for awareness audiences who don't yet have context; requires real proof
**Remotion handoff:** Opening stat animates as large kinetic number; customer logo enters with `spring()`; mechanism shown as concise animated diagram

---

## 11 · Risk Reduction Narrative

**Best use:** Security, insurance, compliance, infra reliability products; risk-averse buyers
**60–90s structure:**
- 0–15s: A specific bad outcome scenario — breach, outage, failed audit — made visceral
- 15–30s: Why it's increasingly likely (threat growth, complexity, human error at scale)
- 30–50s: Product reduces the specific risk (detection, prevention, or containment)
- 50–65s: Quantified risk reduction or incident response improvement
- 65–75s: CTA

**Scene logic:** Bad outcome → likelihood increases → product intervenes → quantified safety
**Strengths:** Fear is the strongest B2B motivator for security/infra buyers
**Risks:** Fear without resolution feels irresponsible; always land on control, not dread
**Remotion handoff:** Scene 1 = dramatic color shift (neutral → warning red); product arrival resets palette to controlled blues; risk metric counts down (not up) using `interpolate`
