import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    summary: z.string().max(160),
    category: z.enum(['Automation', 'Reporting', 'Documentation', 'Process']),
    date: z.string(),
    role: z.string(),
    tools: z.array(z.string()),
    status: z.enum(['draft', 'published']).default('draft'),
    illustrative: z.boolean().default(true),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          before: z.string(),
          after: z.string(),
          better: z.enum(['up', 'down']),
          unit: z.string().optional(),
        }),
      )
      .min(1)
      .max(4),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

export const collections = { caseStudies };
