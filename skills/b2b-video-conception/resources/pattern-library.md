# B2B Video Conception — Pattern Library (Quick Reference)
**Default video length: 60–90 seconds.**

Cross-reference index. For full pattern detail, load the source files in `research/video-benchmark-library/`.

---

## Narrative Patterns → `narrative-pattern-library.md`

| Pattern | Best Use | Key Risk |
|---|---|---|
| Executive Urgency Hook | C-suite; macro trend as context | Claim must be sourced |
| Problem Compression | Multi-stakeholder workflow chaos | Requires strong motion; chaos must read as recognizable |
| Hidden Cost Reveal | CFO; cost-of-doing-nothing | Cost must be specific and quantified |
| Before / After Transformation | Clear workflow change; strong visual contrast | Before-state must be uncomfortable, not just inconvenient |
| Data Chaos to Control | Data/BI/observability platforms | Visual treatment must avoid generic "tech lines" cliché |
| Scattered Tools → Unified Platform | Consolidation pitch | Must name the category of tools being replaced |
| Manual Work → Automation | RPA / workflow automation | Frame as empowerment, not elimination |
| Product as Control Layer | Security / infra orchestration | Requires premium motion execution to read as credible |
| Compliance / Trust Narrative | Regulated industries | All compliance claims require legal approval |
| Proof-Led Explainer | Late-stage evaluation | Requires real, named proof — fails without it |
| Risk Reduction Narrative | Security / infra reliability | Always land on control, not dread |

## Design Patterns → `design-pattern-library.md`

| Pattern | Where in 75s Video | Key Constraint |
|---|---|---|
| Premium Enterprise Interface | 0:28–0:50 product reveal | Dark bg; idealized UI only |
| Modular Card Grid | 0:45–1:05 benefits | Max 4 cards; 3–5 words each |
| Split-Screen Before / After | 0:20–0:40 contrast pivot | Both states must be visually distinct |
| Abstract Data Flow Layer | Background / problem visualization | Needs distinctive color to avoid generic |
| System Map Simplification | Problem/solution pivot | Initial complexity must read as "your world" |
| Executive KPI Board | 0:50–1:10 outcomes | Metrics must be real or sourced |
| Infrastructure Network Map | Attack surface / coverage demo | Must be abstract enough to feel universal |
| Security Boundary Abstraction | Security product reveal | Needs modern execution to avoid "old firewall" feel |
| Restrained Proof Wall | Last 15s before CTA | Logos must be recognizable to the specific ICP |
| Calm CTA Closing Frame | Final 6–10s | No competing animation; strong CTA copy required |

## Motion Patterns → `motion-pattern-library.md`

| Pattern | Best For | Avoid When |
|---|---|---|
| Kinetic Headline Reveal | Hook; product name; CTA | Mid-video benefit lists (too slow at word level) |
| Staggered Card Entrance | Benefits; feature modules | >5 cards in 60s; >6 words per card |
| Progressive Disclosure | Architecture diagrams; platform reveal | When all elements needed simultaneously |
| Data Stream Animation | Ambient background; data flow | Competing with foreground UI/copy |
| Compression / Convergence | Platform consolidation pivot | Can't show all elements legibly at canvas size |
| Zoom Into System Layer | Overview → capability detail | More than once per video |
| Graph / Metric Build | Outcome / KPI section | When metric is not real or sourced |
| Node Connection Animation | Integration story | When connections are abstract (buyer can't identify what connects) |
| Mask Reveal | Product name; key stat | When revealed content isn't strong visual payoff |
| Before / After Wipe | Contrast narrative | When before/after states aren't visually distinct |
| Calm CTA Landing | Final scene | Never skip |

## AE → Remotion Translations → `after-effects-to-remotion-patterns.md`

| AE Concept | Remotion Equivalent |
|---|---|
| Keyframe | `interpolate(frame, [f1,f2], [v1,v2])` |
| Spring/overshoot | `spring({ frame, fps, config })` |
| Text animator | Word-split array + `interpolate` per word |
| Trim Paths | `strokeDashoffset` driven by `interpolate` |
| Pre-comp | `<Sequence>` or extracted React component |
| Timing constants | `src/timing.ts` — never inline |
