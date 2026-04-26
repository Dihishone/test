# B2B Video Conception — Benchmark Principles
**Default video length: 60–90 seconds.**

Distilled from `research/video-benchmark-library/b2b-video-principles.md`. Load this file as default context. Load the full library only when establishing a new creative direction.

---

## Non-Negotiable Defaults

- **60–90 seconds.** Override only with explicit brief justification.
- **One pain. One resolution.** Do not attempt to prove everything.
- **Buyer is the hero.** Product is the guide.
- **Value proposition by 0:45.** Everything before is setup.
- **One CTA.** Specific and on-screen. Minimum 6s hold.

## Narrative Selection

| Buyer situation | Pattern |
|---|---|
| C-suite / regulatory pressure | Executive Urgency Hook |
| Workflow change | Before / After Transformation |
| Platform consolidation | Scattered Tools → Unified Platform |
| Multi-module platform | Architecture First or Progressive Disclosure |
| Security / risk buyer | Risk Reduction or Product as Control Layer |
| Finance / CFO | Hidden Cost Reveal |
| Late-stage evaluation | Proof-Led Explainer |
| Existing customer | Update-Led (not for acquisition) |

## Pacing Template (75s)

| Phase | Time | Max duration |
|---|---|---|
| Hook | 0–10s | 12s |
| Agitate | 10–25s | 18s |
| Solution | 25–45s | 22s |
| Benefits | 45–65s | 22s |
| Proof | 65–72s | 8s |
| CTA | 72–80s | hold to end |

## Design Defaults

- Dark bg: security / infra / developer tools
- Light bg: SMB SaaS / HR / finance products
- 2–3 colors max; assign semantic roles (threat / safe / neutral)
- Kinetic typography over static overlays
- Spatial diagrams over UI screenshots for platform products

## Claims Rule

All claims require an entry in `02-approved-claims.md` before scripting. No superlatives without source.

## Implementation

- Use `/remotion` skill for React/Remotion code
- Use `/hyperframes` skill for HTML-based preview compositions
- Define all timing in `src/timing.ts`; never hardcode frame numbers inline
- Full patterns: `research/video-benchmark-library/narrative-pattern-library.md`
- Full motion: `research/video-benchmark-library/motion-pattern-library.md`
- Full anti-patterns: `research/video-benchmark-library/anti-patterns.md`
