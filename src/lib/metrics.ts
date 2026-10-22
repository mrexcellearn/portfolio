export interface Metric {
  label: string;
  before: string;
  after: string;
  better: 'up' | 'down';
  unit?: string;
}

export type Verdict = 'good' | 'bad' | 'flat' | 'qualitative';

export interface Delta {
  verdict: Verdict;
  direction: 'up' | 'down' | 'none';
  text: string;
}

const WORD_ZERO = /^(none|zero|0)$/i;

/** First number in a value like "45 min", "30%", "0 of 5", "1.250.000". "none" reads as 0. */
export function parseValue(v: string): { n: number; pct: boolean; unit: string } | null {
  const s = v.trim();
  if (WORD_ZERO.test(s)) return { n: 0, pct: false, unit: '' };
  const m = s.match(/-?\d[\d.,]*/);
  if (!m) return null;
  const n = Number(m[0].replace(/[.,](?=\d{3}\b)/g, '').replace(',', '.'));
  if (Number.isNaN(n)) return null;
  const rest = s.slice((m.index ?? 0) + m[0].length).trim();
  return { n, pct: rest.startsWith('%'), unit: rest.replace(/^%/, '').trim() };
}

/**
 * Colour follows the direction of BENEFIT, not movement: `better` says which way is good.
 * A falling DPO with better: 'up' is bad; a falling handling time with better: 'down' is good.
 */
export function benefitVerdict(change: number, better: 'up' | 'down'): Verdict {
  if (change === 0) return 'flat';
  return (change > 0) === (better === 'up') ? 'good' : 'bad';
}

export function computeDelta(m: Metric): Delta {
  const a = parseValue(m.before);
  const b = parseValue(m.after);
  if (!a || !b) return { verdict: 'qualitative', direction: 'none', text: 'Qualitative' };
  const change = b.n - a.n;
  const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'none';
  const sign = change > 0 ? '+' : change < 0 ? '−' : '±';
  const abs = Math.abs(change);
  const unit = b.pct ? ' pts' : b.unit && !/^of\b/.test(b.unit) ? ` ${b.unit}` : m.unit ? ` ${m.unit}` : '';
  let text = `${sign}${fmt(abs)}${unit}`;
  if (!b.pct && a.n !== 0 && !/^of\b/.test(b.unit)) text += ` (${sign}${Math.round((abs / Math.abs(a.n)) * 100)}%)`;
  return { verdict: benefitVerdict(change, m.better), direction, text };
}

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
