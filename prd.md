# PRD: Rey's Portfolio Website

> Hand this file to Claude Code. Build in milestones (section 14). Use the dummy content in section 11 until real case content arrives. Do not ask questions unless truly blocked; make the call, note it in `DECISIONS.md`, and move on.

---

## 1. Summary

A clean, professional, single-person portfolio website for **Reynaldi (Rey) Karundeng**, a Finance Supervisor (AP & Treasury) who builds the automation behind finance operations. The site proves two things at once: **finance depth** (AP, treasury, SKBDN, working capital) and **builder skill** (Power Platform, SharePoint, Excel/VBA, Google Apps Script).

Its signature feature: each **case study is built in code**, not shown as screenshots. Flowcharts, Power Automate flows, Power Apps screens and Excel sheets are rendered as live, styled, interactive components, so the case studies are also proof of craft and are safe to publish (no real company screenshots).

## 2. Goals and non-goals

**Goals**
1. Convince recruiters (including Australian accounting/finance roles) that Rey is a real operator with measurable results.
2. Convince freelance clients (Power Platform, finance automation) that he can deliver.
3. Give Mr. Excellearn followers one place to see the deeper work and try his tools.
4. Make adding a new case study a **content-only** task (fill a template, drop it in a folder).

**Non-goals (v1)**
- No CMS, blog, comments, login, or backend.
- No dark mode, no multi-language (English only; structure must allow Bahasa Indonesia later).
- No employer branding, logos, or real internal screenshots anywhere.

## 3. Audiences

| Audience | Wants | Where they look |
|---|---|---|
| Recruiter / hiring manager | Role clarity, proof, results | Hero, Proof, 1-2 case studies |
| Freelance client | "Can he build my thing?" | Services, case studies, Playground, Contact |
| Learner (Mr. Excellearn) | Practical tools and teaching | Playground, About |

## 4. Positioning and copy

- **Headline (right of hero):** "Finance operations lead who builds the automation behind AP & Treasury."
- **Greeting (left of hero):** "Hi, I'm Rey."
- **Subline:** "AP & Treasury Supervisor based in Jakarta, Indonesia. I design and ship Power Platform, Excel and Apps Script solutions that replace manual finance work."
- **One-liner for meta/OG:** "I run AP & Treasury, and I build the systems that make it run itself."
- Voice: direct, grounded, plain. No buzzwords ("synergy", "leverage" as a verb, "passionate"). Short sentences.
- Three recurring pillars: **Finance operations depth**, **Builder**, **Teacher** (Mr. Excellearn).

## 5. Content and confidentiality rules (hard requirements)

1. **Anonymize all case content.** Use a fictional company name ("Acme Mining" or "the company"), fictional vendors (e.g. "PT Contoh Supplier"), dummy amounts. Never include: the employer's name, logo, company codes, internal layout/variant names, real vendor names, real amounts, internal document numbers, or screenshots.
2. **Employer display is a config flag.** `site.config.ts` has `showEmployerName: false`. When false, show "Mining & minerals industry, Indonesia". Never hardcode an employer name in components or content.
3. **Illustrative data must be visibly flagged.** Any case with `illustrative: true` shows an "Illustrative example" badge next to its metrics and a footer note. The build must **warn** (not fail) when a published case still has `illustrative: true`. Rey replaces numbers with real ones later.
4. **No workplace commentary.** The site never mentions colleagues, managers, conflicts, or job-hunting. The availability chip is about **freelance** only.
5. **Trademarks.** Mention Power Apps, Power Automate, SharePoint, SAP, Excel by name in text only. Do not use their logos or lookalike branded icons. Use neutral, original icons. Footer note: "Product names are trademarks of their respective owners."
6. **No fake testimonials.** The testimonials section renders only if real entries exist.

## 6. Tech stack and decisions

