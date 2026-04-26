# Memory Recommendation

What to save to Codex Memory / agent memory for this repository.

---

## Recommended Memory Entry

Save this compact pointer — not the full research:

> For customer-facing B2B explainer video projects in this repository, default to **60–90 second videos**. Before concepting, load `skills/b2b-video-conception/resources/benchmark-principles.md` and `pattern-library.md` as default context. Use `customers/[customer]/VIDEO_STATE.md`, `02-approved-claims.md`, and `03-brand-guidelines-summary.md` as the per-project source of truth. Load the full benchmark library under `research/video-benchmark-library/` only when establishing a new creative direction. Use the `/remotion` skill for Remotion React/TSX implementation and `/hyperframes` for HTML-based preview compositions. Use abstract patterns only — never copy benchmark video scripts, layouts, brand systems, visual assets, or animation timing. Follow `AGENTS.md` for all operating rules.

---

## What NOT to Store in Memory

- Full benchmark library content (load from `research/video-benchmark-library/` when needed)
- Pattern library detail (load `skills/b2b-video-conception/resources/pattern-library.md` when needed)
- Customer-specific approved claims (load from `customers/[customer]/02-approved-claims.md`)
- Remotion or HyperFrames skill rules (load from `.claude/skills/` when needed)

---

## Why This Approach

Memory should hold a pointer, not a library. The files in this repository are the source of truth. Loading them fresh ensures accuracy and respects context limits.

The compact memory entry above is sufficient to orient a new agent session to:
- The 60–90s default
- The correct context-loading sequence
- The skills to use for implementation
- The ethical constraint (no copying benchmarks)
- Where to find operating rules
