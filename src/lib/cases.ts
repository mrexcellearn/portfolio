import { getCollection, type CollectionEntry } from 'astro:content';

export const caseSlug = (c: CollectionEntry<'caseStudies'>): string => c.data.slug ?? c.id.replace(/\/index$/, '');

export async function publishedCases(): Promise<CollectionEntry<'caseStudies'>[]> {
  const all = await getCollection('caseStudies', ({ data }) => data.status === 'published');
  return all.sort((a, b) => a.data.order - b.data.order || b.data.date.localeCompare(a.data.date));
}
