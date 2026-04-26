# Review Checklist — 60–90 Second B2B Explainer

Use at script draft, storyboard, and pre-render stages. Mark each item before advancing.

---

## 1 · Narrative Clarity
- [ ] One core pain stated within the first 12 seconds
- [ ] Pain is specific to the ICP (not a generic category description)
- [ ] Value proposition fully stated by 0:45
- [ ] Buyer is the hero; product is the guide
- [ ] No feature lists — benefits only

## 2 · Buyer Relevance
- [ ] Pain and outcome map to the named ICP and buyer persona
- [ ] Tone matches the buyer's emotional register (urgency for security; efficiency for ops; risk for finance)
- [ ] No consumer-register language, humor, or visuals for enterprise/technical audience

## 3 · Claims & Compliance
- [ ] Every statistic has a named source in `02-approved-claims.md`
- [ ] No superlatives without a cited source ("only," "leading," "best")
- [ ] No forbidden claims from the approved-claims log are present
- [ ] Legal/compliance review completed if required by customer brief

## 4 · Pacing
- [ ] Total duration: 60–90 seconds (flag if outside this range)
- [ ] No scene longer than 15s without a visual change
- [ ] CTA frame holds for minimum 6 seconds
- [ ] Value proposition lands before 0:45 mark

## 5 · Visual Hierarchy
- [ ] Maximum 5 words of display copy per scene
- [ ] Color system is consistent and semantic (not decorative)
- [ ] UI shown is idealized: no clutter, no badges, no irrelevant elements
- [ ] No template-visible motion presets (wipes, bounces, spins)

## 6 · Motion Quality
- [ ] Every animated element entry is locked to a voiceover cue or beat
- [ ] Stagger is consistent (fixed interval, not random)
- [ ] Large areas of visual stillness exist to make motion meaningful
- [ ] No constant ambient motion competing with content
- [ ] Easing uses custom curves or `Easing.*` — not default linear

## 7 · Scene Clarity
- [ ] Each scene has one primary visual idea
- [ ] No voiceover / visual misalignment (audio and visual cover the same topic per scene)
- [ ] Transitions serve the narrative (contrast wipes for before/after; fades for calm passages)

## 8 · CTA
- [ ] One CTA only — no competing actions
- [ ] CTA copy is specific and action-oriented (not "Learn more")
- [ ] URL or next step appears as on-screen text (not only in narration)
- [ ] CTA frame is visually calm — no competing animation

## 9 · Remotion Implementation Readiness
- [ ] All timing constants defined in `src/timing.ts`
- [ ] Scene components extracted (one React component per scene)
- [ ] No hardcoded frame numbers inline in components
- [ ] Captions file prepared if voiceover is used (see `/remotion` skill → `display-captions.md`)
- [ ] Fonts declared using `@remotion/google-fonts` or static import (see `/remotion` skill → `fonts.md`)
- [ ] `remotion compositions` CLI command runs without error

## 10 · Final Render Readiness
- [ ] `npx remotion compositions src/index.ts` lists composition with correct fps/duration
- [ ] Still frame render test passed (`npx remotion still ...`)
- [ ] Chromium headless shell path set in `remotion.config.ts`
- [ ] Output path confirmed in `06-production-plan.md`
- [ ] `VIDEO_STATE.md` updated to reflect current approved state
