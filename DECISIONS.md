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
