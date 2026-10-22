// Content lint: fails on forbidden terms in published cases, warns on illustrative data.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = 'src/content/case-studies';
const terms = readFileSync('forbidden-terms.txt', 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => l.toLowerCase());

let errors = 0;
let warnings = 0;
const dirs = existsSync(root) ? readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()) : [];

for (const dir of dirs) {
  const file = join(root, dir.name, 'index.mdx');
  if (!existsSync(file)) continue;
  const text = readFileSync(file, 'utf8');
  const fm = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  if (!/^status:\s*['"]?published/m.test(fm)) continue;

  const lower = text.toLowerCase();
  for (const term of terms) {
    if (lower.includes(term)) {
      console.error(`ERROR ${file}: contains forbidden term "${term}"`);
      errors++;
    }
  }
  if (!/^illustrative:\s*false/m.test(fm)) {
    console.warn(`WARN  ${file}: published with illustrative data (illustrative: true)`);
    warnings++;
  }
}

console.log(`content-lint: ${dirs.length} case folder(s), ${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
