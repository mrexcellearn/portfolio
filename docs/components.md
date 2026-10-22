# Components

Case study components live in `src/components/case/` and are available in every case MDX file without an import
(they are passed in through `src/components/case/index.ts`). Frontmatter values reach the MDX as `props`, for example
`props.metrics`.

## `<BeforeAfter>`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `metrics` | `Metric[]` | required | Usually `props.metrics` from frontmatter. |
| `illustrative` | `boolean` | `false` | Shows the "Illustrative example" badge. Usually `props.illustrative`. |

`Metric` is `{ label, before, after, better: 'up' | 'down', unit? }`. The delta chip is computed from the first number in
`before`/`after`. Its colour follows the **direction of benefit**: green when the change moves the way `better` says is
good, red when it doesn't. Percent values report points (`−25 pts`). Values with no number (other than `none`, which reads
as 0) show a neutral "Qualitative" chip. Every chip also has an arrow and text, so colour is never the only signal.

## `<Flowchart>`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `code` | `string` | required | Mermaid source. Use `subgraph` blocks for swim lanes. |
| `title` | `string` | required | Shown above the diagram and used in its accessible name. |
| `caption` | `string` | | Small muted line under the title. |

Mermaid loads only on pages that use it, and only when the diagram scrolls near the viewport. The source always ships in a
`<details>` block, so the steps are readable with no JS and can be copied. Wide diagrams scroll inside their own container.

## `<StepList>`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `steps` | `{ title, detail?, chips?: string[] }[]` | required | `chips` render as system chips, e.g. a transaction code. |
| `title` | `string` | | Caption above the list. |

## `<CodeBlock>`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `code` | `string` | required | Leading blank lines and trailing whitespace are trimmed. |
| `lang` | `'vba' \| 'ts' \| 'js' \| 'powerfx' \| 'sql' \| 'excel'` | `'ts'` | Highlighted by Shiki at build time. Power Fx uses the JS grammar. |
| `filename` | `string` | | Shown in the tab; otherwise the language name is shown. |
| `highlight` | `number[]` | `[]` | 1-based line numbers to highlight. |

Has a copy button.

## `<Callout>`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `type` | `'insight' \| 'warning'` | `'insight'` | |
| `title` | `string` | `Insight` / `Watch out` | |

Content goes in the slot.

## Case page layout (`src/layouts/Case.astro`)

Renders the header (title, category, date, role, tool chips, illustrative badge) from frontmatter, a sticky table of
contents built from the `##` headings at >= 1100px, the illustrative footer note, the next-case link and a CTA. The MDX body
supplies the sections in the fixed order from PRD section 10.1.
