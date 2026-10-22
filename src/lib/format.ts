/** Indonesian-style grouping: 1250000 -> "1.250.000". Decimals use a comma. */
export function idr(n: number, decimals = 0): string {
  const [i, d] = Math.abs(n).toFixed(decimals).split('.');
  const grouped = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${n < 0 ? '-' : ''}${grouped}${d ? `,${d}` : ''}`;
}
