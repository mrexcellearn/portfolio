# portfolio

Personal portfolio of Reynaldi (Rey) Karundeng: finance operations and the automation behind it.
Built with Astro + TypeScript, deployed to GitHub Pages. The full spec is in [`prd.md`](prd.md).

## Develop

Requires Node 24 (see `.nvmrc`).

```sh
npm install
npm run dev      # local dev server
npm run check    # type check, lint, content lint
npm run build    # static build into dist/
```

## Deploy

Every push to `main` builds and deploys via `.github/workflows/deploy.yml`.
One-time setup: in the repo, go to **Settings > Pages** and set **Source** to **GitHub Actions**.

## Adding a case study

1. Fill in `CASE_INTAKE_TEMPLATE.md` (business case, before/after, the flow, what you built). Anonymize as you go.
2. Create `src/content/case-studies/<slug>/index.mdx`. Copy an existing case as a starting point.
3. Fill the frontmatter: `title`, `summary` (160 characters max), `category`, `date` (`YYYY-MM`), `role`, `tools`, `metrics` (1-4, each with `better: up` or `down`), and `order`.
4. Keep `status: draft` while you work; drafts are not built into the site.
5. Write the sections in this order with `##` headings: Business case, Before and after, The flow, The build, Results, What I'd do differently.
6. Put component data (app screens, flow steps, sheets) in `<slug>/data.ts` and import it at the top of the MDX. Props for every component are in [`docs/components.md`](docs/components.md).
7. Use real numbers when you have them and set `illustrative: false`. Leave it `true` while numbers are dummy.
8. Add any names that must never appear (employer, company codes, internal names, real vendors) to `forbidden-terms.txt`.
9. Set `status: published`, then run `npm run check` and `npm run build`. Fix anything the content lint flags.
10. Push to `main`. The site deploys automatically.

## Before going public

See PRD section 16: headshot (`public/rey.jpg`), email and links in `src/config/site.config.ts`, the start year in
`src/data/experience.ts`, Playground URLs in `src/data/playground.ts`, real metrics, and `forbidden-terms.txt`.
