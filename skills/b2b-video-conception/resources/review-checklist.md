# B2B Video Conception — Review Checklist (Quick Reference)
**Default video length: 60–90 seconds.**

Use at every handoff stage. Full checklist: `research/video-benchmark-library/review-checklist.md`.

---

## Script Stage
- [ ] Duration target: 60–90s (≈140–180 words at average narration pace)
- [ ] One pain, stated within 12s
- [ ] Pain is ICP-specific (not category-generic)
- [ ] Value proposition complete by 0:45
- [ ] Every claim has a `CLAIM_ID` in `02-approved-claims.md`
- [ ] One CTA with specific copy and URL

## Storyboard Stage
- [ ] Each scene has one visual idea
- [ ] Max 5 words of display copy per scene
- [ ] Voiceover and visual cover the same topic per scene (no misalignment)
- [ ] Correct narrative pattern selected and documented in `VIDEO_STATE.md`
- [ ] Correct design pattern selected per scene
- [ ] Motion pattern assigned per scene

## Pre-Implementation
- [ ] Timing constants drafted in `src/timing.ts`
- [ ] Scene component list defined in `06-production-plan.md`
- [ ] All claims verified in `02-approved-claims.md`
- [ ] Brand colors / fonts documented in `03-brand-guidelines-summary.md`

## Pre-Render
- [ ] `npx remotion compositions src/index.ts` → correct fps + duration
- [ ] Still-frame test passed
- [ ] Captions file present if voiceover used
- [ ] CTA frame holds minimum 6s
- [ ] `VIDEO_STATE.md` updated to current approved state
- [ ] No anti-patterns present (see `research/video-benchmark-library/anti-patterns.md`)
