import { readFileSync } from 'node:fs';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const font = (w: number) => readFileSync(`node_modules/@fontsource/inter/files/inter-latin-${w}-normal.woff`);
const fonts = [
  { name: 'Inter', data: font(600), weight: 600 as const, style: 'normal' as const },
  { name: 'Inter', data: font(500), weight: 500 as const, style: 'normal' as const },
];

/** 1200x630 Open Graph card: text on the warm band colour. */
export async function ogImage(title: string, eyebrow: string): Promise<Buffer> {
  const h = (type: string, style: Record<string, unknown>, children: unknown) => ({ type, props: { style, children } });
  const tree = h(
    'div',
    { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 80px', background: '#F3F4EE', color: '#111111', fontFamily: 'Inter' },
    [
      h('div', { display: 'flex', alignItems: 'center', gap: 20 }, [
        h('div', { width: 64, height: 64, borderRadius: 16, background: '#111111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 500 }, 'RK'),
        h('div', { fontSize: 26, color: '#6B6F6A', fontWeight: 500 }, eyebrow),
      ]),
      h('div', { fontSize: title.length > 60 ? 56 : 68, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: 1000 }, title),
      h('div', { display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#6B6F6A', borderTop: '1px solid #E3E5DF', paddingTop: 24 }, [
        h('div', {}, 'Rey Karundeng'),
        h('div', {}, 'AP & Treasury · Finance automation'),
      ]),
    ],
  );
  // satori accepts plain element objects; the cast avoids pulling in React types.
  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
  return new Resvg(svg).render().asPng();
}
