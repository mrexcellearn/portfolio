import type { APIRoute, GetStaticPaths } from 'astro';
import { ogImage } from '../../lib/og';
import { publishedCases, caseSlug } from '../../lib/cases';
import { site } from '../../config/site.config';

const pages: Record<string, { title: string; eyebrow: string }> = {
  home: { title: site.description, eyebrow: 'Portfolio' },
  'case-studies': { title: 'Case studies, built in code', eyebrow: 'Case studies' },
  playground: { title: 'Small tools I build for myself and share', eyebrow: 'Playground' },
  about: { title: 'Finance operations depth, builder, teacher', eyebrow: 'About' },
  contact: { title: "Still running a process on email and Excel? Let's talk.", eyebrow: 'Contact' },
};

export const getStaticPaths: GetStaticPaths = async () => {
  const cases = await publishedCases();
  return [
    ...Object.entries(pages).map(([slug, p]) => ({ params: { slug }, props: p })),
    ...cases.map((c) => ({ params: { slug: `case-studies/${caseSlug(c)}` }, props: { title: c.data.title, eyebrow: `Case study · ${c.data.category}` } })),
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const png = await ogImage(props.title as string, props.eyebrow as string);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
