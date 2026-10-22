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

Full steps arrive with M5. Short version: fill in `CASE_INTAKE_TEMPLATE.md`,
then add `src/content/case-studies/<slug>/index.mdx`.
