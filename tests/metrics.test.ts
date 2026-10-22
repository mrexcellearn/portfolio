import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeDelta, benefitVerdict, parseValue } from '../src/lib/metrics.ts';

test('falling value is good when better is down', () => {
  const d = computeDelta({ label: 'Handling time', before: '45 min', after: '15 min', better: 'down' });
  assert.equal(d.verdict, 'good');
  assert.equal(d.direction, 'down');
  assert.equal(d.text, '−30 min (−67%)');
});

test('falling value is bad when better is up (DPO)', () => {
  const d = computeDelta({ label: 'DPO', before: '62 days', after: '55 days', better: 'up' });
  assert.equal(d.verdict, 'bad');
  assert.equal(d.direction, 'down');
});

test('rising value is good when better is up', () => {
  assert.equal(benefitVerdict(5, 'up'), 'good');
  assert.equal(computeDelta({ label: 'Owners', before: '0 of 5', after: '5 of 5', better: 'up' }).text, '+5');
});

test('rising value is bad when better is down', () => {
  assert.equal(benefitVerdict(3, 'down'), 'bad');
});

test('percent values report points', () => {
  assert.equal(computeDelta({ label: 'Returned', before: '30%', after: '5%', better: 'down' }).text, '−25 pts');
});

test('non-numeric pairs are qualitative unless a side reads as zero', () => {
  assert.equal(computeDelta({ label: 'x', before: 'n/a', after: '80%', better: 'up' }).verdict, 'qualitative');
  assert.equal(parseValue('none')?.n, 0);
  assert.equal(parseValue('1.250.000')?.n, 1250000);
});