| Decision | Choice | Why |
|---|---|---|
| Framework | **Astro** (static output) + TypeScript | Content collections make case studies content-only; ships almost no JS |
| Content | MDX per case study + typed frontmatter (zod schema) | Components can be embedded inside narrative |
| Styling | Plain CSS with design tokens (CSS variables), no UI framework | Clean, small, fully controllable |
| Interactivity | Small vanilla TS islands; `client:visible` only where needed | Performance |
| Diagrams | Mermaid for flowcharts (client-side render, themed), with `<details>` source fallback | Fast to author |
| Code highlighting | Shiki (build time) | No runtime cost |
| Fonts | Inter (variable) self-hosted; JetBrains Mono for code | Clean, neutral |
| Hosting | **GitHub Pages** via GitHub Actions | Already used for other tools; reachable from restricted work networks |
| Package manager | npm | Already in use |

Claude Code may swap a library if there's a clear reason; record it in `DECISIONS.md`.

## 7. Design system

**Inspiration, not imitation.** The reference is a minimalist designer-portfolio layout (split hero, quiet palette, list-style resume rows, 2x2 work grid). Take the *principles*; do not reuse its copy, imagery, or exact layout. The result must be original.

### 7.1 Tokens (`src/styles/tokens.css`)

```css
:root {
  /* color */
  --bg: #FFFFFF;
  --band: #F3F4EE;          /* warm grey-green section band */
  --ink: #111111;           /* text + primary button */
  --muted: #6B6F6A;         /* secondary text, metadata */
  --line: #E3E5DF;          /* 1px dividers */
  --card: #FFFFFF;
  --ok: #2E9E5B;            /* availability dot, "improved" deltas */
  --warn: #B7791F;          /* illustrative badge */
  --bad: #C0392B;           /* "worse" deltas, used sparingly */
  /* type */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --fs-display: clamp(2.5rem, 5vw + 1rem, 4.5rem);  /* weight 300, tracking -0.02em */
  --fs-h2: clamp(1.5rem, 1.5vw + 1rem, 2rem);       /* weight 400 */
  --fs-h3: 1.125rem;                                 /* weight 500 */
  --fs-body: 1rem;                                   /* line-height 1.6 */
  --fs-small: 0.8125rem;                             /* muted metadata */
  /* layout */
  --maxw: 1120px;
  --gutter: 24px;
  --radius: 12px;
  --radius-sm: 8px;
  --space: 8px;  /* use multiples of 8 */
}
```

### 7.2 Principles
- **Almost no color.** Black on white and a warm grey band. Color only carries meaning (ok / warn / bad).
- **Whitespace is the structure.** Section padding 96px desktop / 64px mobile. Separate with 1px `--line`, not boxes or shadows. Cards: 1px border, `--radius`, no heavy shadow.
- **Large light headings, small quiet metadata.** Display text weight 300. Metadata in `--small` and `--muted`.
- **Buttons:** primary = `--ink` background, white text, `--radius-sm`, 44px min height. Secondary = transparent, 1px `--line` border. Hover: subtle lift (translateY -1px) and darker border; 150ms.
- **Motion:** fade-up on scroll (200-300ms, 8px travel). Flow components reveal steps sequentially. Respect `prefers-reduced-motion` (disable all).
- **Iconography:** one consistent outline icon set (e.g. Lucide, inline SVG), 1.5px stroke.
- **Grid:** 12-col, max width `--maxw`, hero is 2 columns on >=900px, stacked below.

## 8. Information architecture

```
/                       Home
/case-studies           Index (grid)
/case-studies/[slug]    Case study detail
/playground             Tools and experiments
/about                  About + skills + teaching
/contact                Contact (mailto + links)
/404
```

**Global nav:** logo mark (initials "RK" in a rounded square) · Case studies · Playground · About · Contact. Right side: availability chip + Jakarta local time (JS, `Intl.DateTimeFormat`, `Asia/Jakarta`, updates each minute; SSR fallback "Jakarta, Indonesia"). Nav is sticky with a subtle backdrop blur after scroll; collapses to a menu button below 720px.

