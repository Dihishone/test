---
name: slide-deck
description: Generate investment-banking / consulting-grade slide decks as PDF from YAML content. Use when the user asks to build a slide deck, pitch book, client deck, board deck, pitch deck, analysis presentation, or any structured PDF presentation. Enforces IB/consulting gold-standard formatting (action titles, takeaway sublines, source lines, footnotes, consistent typography, chart discipline). Supports all classic analyst graphics (waterfall, football-field, harvey balls, SWOT, 2×2, org chart, flow diagrams, KPI cards, sensitivity, sources & uses, etc.).
---

# Slide Deck Skill

Generates pixel-consistent, customer-ready IB/consulting-style slide decks as PDF from a single YAML input. Zero formatting iterations — the skill owns the design, you own the content.

## When to invoke

User says any of: "build a slide deck", "pitch book", "board deck", "investor deck", "consulting deck", "pitch deck", "client deck", "analyst presentation", "board materials", "IB deck", "PDF presentation", "deck from data", or gives you content and asks for a PDF deck.

## Workflow

1. **Check inputs**
   - Has the user provided a YAML content file? If not, ask them to sketch slide content OR walk them through it section by section.
   - Logos: client logo (top-right) and own logo (bottom-left) — if missing, ask for file paths or allow empty.
   - Theme colors (CI): primary, accent, neutral. Default to Aston-Martin-style green/yellow if user has no preference.

2. **Draft YAML deck file** at `<project>/deck.yaml` (or user-specified path). Follow the schema in `examples/sample-deck.yaml`. Every slide MUST have:
   - `layout`: one of the supported types
   - `title`: **action title** (the message, not the topic — e.g., "Hard restructuring stabilises balance sheet but triggers equity wipe-out", NOT "Restructuring Scenario I")
   - `takeaway` (for content layouts): one-sentence "so-what" subline
   - `source` (for data slides): `Source: Company filings, team analysis` — REQUIRED on any slide with numbers
   - `footnotes` (optional): superscript-numbered annotations

3. **Build HTML**
   ```bash
   cd .claude/skills/slide-deck
   node build.mjs <path-to-deck.yaml> <path-to-output.html>
   ```

4. **Render PDF**
   ```bash
   node render.mjs <path-to-output.html> <path-to-output.pdf>
   ```

5. **Open PDF for user review** — tell user the output path. Never iterate on formatting; if the deck looks wrong, the YAML is wrong.

## Gold-standard rules (enforced)

Before writing YAML, internalise these rules. The skill enforces them structurally; you must enforce them in content:

1. **Action titles**: Titles state the message. "Revenue grew 24% driven by new product launches" not "Revenue growth". If the title could be a chapter heading in a textbook, rewrite it.

2. **One message per slide**: Every slide answers one question. If you have two messages, make two slides.

3. **Pyramid principle**: Title = conclusion. Takeaway = why. Body = proof.

4. **Source on every data slide**: Format `Source: <source>, <source>`. Bottom left, italic, gray. Mandatory.

5. **Footnotes for assumptions**: Use superscript `¹ ² ³` in text. Footnote text above source line.

6. **Number discipline**:
   - Negatives in parentheses: `(484)` not `-484`
   - Consistent decimal places within a table
   - Unit suffix once per column header (`£m`), not per cell
   - Right-align numbers in tables

7. **Colour discipline**:
   - Primary = the thing the reader should focus on
   - Accent = one highlight (the answer)
   - Neutral = comparison / context
   - Never rainbow. Max 3 colours on a data slide.

8. **No chartjunk**: No 3D, no gradients, no drop-shadows, no decorative icons. Data ink only.

9. **Text discipline**:
   - Bullets: `**Bold-label**: description text`
   - Max 6 bullets per block
   - Max ~12 words per bullet
   - No walls of text — if a sentence wraps 3 lines, shorten or split

10. **Confidentiality**: If deck is external, include `confidentiality: "Strictly Private & Confidential"` in meta.

## Supported layouts

See `lib/layouts.mjs` for full schemas. Headline types:

