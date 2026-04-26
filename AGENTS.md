# AGENTS.md — Operating Rules

Rules for all AI agents working in this repository.

---

## Video Format Default

**All customer explainer videos default to 60–90 seconds.**
Override only when explicitly stated in `01-briefing.md` with a reason.
Every narrative pattern, storyboard, and Remotion implementation must assume this format.

---

## Context Loading Rules

Load the smallest sufficient context. Do not load the full research library on every task.

### Default context for a new customer video project
1. `skills/b2b-video-conception/resources/benchmark-principles.md`
2. `skills/b2b-video-conception/resources/pattern-library.md`
3. `skills/b2b-video-conception/resources/motion-principles.md`
4. `skills/b2b-video-conception/resources/review-checklist.md`
5. `customers/[customer]/VIDEO_STATE.md`
6. `customers/[customer]/02-approved-claims.md`
7. `customers/[customer]/03-brand-guidelines-summary.md`

### Load on demand (not by default)
- `research/video-benchmark-library/source-log.md` — only when establishing new creative direction
- `research/video-benchmark-library/narrative-pattern-library.md` — when selecting or deep-diving a narrative pattern
- `research/video-benchmark-library/design-pattern-library.md` — when designing a scene
- `research/video-benchmark-library/motion-pattern-library.md` — when specifying motion for a scene
- `research/video-benchmark-library/after-effects-to-remotion-patterns.md` — when implementing motion in Remotion
- `research/video-benchmark-library/anti-patterns.md` — during review
- `.claude/skills/remotion/SKILL.md` and rules — when writing Remotion code
- `.claude/skills/hyperframes/SKILL.md` — when building HyperFrames preview compositions

---

## Skill Usage Rules

### Inspect before adding
Always check `.claude/skills/` before proposing a new skill or tool. Do not duplicate existing functionality.

### Implementation skills
| Task | Skill |
|---|---|
| Remotion React/TSX code | `/remotion` skill → `.claude/skills/remotion/` |
| HTML/GSAP preview compositions | `/hyperframes` skill → `.claude/skills/hyperframes/` |
| HyperFrames CLI (lint, preview, render) | `/hyperframes-cli` |
| HyperFrames registry blocks | `/hyperframes-registry` |

### Do not duplicate
- Do not re-document Remotion API behavior already covered in `.claude/skills/remotion/rules/`
- Do not re-document HyperFrames motion principles already in `.claude/skills/hyperframes/references/motion-principles.md`
- Reference those files; don't copy them

---

## Benchmark Usage Rules

- Use benchmark patterns at an abstract level only
- **Never copy** benchmark scripts, scenes, layouts, visual systems, brand assets, color palettes, animation timing, or proprietary creative elements
- Extract the principle; design the execution independently
- Benchmark sources are in `research/video-benchmark-library/source-log.md`

---

## Plan Mode Rules

**Use Plan Mode for:**
- Initial video concept (narrative pattern selection, scene structure)
- Full storyboard — new or major revision
- Multi-scene rewrites
- Remotion composition architecture decisions
- Any change affecting `VIDEO_STATE.md` approved structure

**Skip Plan Mode for:**
- Minor copy edits (single word/phrase changes)
- Small timing adjustments (one scene, ≤ 5 frames)
- Single-scene visual polish
- Color or font tweaks within approved brand guidelines

---

## Change Management Rules

- After every material change: update `customers/[customer]/VIDEO_STATE.md` compactly
- Use scene-level change requests for iterations (reference scene IDs S01–S06)
- Do not reopen decisions logged in the "Do-Not-Reopen Decisions" section of `VIDEO_STATE.md`

---

## Claims Rules

- All claims must exist in `02-approved-claims.md` with approval status before appearing in script or storyboard
- Reference claims by ID (CLAIM_001, CLAIM_002, etc.) in `04-script.md` and `05-storyboard.md`
- No superlatives without a named, current source
- Compliance-sensitive claims (security certifications, regulated industry claims) require legal review notation in the claims log

---

## After Implementation: Required Return Format

After completing any implementation task, return:

1. **Changed files** — list every file modified or created
2. **What changed** — one sentence per file
3. **What was not changed** — any file explicitly left unchanged
4. **Preview / render command** — exact command to verify the result
5. **Remaining risks** — open issues or items requiring follow-up

---

## Repository Structure Reference

```
/
├── AGENTS.md                          ← This file
├── CLAUDE.md                          ← Skill index
├── memory-recommendation.md           ← What to save to agent memory
├── remotion.config.ts                 ← Remotion config (Chromium path, format)
├── src/                               ← Remotion project (React components)
├── .claude/skills/
│   ├── remotion/                      ← /remotion skill
│   ├── hyperframes/                   ← /hyperframes skill
│   ├── hyperframes-cli/               ← /hyperframes-cli skill
│   └── hyperframes-registry/          ← /hyperframes-registry skill
├── research/video-benchmark-library/  ← Full benchmark library (load on demand)
├── skills/b2b-video-conception/
│   └── resources/                     ← Compact daily-use skill resources
└── customers/
    ├── _template/                     ← Template for new customer projects
    └── [customer-slug]/               ← Per-customer video project
```
