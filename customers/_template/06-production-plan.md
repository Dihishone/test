# Production Plan — [CUSTOMER_NAME]

---

## Project Parameters

| Field | Value |
|---|---|
| Duration | [X] seconds / [X*30] frames at 30fps |
| Resolution | 1920×1080 (default) |
| FPS | 30 |
| Output | `out/[customer-slug]-v[N].mp4` |
| Entry point | `src/index.ts` |
| Composition ID | `[CustomerSlug]Explainer` |

---

## Implementation Phases

### Phase 1 · Setup
- [ ] Create customer directory: `customers/[customer-slug]/`
- [ ] Copy template files; fill `VIDEO_STATE.md`, `01-briefing.md`, `02-approved-claims.md`, `03-brand-guidelines-summary.md`
- [ ] Create `src/timing.ts` with named frame constants
- [ ] Register new composition in `src/Root.tsx`
- [ ] Install required fonts via `@remotion/google-fonts` or static import

### Phase 2 · Scene Components
- [ ] `src/scenes/S01Hook.tsx`
- [ ] `src/scenes/S02Agitate.tsx`
- [ ] `src/scenes/S03Solution.tsx`
- [ ] `src/scenes/S04Benefits.tsx`
- [ ] `src/scenes/S05Proof.tsx`
- [ ] `src/scenes/S06CTA.tsx`

### Phase 3 · Shared Components
- [ ] `src/components/KineticText.tsx` (if kinetic headline used)
- [ ] `src/components/BenefitCard.tsx` (if card grid used)
- [ ] `src/components/MetricCounter.tsx` (if metric build used)
- [ ] `src/components/NodeMap.tsx` (if network/architecture diagram used)
- [ ] `src/components/WipeReveal.tsx` (if before/after wipe used)

### Phase 4 · Audio & Captions
- [ ] Voiceover file placed in `public/audio/[vo-filename].mp3`
- [ ] Captions file generated (see `/remotion` skill → `display-captions.md`)
- [ ] Audio integrated via `<Audio src={...} />` in composition

### Phase 5 · QA
- [ ] `npx remotion compositions src/index.ts` — correct fps and duration
- [ ] Still frame test: `npx remotion still src/index.ts [CompositionID] out/test.jpg --frame=45`
- [ ] Review checklist passed (`skills/b2b-video-conception/resources/review-checklist.md`)
- [ ] All claims verified against `02-approved-claims.md`

### Phase 6 · Render
- [ ] `npm run render` or `npx remotion render src/index.ts [CompositionID] out/[filename].mp4`
- [ ] Output file verified (duration, resolution, audio sync)
- [ ] Deliver for customer review

---

## Remotion Component Architecture

```
src/
├── timing.ts              ← All frame constants for this video
├── index.ts               ← registerRoot
├── Root.tsx               ← <Composition> registration
├── [CustomerSlug]Explainer.tsx  ← Main composition; assembles scenes via <Sequence>
├── scenes/
│   ├── S01Hook.tsx
│   ├── S02Agitate.tsx
│   ├── S03Solution.tsx
│   ├── S04Benefits.tsx
│   ├── S05Proof.tsx
│   └── S06CTA.tsx
└── components/            ← Reusable across scenes
    ├── KineticText.tsx
    ├── BenefitCard.tsx
    └── MetricCounter.tsx
```

---

## Skills Used

| Task | Skill |
|---|---|
| Remotion React code | `/remotion` skill (`.claude/skills/remotion/`) |
| HTML-based preview / animatic | `/hyperframes` skill (`.claude/skills/hyperframes/`) |
| Narrative and design decisions | `skills/b2b-video-conception/resources/` |
| Pattern reference | `research/video-benchmark-library/` |

---

## Render Requirements

| Field | Value |
|---|---|
| Chromium path | `/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell` |
| Config file | `remotion.config.ts` |
| Concurrency | Default (auto) |
| Image format | JPEG (default) |
| Output overwrite | Enabled |

---

## Known Risks

- [ ] [e.g., Custom font may not be available via Google Fonts — check license]
- [ ] [e.g., Customer logo only available as PNG — ensure transparency is preserved]
- [ ] [e.g., Proof metric requires customer sign-off before render]