**Footer:** short sign-off, links (LinkedIn, TikTok @ Mr. Excellearn, email), trademark + anonymization note, copyright.

## 9. Home page sections (top to bottom)

1. **Hero.** Left: "Hi, I'm Rey." (display). Right: headline, subline, buttons `[See case studies]` (primary) and `[Talk with me]` (secondary, mailto). Small avatar placeholder next to the greeting (`public/rey.jpg`, fallback to initials).
2. **Experience & Proof** (on `--band`). Two columns of list rows (icon, title, small date, subtle arrow where there's a link).
   - *Experience:* "Finance Supervisor, AP & Treasury | Mining & minerals industry, Indonesia | `[START YEAR]` - Present". Leave room for 2 more rows (`experience.ts`).
   - *Proof:* "Payment-request app, live in production"; "AI Wealth Tracker: 40 sales from one organic post"; "SOP author: SKBDN process guideline"; "University guest lecture on finance and automation `[CONFIRM DELIVERED BEFORE PUBLISHING]`". Data in `proof.ts`.
3. **How I can help.** Three expandable rows, each with a small component-built visual strip (a mini flow, a mini sheet, a mini screen built from the real components, not images):
   - *Finance process automation:* Power Apps, Power Automate, SharePoint, VBA, Apps Script.
   - *Dashboards and management reporting:* working capital, cash and liquidity, KPI dashboards.
   - *SOPs and process documentation:* work instructions, process guidelines, audit-ready documentation.
4. **Selected work.** Grid of published case studies (1-4 cards; layout adapts, never shows empty placeholder cards). Card: title, category chip, date, one-line outcome, hover reveals "View case study".
5. **Playground teaser.** Three tool cards + "See all" link.
6. **Testimonials** (renders only if `testimonials.ts` is non-empty).
7. **Closing CTA.** "Still running a process on email and Excel? Let's talk." `[Talk with me]`.

## 10. Case study system (core of the product)

### 10.1 Page structure (fixed order)

1. **Header:** title, category, date, role, tools (chips), `Illustrative` badge if flagged.
2. **Business case:** 2-4 short paragraphs: context, problem, why it mattered.
3. **Before / After:** `<BeforeAfter>` with 3-4 metric rows.
4. **The flow:** Mermaid flowchart(s) of the process (as-is and/or to-be).
5. **The build:** any mix of `<PowerAutomateFlow>`, `<PowerAppsScreens>`, `<ExcelSheet>`, `<CodeBlock>`, `<StepList>`, each with a short explanation.
6. **Results:** key outcomes in prose.
7. **What I'd do differently:** 2-3 honest bullets.
8. **Next case** link + CTA.

A sticky mini table of contents on the left for >=1100px.

### 10.2 Content model (`src/content.config.ts`)

```ts
const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    summary: z.string().max(160),          // card + meta description
    category: z.enum(['Automation','Reporting','Documentation','Process']),
    date: z.string(),                       // "2026-08"
    role: z.string(),
    tools: z.array(z.string()),
    status: z.enum(['draft','published']).default('draft'),
    illustrative: z.boolean().default(true),
    metrics: z.array(z.object({
      label: z.string(),
      before: z.string(),
      after: z.string(),
      better: z.enum(['up','down']),        // direction of GOOD, drives color
      unit: z.string().optional(),
    })).min(1).max(4),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});
```

Important: `better` encodes the **direction of benefit**, not movement. Color the delta green when the change moves in the good direction, red when it doesn't (e.g. DPO falling is unfavorable; handling time falling is favorable).

### 10.3 Components (`src/components/case/`)

All components are data-driven (props or a JSON/YAML block in the MDX), progressively enhanced (content visible without JS), keyboard accessible, and styled only with tokens.

**`<BeforeAfter metrics={...} />`**
Two columns, "Before" (muted) and "After" (ink), one row per metric with an arrow and a computed delta chip. Stacks on mobile.

**`<Flowchart>`**
Wraps Mermaid. Themed to tokens (ink lines, `--band` node fill, 12px radius, Inter). Supports subgraphs as swim lanes (e.g. Requester / AP / Treasury). Shows the Mermaid source in a `<details>` for no-JS and for copy. Responsive: horizontal scroll container with fade edges rather than shrinking text below 12px.

**`<PowerAutomateFlow steps={...} />`**
Renders a vertical chain of step cards joined by connector lines, in the visual spirit of a cloud flow designer but original (no vendor logos).
```ts
type Step =
  | { type: 'trigger'; title: string; detail?: string; config?: Record<string,string> }
  | { type: 'action'; title: string; detail?: string; config?: Record<string,string> }
  | { type: 'condition'; title: string; expression: string; yes: Step[]; no: Step[] }
  | { type: 'approval'; title: string; detail?: string; outcomes?: string[] }
  | { type: 'loop'; title: string; body: Step[] };
```
- Each card has a type icon, a title, a one-line detail, and a "Show configuration" toggle revealing key/value config (e.g. List name, expression).
- Conditions render two side-by-side branches labelled Yes/No that re-join below (stack on mobile).
- Steps reveal sequentially on scroll.

**`<PowerAppsScreens screens={...} frame="tablet|phone" />`**
Renders mock screens inside a device frame, built from primitives, not images.
- Primitives: `AppHeader`, `SearchBar`, `Gallery` (rows with status `Badge`), `Form` (labelled fields, dropdowns, date, attachment slot), `Button`, `Tabs`, `AttachmentChecklist`, `StatusBadge`.
- Screen tabs above the frame to switch between screens.
- **Annotation pins:** numbered pins on the mock; hovering/clicking shows a side note and optionally a Power Fx snippet (e.g. a `Patch(...)` or a badge color rule). This is how the "how it works" gets explained.
- Neutral generic styling, not the vendor's UI chrome.

**`<ExcelSheet sheets={...} />`**
A faithful, original-styled spreadsheet view.
- Column letters, row numbers, header row styling, right-aligned numbers, IDR formatting helper (`1.250.000`).
- Click a cell: highlight it and show its **formula** in a formula bar above the grid (display only).
- Multiple sheet tabs along the bottom (e.g. `FBL1N`, `PV Formulated`).
- Optional highlighted ranges and a short caption per sheet.
- Data from inline JSON or a CSV in the case folder.

**`<CodeBlock lang="vba|ts|js|powerfx|sql" />`**
Shiki-highlighted, copy button, optional filename tab and line highlights. For VBA, Apps Script, Power Fx, Office Scripts.

**`<StepList steps={...} />`**
Numbered procedure with optional "system chips" (e.g. a transaction-code chip). Used for as-is manual processes.

**`<MetricCard>`, `<Callout type="insight|warning">`, `<Figure caption>`** for supporting layout.

### 10.4 Authoring workflow (what Rey does for each new case)

Rey fills `CASE_INTAKE_TEMPLATE.md` (see Appendix A) with: business case, before/after, the flow, and what he built. Claude Code then converts it into `src/content/case-studies/<slug>/index.mdx`, builds the needed flowcharts, Power Automate flow, Power Apps screens and Excel sheets **from the description**, and flags anything it had to assume. Where Rey hasn't supplied detail, Claude Code builds a sensible version itself and marks assumptions with a `<!-- ASSUMPTION: ... -->` comment and a line in `DECISIONS.md`.

## 11. Dummy cases for v1 (build both fully)

Both are `status: published`, `illustrative: true`. Company: "Acme Mining". Vendors: "PT Contoh Supplier", "CV Sample Logistik". All amounts dummy.

### Case 1: Urgent Payment Request App

- **Category:** Automation. **Tools:** Power Apps, SharePoint, Power Automate, SAP, Excel. **Role:** Designer and builder.
- **Summary (<=160):** "Replaced email-based urgent payment requests with a tracked Power Apps workflow, from request to treasury review."
- **Business case:** Urgent payments arrived by email with missing invoices or approvals. AP re-checked every field by hand, posted an advance in SAP, built a payment voucher, then chased treasury for review. Nothing showed status, and mistakes surfaced late.
- **Metrics (illustrative):**
  | Metric | Before | After | Better |
  |---|---|---|---|
  | Avg handling time per request | 45 min | 15 min | down |
  | Requests returned for missing documents | 30% | 5% | down |
  | Requests with a visible status | 0% | 100% | up |
  | Voucher preparation errors per month | 6 | 1 | down |
- **Flowchart (to-be, Mermaid, swim lanes Requester / AP / Treasury):** Requester submits request with invoice + approval → system validates required fields → missing documents? (yes: returned to requester with reason) → AP verifies request → posts advance in SAP → creates payment voucher → attaches voucher and submits → treasury review → approved (paid) / rejected (back to AP with comments).
- **`<StepList>` (as-is manual process):** 1 Check the request details (remarks, amount, currency, beneficiary, attachments). 2 Post the advance (chip: `F-47`; document date, posting date, document type, period, reference, header text, account, tax code, due date, cost/profit center, assignment, text). 3 Review the document overview and save. 4 Pull vendor open items (chip: `FBL1N`; normal items, special GL, noted items). 5 Paste into the voucher template, pick vendor, enter voucher number. 6 Print the voucher. 7 Attach the voucher and submit for treasury review. Use generic labels; no company code or internal layout names.
- **`<PowerAppsScreens frame="tablet">`:** (1) *New request* form: beneficiary, amount, currency, remarks, invoice and approval attachments with a live checklist; (2) *My requests* gallery with status badges (Submitted, Returned, In review, Approved, Paid, Rejected); (3) *AP verification* screen: details left, attachment checklist right, buttons `Return` and `Post & continue`; (4) *Treasury review*: summary, voucher preview, `Approve` / `Reject` with comment. Pins explaining: required-field validation, the status badge color rule (Power Fx `Switch(...)`), and a `Patch` on submit.
- **`<PowerAutomateFlow>`:** Trigger: when an item is created in "Payment Requests" → Condition: invoice AND approval attached? → No: update status "Returned", email requester with reason → Yes: update status "In review", start approval to treasury (outcomes Approve/Reject) → Approve: set "Approved", notify requester and AP → Reject: set "Rejected" with comments, notify AP.
- **`<ExcelSheet>`:** two tabs, `Open items` (dummy vendor line items with document number, date, amount, currency) and `Voucher` (formula-driven: totals via `SUMIFS`, vendor chosen from a dropdown value, voucher number). Show formulas in the formula bar.
- **Results / What I'd do differently:** Prose plus: add duplicate-invoice detection; capture requester's cost center from a lookup instead of free text; build a status-badge PCF component for the gallery.

### Case 2: Working Capital Dashboard and Monthly Review Rhythm

- **Category:** Reporting. **Tools:** HTML/JS, Excel, SAP exports. **Role:** Designer and builder.
- **Summary:** "Turned a manual working capital report into an upload-and-review dashboard, with a monthly forum that makes owners accountable."
- **Business case:** Working capital numbers (DPO, DSO, DIO, cash conversion cycle) were compiled by hand from system exports each month, reviewed once, then forgotten. Worse, the color coding followed the direction of movement instead of the direction of benefit, so a falling DPO looked "good" when it was unfavorable. A dashboard without an operating rhythm is just a report.
- **Metrics (illustrative):**
  | Metric | Before | After | Better |
  |---|---|---|---|
  | Monthly preparation time | 6 h | 1 h | down |
  | Metrics with a named owner | 0 of 5 | 5 of 5 | up |
  | Review actions closed on time | n/a | 80% | up |
  | Misread KPI colors | frequent | none | down |
- **Flowchart (monthly rhythm, Mermaid):** Export from system → upload to dashboard → validate and edit inline → review forum → owner action per metric with a due date → next month: actions checked first.
- **`<ExcelSheet>`:** input template tab with columns (Period, Revenue, COGS, AR, AP, Inventory, Cash) and a calc tab with formulas for DSO, DPO, DIO, CCC; formula bar visible.
- **Dashboard widget (custom component `<MiniDashboard>`):** KPI tiles (DSO, DPO, DIO, CCC) with sparkline and a delta chip colored by **direction of benefit** using each metric's `better` flag. Include a small toggle labelled "Color by movement / Color by benefit" to demonstrate the original mistake and the fix. Dummy data only.
- **`<CodeBlock>`:** a short TypeScript/JS snippet showing the `better`-aware color function.
- **Insight callout:** "EXW terms shorten the effective payment window because freight transit eats into it, so a favorable-looking DPO can mislead." (Keep generic; no numbers from real data.)
- **Results / What I'd do differently:** Prose plus: PDF export one page per slide; threshold alerts; trend annotations.

### Backlog stubs (status `draft`, not rendered)
`business-trip-digitalization` (three manual forms into one Power Apps canvas app on five SharePoint tables; approval chain Employee, Manager, SHE, Director, GA) and `document-management-library` (six-object data model, 13 screens, four-step approvals, six flows). Create the folders with frontmatter only.

## 12. Other pages

**Playground** (`/playground`): card grid; each card has name, one line, tech chips, status chip (Live / In progress), and a link. Seed with (URLs as `[PLACEHOLDER]`):
- PDF toolkit: merge/split with six modes, runs fully in the browser.
- WhatsApp chat viewer: PWA with fast search for very large exports.
- Bulk email sender: Google Apps Script mail merge with rich-text editor.
- Finance Task Manager: Apps Script web app, *In progress*.
Short note: "Small tools I build for myself and share."

**About** (`/about`): short story in Rey's voice (placeholder text, plain and direct), a "How I work" list (e.g. "Automation as leverage, not replacement", "A dashboard without an operating rhythm is just a report", "Document the work so it survives the person"), a skills grid grouped as Finance / Automation / Data, and a Mr. Excellearn block linking TikTok and LinkedIn.

**Contact** (`/contact`): no backend. Big `mailto:` button, LinkedIn, TikTok, and a note about what to include in a first message (the process, the tools in use, the pain). Email and URLs from `site.config.ts`.

## 13. Non-functional requirements

- **Performance:** Lighthouse (mobile) >= 95 for Performance, Accessibility, Best Practices, SEO. LCP < 2.0s, CLS < 0.05. Total JS on the home page < 60 KB gzipped (Mermaid loads only on case pages and only when visible).
- **Accessibility:** WCAG 2.2 AA. Semantic landmarks, visible focus rings, full keyboard operation of all interactive components (tabs, pins, cell selection, toggles), `aria-` labels, text alternatives for pins and diagrams (Mermaid source in `<details>`), color is never the only signal (deltas also have arrows and text).
- **Responsive:** 360px to 1440px+. No horizontal page scroll. Wide components (flowchart, sheet) scroll inside their own container.
- **SEO:** per-page title and description, Open Graph image (generated at build, text on `--band`), sitemap, `robots.txt`, `Person` JSON-LD on Home and About.
- **Privacy:** no cookies, no third-party trackers. Optional privacy-friendly analytics behind a config flag, off by default.
- **Quality gates:** `npm run check` runs type check, lint, and a content lint that (a) fails the build if a published case contains forbidden strings listed in `forbidden-terms.txt` (employer name, company codes, internal names; Rey fills this file), and (b) warns on `illustrative: true`.

## 14. Milestones and acceptance criteria

**M0. Scaffold.** Astro + TS, folders below, tokens, base layout, fonts, lint/check scripts, GitHub Actions deploy to Pages, `site.config.ts`. *Accept:* `npm run build` passes; a blank page deploys; `DECISIONS.md` exists.

**M1. Shell and Home.** Nav, footer, availability chip with live Jakarta time, all Home sections with placeholder data files, responsive. *Accept:* Home matches section 9; Lighthouse targets met; keyboard nav works.

**M2. Case study engine.** Content collection + schema, case index, detail template with sticky TOC, `<BeforeAfter>`, `<Flowchart>`, `<StepList>`, `<CodeBlock>`, `<Callout>`, illustrative badge, content lint. *Accept:* a test case renders every section in order; direction-of-benefit coloring is correct for both `up` and `down`.

**M3. Rich components.** `<PowerAutomateFlow>`, `<PowerAppsScreens>` (with pins and Power Fx notes), `<ExcelSheet>` (formula bar, tabs), `<MiniDashboard>`. *Accept:* each component has a props table in `docs/components.md`, works without JS for core content, and passes keyboard and screen-reader checks.

**M4. Dummy cases.** Build Case 1 and Case 2 completely per section 11. *Accept:* every listed component appears and is explained; flows are readable at 360px; no forbidden terms; both are flagged illustrative.

**M5. Playground, About, Contact, polish.** Remaining pages, OG images, sitemap, JSON-LD, 404, motion polish, reduced-motion support. *Accept:* all NFRs in section 13 met; deployed to the live Pages URL; `README.md` explains how to add a case study in under 10 steps.

## 15. Repo structure

```
/
  prd.md
  DECISIONS.md
  CASE_INTAKE_TEMPLATE.md
  forbidden-terms.txt
  astro.config.mjs
  src/
    config/site.config.ts       # name, email, links, showEmployerName, availability text
    data/                       # experience.ts, proof.ts, services.ts, playground.ts, testimonials.ts
    styles/                     # tokens.css, base.css
    layouts/                    # Base.astro, Case.astro
    components/
      layout/                   # Nav, Footer, AvailabilityChip, Section
      case/                     # BeforeAfter, Flowchart, PowerAutomateFlow, PowerAppsScreens,
                                # ExcelSheet, MiniDashboard, CodeBlock, StepList, Callout
      ui/                       # Button, Chip, Badge, Card
    content/case-studies/<slug>/index.mdx
    pages/                      # index, about, contact, playground, 404, case-studies/
  public/                       # rey.jpg, favicon
  docs/components.md
  .github/workflows/deploy.yml
```

## 16. Placeholders Rey must supply before going public

- Headshot, final email address, LinkedIn and TikTok URLs, Playground tool URLs.
- Real start year for the current role; confirm the guest lecture was delivered.
- Real numbers to replace every `illustrative: true` metric.
- Entries for `forbidden-terms.txt`.
- Decision on `showEmployerName` (default off).

---

## Appendix A: `CASE_INTAKE_TEMPLATE.md`

```md
# Case: <name>

## 1. Business case
- Who was affected, and what hurt?
- Why did it matter (money, time, risk, audit)?

## 2. Before / After (real numbers if you have them)
| Metric | Before | After | Which direction is GOOD? (up/down) |
|---|---|---|---|

## 3. The flow
- As-is steps (in order, who does each step, which system):
- To-be steps:
- Decisions / branches (what happens if X is missing?):

## 4. What I built (check all that apply, then describe)
- [ ] Power Automate flow: trigger, conditions, actions, approvals
- [ ] Power Apps: screens, key controls, any formula worth showing
- [ ] Excel: sheets, key formulas, template layout
- [ ] Script/code (VBA, Apps Script, TS): what it does
- [ ] Dashboard / report: KPIs and how they are read

## 5. Results and what I'd do differently
- 
- 

## 6. Anonymization check
- Replace company, vendor and people names. No internal codes or document numbers.
```

## Appendix B: how Claude Code should work

1. Read this PRD fully; start at M0; finish each milestone's acceptance criteria before the next.
2. Prefer small, typed, reusable components over one-off markup.
3. When the PRD is silent, choose the simplest option that fits the design principles and record it in `DECISIONS.md`.
4. Never introduce real company data, logos, or vendor-branded assets.
5. After each milestone, run `npm run check` and `npm run build`, and summarize what changed and what is assumed.