- `cover` — title page with client name, project name, date, own logo
- `section-divider` — big number + section title (between chapters)
- `agenda` — bulleted agenda with current section highlightable
- `executive-summary` — 3–5 key findings with icon bullets
- `content` — flexible body with `body.type` controlling zone layout:
  - `single` — one widget fills body
  - `two-column` — left/right (50/50 or 60/40 or 66/33 via `ratio`)
  - `three-column` — three equal columns
  - `grid-2x2` — four quadrants
  - `sidebar-right` — main area + right sidebar (e.g., commentary)
  - `sidebar-left`
- `thank-you` — closing slide
- `tombstone` — deal tombstone (IB-style)
- `divider-image` — full-bleed image with title overlay

## Supported widgets (body content)

All widgets go inside `content` layouts. Schemas in `lib/widgets.mjs`:

**Analytical:**
- `bullets` — bold-label bullet list
- `pros-cons` — advantages/disadvantages (+/- icons, dashed border)
- `harvey-ball-table` — comparison with 0/25/50/75/100% filled circles
- `flow-diagram` — horizontal chevron flow of boxes
- `process-arrow` — big arrow with steps inside
- `value-chain` — Porter-style primary/support activities
- `swot` — 2×2 SWOT matrix
- `matrix-2x2` — BCG-style 2×2 with labelled axes and positioned items
- `numbered-callouts` — roman-numeral badges with text
- `label-block` — big colored block with centered label
- `section-header` — horizontal bar with white caption (header within body)
- `kpi-cards` — metric + label row
- `timeline` — horizontal timeline with milestones
- `org-chart` — entity/deal structure tree
- `quote` — pull-quote with attribution
- `financial-table` — years × line-items P&L style
- `sources-and-uses` — IB-standard two-column financing table
- `sensitivity-table` — 2-axis sensitivity with colour-scaled cells
- `tombstone-block` — deal summary box
- `callout-box` — highlighted text box with optional icon

**Charts (all via ECharts):**
- `chart.column` — vertical bars
- `chart.bar` — horizontal bars
- `chart.stacked-column`, `chart.stacked-bar`
- `chart.100-stacked-bar` — percentage stacks
- `chart.clustered-column`
- `chart.line`
- `chart.area`
- `chart.combo` — bars + line on dual axis (e.g., Revenue + Margin %)
- `chart.waterfall` — bridge chart with positive/negative/total bars
- `chart.pie`, `chart.donut`
- `chart.scatter`, `chart.bubble`
- `chart.football-field` — horizontal valuation ranges with current-price line
- `chart.marimekko` — variable-width stacks (market × segment)
- `chart.heatmap`

## Theming

Each deck YAML has `meta.theme` with:
```yaml
theme:
  primary: "#0C3B2E"    # dominant colour (titles, headers, main data)
  accent: "#C8D400"     # highlight colour (the answer, key positive)
  neutral: "#6B7280"    # comparison / context data
  text: "#111827"       # body text
  muted: "#6B7280"      # secondary text, sources, footnotes
  background: "#FFFFFF"
  rowHighlight: "#E5E7EB"  # highlighted table rows
```

If user provides only `primary` and `accent`, the rest are derived with sensible defaults.

## Logo handling

- `meta.client_logo`: path to client logo, placed top-right on every content slide (not on cover/section-divider/thank-you where it goes center)
- `meta.own_logo`: path to your firm logo, placed bottom-left (can set a default in `assets/own-logo.png` or `.svg`)

## Page setup

- Size: 1280×720 px (16:9, equivalent to 13.33"×7.5" standard PowerPoint)
- Margin: 0 (bleed all the way)
- Safe zone: 48px inside
- Header strip (title + logo): top 90px
- Footer strip (source + logo + page #): bottom 48px
- Body area: everything in between with 48px side padding

## Commands

```bash
# Build HTML from YAML
node build.mjs deck.yaml deck.html

# Render PDF
node render.mjs deck.html deck.pdf

# One-shot
node build-and-render.mjs deck.yaml deck.pdf
```

## First-time setup (if node_modules missing)

```bash
cd .claude/skills/slide-deck
npm install
npx playwright install chromium
```

## Error handling

- Missing required field → build.mjs errors with slide index and field name
- Invalid widget type → build.mjs lists valid types
- Chart data inconsistent (series lengths mismatch) → build.mjs reports
- Missing logo file → warning, placeholder text shown

Never ship a deck with warnings. Fix the YAML.
