# B2B Explainer Video Principles
**Default format: 60–90 seconds.**

---

## Strategic Principles

- Every video has one job: move one ICP one step down the funnel
- Match format to buyer stage: awareness = emotional hook, evaluation = proof + architecture, existing customer = feature update
- Default to 60–90s. Override only with explicit brief reason (e.g., conference keynote, onboarding walkthrough)
- One core problem. One core resolution. Do not attempt to prove everything

## Narrative Principles

- Buyer is the hero; product is the guide
- Open with a recognized, specific pain — not a category description
- Pain phase: 15–20% of runtime (≈10–18s at 75s total)
- Agitate before resolving: show consequences, not just the inconvenience
- Value proposition must be fully stated by the 45-second mark
- Second-person narration ("you," "your team") outperforms third-person product description
- End with a next step; never end on a logo

## Pacing Principles (60–90s)

| Phase | Time | Purpose |
|---|---|---|
| Hook | 0–10s | One pain or one striking claim |
| Agitate | 10–25s | Cost of the problem (time, risk, money) |
| Solution | 25–45s | Product name + core mechanism |
| Benefits | 45–65s | 2–3 outcomes, animated not stated |
| Proof signal | 65–72s | One stat, customer name, or certification |
| CTA | 72–80s | One clear next action |

- No scene should run longer than 15s without a visual change
- If a section feels slow, cut the voiceover — don't add animation
- Top-load: viewer attention drops sharply after 60s; core value must land by 0:45

## Design Principles

- Dark backgrounds for security, infra, developer tools; light for SMB SaaS and HR/finance
- Maximum 3 colors per video; assign semantic roles (threat / protected / neutral)
- Spatial/architectural diagrams outperform UI screenshots for platform products
- UI, when shown, must be idealized: clean data, no notification badges, no clutter
- Typography carries hierarchy; don't depend on color alone
- Kinetic typography (phrases animate on cue) reads premium; static overlays read cheap

## Motion Principles

- Every animated element's entry is locked to a specific spoken word or audio beat
- Stagger entering elements by a fixed interval (80–120ms); randomness reads amateur
- Large areas of visual stillness make moving elements draw the eye precisely
- Easing: objects decelerate into final position (ease-out authority); avoid symmetrical ease-in-out
- Custom cubic-bezier curves signal craft; default AE presets signal templates
- Reduce frame rate for warmth/brand films (15–24fps); use full rate only for UI micro-animation
- No `repeat: -1` / infinite loops — they train viewers to ignore motion

## Credibility & Claims Principles

- Animate quantified outcomes (bars grow, numbers count up) rather than state them as narration
- Proof signals: one stat, one customer logo, or one certification mark — not all three
- Never make market leadership claims without a named source
- Claims must be pre-approved before scripting begins (see `02-approved-claims.md`)
- Forbidden claim patterns: "best," "only," "leading" (without source), "revolutionary"

## CTA Principles

- One CTA per video — never two competing actions
- Best-performing B2B CTAs: "Book a demo" > "Start free trial" > "Learn more"
- CTA frame minimum: 6s hold on screen; never animate it away before viewer reads it
- URL / next step must appear as on-screen copy, not only in narration

## Token-Efficient Workflow Principles

- Default context for new projects: `b2b-video-principles.md` + pattern libraries + `anti-patterns.md` + customer `VIDEO_STATE.md` + approved claims + brand summary
- Load full benchmark library (`source-log.md`) only when establishing a new pattern or reviewing creative direction
- Use Plan Mode for: initial concept, full storyboard changes, multi-scene rewrites, Remotion architecture changes
- Skip Plan Mode for: copy edits, single-timing adjustments, one-scene polish
- After every material change: update `VIDEO_STATE.md` compactly
- Implementation uses the `/remotion` skill for code; `/hyperframes` for HTML-based preview compositions
