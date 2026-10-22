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
