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

## `<PowerAutomateFlow>`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `steps` | `Step[]` | required | See `src/components/case/flow-types.ts`. |
| `title` | `string` | `Cloud flow` | |
| `caption` | `string` | | |

```ts
type Step =
  | { type: 'trigger'; title; detail?; config?: Record<string, string> }
  | { type: 'action'; title; detail?; config?: Record<string, string> }
  | { type: 'condition'; title; expression; yes: Step[]; no: Step[] }
  | { type: 'approval'; title; detail?; outcomes?: string[] }
  | { type: 'loop'; title; body: Step[] };
```

Steps render as a vertical chain of cards. `config` shows behind a native "Show configuration" toggle (keyboard and no-JS
friendly). Conditions draw Yes/No branches side by side that re-join below; when a branch column is narrower than about
560px the branches stack. Cards reveal one after another on scroll (off under reduced motion; always visible without JS).

## `<PowerAppsScreens>`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `screens` | `Screen[]` | required | See `src/components/case/apps-types.ts`. |
| `frame` | `'tablet' \| 'phone'` | `'tablet'` | Device frame shape. |
| `title` | `string` | `App screens` | Also names the tab list. |
| `caption` | `string` | | |

A `Screen` is `{ name, blocks: Block[], pins?: Pin[] }`. Blocks are neutral primitives: `header`, `search`, `tabs`,
`gallery` (rows with a status badge), `form` (fields of kind `text`, `number`, `dropdown`, `date`, `textarea`,
`attachment`, with `required` and `invalid` messages), `checklist`, `summary`, `status`, `buttons`, `voucher`, `note`,
and `columns` (two columns of blocks). Status badges: Submitted, Draft, Returned, In review, Approved, Paid, Rejected.

Annotation pins: give a block `pin: n` and add `{ n, title, note, code? }` to the screen's `pins`. The pin is a button;
clicking it (or Enter/Space) highlights its note, hovering previews it. `code` renders as a Power Fx `<CodeBlock>`.

Without JS every screen and every note is shown in order. With JS, screens become tabs (Arrow keys, Home, End).

## `<ExcelSheet>`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `sheets` | `Sheet[]` | required | See `src/components/case/sheet-types.ts`. |
| `title` | `string` | `Workbook` | |
| `caption` | `string` | | |

A `Sheet` is `{ name, rows: Cell[][], widths?: number[], highlight?: string[], caption? }`. Row 1 is styled as the header
row. A cell is a string, number, `null`, or `{ v, f?, fmt?, bold?, note? }`. Numbers format as IDR (`1.250.000`) unless
`fmt` is `num` or `pct`; they right-align. Cells with a formula `f` show a small corner mark.

Click a cell, or move with the Arrow keys, Home and End, to show its reference and formula in the formula bar. Sheet tabs
sit along the bottom. Without JS all sheets show in order, and each sheet's formulas are listed in a "Formulas on this
sheet" disclosure (also there with JS, for screen readers and copying). Data is inline (or imported from a `data.ts` next
to the case's `index.mdx`).

## `<MiniDashboard>`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `kpis` | `Kpi[]` | required | `{ key, label, unit?, better: 'up' \| 'down', series: number[], periods?: string[] }` |
| `title` | `string` | `Working capital dashboard` | |
| `caption` | `string` | | |

KPI tiles with the current value, a sparkline and a delta chip comparing the last two points. A "Color by movement /
Color by benefit" toggle (native radio buttons styled as a segmented control, works without JS) switches between the
original mistake (every fall is green) and the fix (colour follows `better`). Each chip also states in words whether the change is
favorable, so colour is never the only signal.
