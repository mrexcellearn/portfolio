// Illustrative data for Case 2. Dummy figures in IDR millions; not from any real company.
import type { Kpi } from '../../../components/case/MiniDashboard.astro';
import type { Sheet } from '../../../components/case/sheet-types';

const periods = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

export const kpis: Kpi[] = [
  { key: 'DSO', label: 'Days sales outstanding', unit: 'days', better: 'down', series: [52, 50, 49, 47, 46, 44], periods },
  { key: 'DPO', label: 'Days payables outstanding', unit: 'days', better: 'up', series: [64, 63, 62, 60, 58, 55], periods },
  { key: 'DIO', label: 'Days inventory outstanding', unit: 'days', better: 'down', series: [38, 37, 37, 36, 35, 34], periods },
  { key: 'CCC', label: 'Cash conversion cycle', unit: 'days', better: 'down', series: [26, 24, 24, 23, 23, 23], periods },
];

export const sheets: Sheet[] = [
  {
    name: 'Input',
    caption: 'Upload template. One row per month, pasted from the system exports. IDR millions, dummy data.',
    widths: [80, 96, 96, 96, 96, 96, 96],
    rows: [
      ['Period', 'Revenue', 'COGS', 'AR', 'AP', 'Inventory', 'Cash'],
      ['2026-09', 42000, 28500, 64400, 55100, 33250, 18200],
      ['2026-10', 45000, 30000, 66000, 55000, 34000, 19750],
    ],
  },
  {
    name: 'Calc',
    caption: 'Monthly ratios on a 30-day basis. CCC = DSO + DIO − DPO.',
    widths: [80, 80, 80, 80, 80, 150],
    rows: [
      ['Period', 'DSO', 'DIO', 'DPO', 'CCC', 'Owner'],
      [
        { v: '2026-09', f: 'Input!A2' },
        { v: 46, fmt: 'num', f: 'ROUND(Input!D2/Input!B2*30,0)' },
        { v: 35, fmt: 'num', f: 'ROUND(Input!F2/Input!C2*30,0)' },
        { v: 58, fmt: 'num', f: 'ROUND(Input!E2/Input!C2*30,0)' },
        { v: 23, fmt: 'num', f: 'B2+C2-D2' },
        'Credit control',
      ],
      [
        { v: '2026-10', f: 'Input!A3' },
        { v: 44, fmt: 'num', f: 'ROUND(Input!D3/Input!B3*30,0)' },
        { v: 34, fmt: 'num', f: 'ROUND(Input!F3/Input!C3*30,0)' },
        { v: 55, fmt: 'num', f: 'ROUND(Input!E3/Input!C3*30,0)' },
        { v: 23, fmt: 'num', f: 'B3+C3-D3' },
        'AP / Treasury',
      ],
      [
        { v: 'Change', bold: true },
        { v: -2, fmt: 'num', f: 'B3-B2' },
        { v: -1, fmt: 'num', f: 'C3-C2' },
        { v: -3, fmt: 'num', f: 'D3-D2' },
        { v: 0, fmt: 'num', f: 'E3-E2' },
        '',
      ],
    ],
    highlight: ['D2:D4'],
  },
];
