# Decisions

Choices made where the PRD was silent or where something had to change. Newest last.

| # | Milestone | Decision | Why |
|---|---|---|---|
| 1 | M0 | Astro 7 with the `glob()` content loader in `src/content.config.ts` instead of `type: 'content'` | Current Astro API; the PRD's `type: 'content'` form is legacy. Schema fields are unchanged. |
| 2 | M0 | Node 24 (`.nvmrc`) | Astro 7 needs Node >= 22.23.4; 24 is the current LTS. |
| 3 | M0 | Deployed as a project site at `https://mrexcellearn.github.io/portfolio/` (`base: '/portfolio'`) | Repo name is `portfolio`. Switch `site`/`base` in `astro.config.mjs` if a custom domain is added. |
| 4 | M0 | Fonts via `@fontsource-variable/inter` and `@fontsource/jetbrains-mono` | Self-hosted, bundled at build, no third-party requests. |
| 5 | M0 | Lint with ESLint + `typescript-eslint` + `eslint-plugin-astro` | Smallest setup that covers `.ts` and `.astro`. |
| 6 | M0 | `npm run check` = `astro check` + ESLint + `scripts/content-lint.mjs`; CI runs it before build | Matches PRD section 13 quality gates. |
| 7 | M1 | "How I can help" rows are native `<details>` with a small CSS-built strip (`MiniVisual.astro`) | Works with no JS and is keyboard accessible. Strips are decorative (`aria-hidden`); the row text carries the meaning. They can be swapped for mini versions of the M3 components later. |
| 8 | M1 | Selected work and Testimonials hide entirely when empty; the Proof arrow link to Case 1 appears only once cases are published | PRD: never show empty placeholder cards. |
| 9 | M1 | Jakarta time uses `en-GB` 24-hour format and hides below 1000px wide; the availability chip stays visible | Keeps the nav on one line on tablets and phones. |
| 10 | M1 | `Person` JSON-LD added to Home now (PRD lists it under M5) | Cheap to add while building the page. |
| 11 | M2 | MDX reads frontmatter through `props` (`<BeforeAfter metrics={props.metrics} />`); case components are injected via `components`, so MDX needs no imports | Keeps each case file content-only. |
| 12 | M2 | Delta chips: first number in each value; `%` values report points; `none` reads as 0; values with no number show a neutral "Qualitative" chip | The PRD metrics include text values like "frequent" and "n/a" that have no honest numeric delta. |
| 13 | M2 | Unit tests for the direction-of-benefit logic (`tests/metrics.test.ts`, Node's built-in test runner) run inside `npm run check` | Covers the M2 acceptance criterion for both `up` and `down`. |
| 14 | M2 | Power Fx is highlighted with Shiki's JS grammar; VBA uses Shiki's `vb` grammar | Shiki has no Power Fx grammar. |
| 15 | M2 | Case 1 is written now (M2 sections only) as the engine's test case; M4 adds its rich components | Avoids a throwaway test case. |
| 16 | M2 | Mermaid 12, dynamically imported per diagram when it nears the viewport, `securityLevel: 'strict'` | PRD: Mermaid only on case pages and only when visible. |
| 17 | M3 | Case data (screens, flow steps, sheets) lives in a `data.ts` next to each case's `index.mdx` and is imported by the MDX | Keeps the MDX readable and typed. CSV input was not needed for v1. |
| 18 | M3 | App pins attach to a block (`pin: n`) rather than x/y coordinates | Pins stay put when the mock reflows at narrow widths. |
| 19 | M3 | Pins: click/Enter pins a note, hover previews it; notes are always rendered as a list next to the mock | Works for mouse, keyboard, touch and no-JS. |
| 20 | M3 | `<MiniDashboard>` toggle is a pair of radio inputs styled with `:has()` | The toggle works with no JS. |
| 21 | M3 | Flow branches stack via a container query when their column is narrow, not only at a viewport breakpoint | Nested conditions stay readable on desktop and at 360px. |
| 22 | M4 | "Color by movement" (the original mistake) colours every fall green and every rise red | Matches the PRD story: under that rule a falling DPO looked "good". |
| 23 | M4 | Case 2 dummy KPIs are internally consistent (CCC = DSO + DIO − DPO; the Calc sheet ratios match the Input balances on a 30-day basis) | So the sheet, dashboard and text agree if someone checks. |
| 24 | M4 | Backlog stubs carry one placeholder metric each | The schema requires at least one metric; drafts are never rendered. |
| 25 | M4 | Case 1 references a generic PO number ("PO 4500-0000") and generic document numbers | Dummy values only; no real document numbers. |
| 26 | M5 | OG images generated at build by an Astro endpoint (`src/pages/og/[...slug].png.ts`) with satori + resvg and the Inter WOFF files | No external service; every page and case gets its own 1200x630 card on `--band`. |
| 27 | M5 | Added `--ok-text` (#1F7A44) and `--warn-text` (#8A5A12) tokens for small status text and white-on-colour pins; the PRD's `--ok`/`--warn` stay for dots and lines | PRD colours fail WCAG AA 4.5:1 for 13px text (3.4:1 and 3.3:1). |
| 28 | M5 | Shiki theme `github-light-high-contrast` | The default `github-light` orange fails AA contrast. |
| 29 | M5 | About page story is placeholder copy in Rey's voice, marked `[PLACEHOLDER]` in the source | Rey replaces it with his own words. |
| 30 | M5 | Analytics flag exists in `site.config.ts` (`analytics.enabled: false`) but no analytics code ships | PRD: off by default; nothing to load until a provider is chosen. |
| 31 | Post-launch | Headings switched from weight 300 to 600 (`--fw-heading`), tighter tracking; home greeting is "Hi, I'm Reynaldi." | Rey picked option B from the font previews: a heavier, more corporate look. Overrides PRD 7.1/7.2 "weight 300". |
| 32 | Post-launch | Experience rewritten from Rey's CV as full-width rows with process-improvement highlights; Proof moves below it as a 2x2 grid | Rey asked to emphasize business-process improvement. Past employers use industry labels too, and product names (Coupa, Concur, SAP) appear in text only. |
