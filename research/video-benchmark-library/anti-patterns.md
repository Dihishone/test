# Anti-Patterns — B2B Explainer Video

These patterns weaken or kill conversion. Each has a fix.

---

## Narrative Anti-Patterns

| Anti-Pattern | Why It Fails | Fix |
|---|---|---|
| **Feature list opening** | "Our platform does X, Y, Z" has no tension; buyers don't care before they feel the pain | Open with one specific, recognizable pain the ICP experiences daily |
| **Generic category pain** | "Businesses waste time on inefficient processes" describes every company, therefore none | Narrow the pain: name the role, the scenario, the cost ("Your SecOps team spends 3h/day triaging false positives") |
| **Value proposition overload** | Trying to prove 5 things in 75s proves nothing — each claim dilutes the others | Pick one core problem and one core resolution per video |
| **Product-as-hero framing** | "We built X" positions the vendor, not the buyer — enterprise buyers resist being sold to | Buyer's team is the hero; product is the guide. "You can now…" not "We enable…" |
| **CTA-absent ending** | Ending on a logo with no next step loses all accumulated intent | Minimum 6s CTA frame with one action + URL on screen |
| **Weak CTA copy** | "Learn more" has no commitment or specificity | Use "Book a demo," "Start free," or "See how [Company] did it" |
| **Narrative without buyer urgency** | A pleasant story with no cost of inaction = a nice video no one acts on | Every narrative must answer: what is the cost of not buying? State it by 0:30 |

---

## Visual Anti-Patterns

| Anti-Pattern | Why It Fails | Fix |
|---|---|---|
| **Template-visible motion** | AE default presets (wipes, bounces, spins) signal low-budget to sophisticated buyers | Use custom `cubic-bezier` easing; design motion with purpose, not preset |
| **Cluttered UI screenshots** | Real product screens with notifications, real data, and sidebar clutter read as "hard to use" | Stage idealized UI: clean data, no badges, no irrelevant menus |
| **Consumer-register palette** | Bright primaries and playful illustration alienate security/finance/infra buyers | Dark, constrained, 2–3 color palette; semantic color roles (threat / safe / neutral) |
| **Ambient motion overload** | Constant background animation trains viewers to ignore motion entirely | Reserve motion for emphasis; large areas of stillness make the moving element command attention |
| **Voiceover/visual misalignment** | Narration about Feature A while the screen shows Feature B forces dual cognitive load | Sync each visual scene to its corresponding voiceover section; write script and visual in parallel |
| **Illegible dashboard** | Showing a real dashboard at video resolution — too dense, unreadable, signals complexity | Recreate key metrics in the video as styled animated graphics; never screengrab raw dashboards |
| **Over-animated icons** | Bouncing, spinning, or constantly looping icons around static content create visual noise | Static icons or single entrance animation only; icons support copy, they don't perform |
| **Stock-style visuals** | Generic office imagery, handshake photos, or vector illustrations signal "we couldn't afford custom" | Abstract motion graphics or product-native visuals only; if budget is limited, lean into typography |

---

## Pacing Anti-Patterns

| Anti-Pattern | Why It Fails | Fix |
|---|---|---|
| **Slow intro (>12s before product context)** | Viewers drop off; B2B attention is not earned, it's borrowed | Hook within 5s; product context by 0:20 |
| **Too much text per scene** | More than 6 words of on-screen copy per scene creates reading conflict with narration | Maximum 5 words per scene as a display element; longer copy = subtitle, not overlay |
| **Back-loaded value proposition** | Saving the product reveal for 0:45+ in a 75s video means most viewers missed it | Full value proposition stated by 0:45 |
| **Proof sections without proof** | "Trusted by leading companies" with no logos or stats is noise | Name the company, or show the logo, or cite the metric. Unnamed proof = no proof |

---

## Strategic Anti-Patterns

| Anti-Pattern | Why It Fails | Fix |
|---|---|---|
| **Copying benchmark videos too closely** | Slack's chaos-to-order metaphor was original; reusing it reads as imitation | Extract the abstract principle (contrast narrative), not the execution (shapes becoming icons) |
| **Unsupported market leadership claims** | "The only," "The leading," "Best-in-class" without a named source = credibility damage when buyer Googles it | Source every superlative or cut it; use customer-attributed outcomes instead |
| **Vague transformation scenes** | "Transform your business" animated as a spinning globe or a sunset = says nothing | Name the specific transformation: "Cut alert fatigue by 60%" or "From 6 tools to one" |
| **Wrong format for buyer stage** | A cinematic brand film used for mid-funnel evaluation; a demo video used for brand awareness | Map video type to funnel stage; 60–90s narrative explainer = awareness/consideration |
| **No captions** | 80% of LinkedIn/social video is watched without sound; enterprise procurement often requires accessibility | Always add captions; use `.claude/skills/remotion/rules/display-captions.md` for implementation |
