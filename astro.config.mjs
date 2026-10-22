// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site: https://mrexcellearn.github.io/portfolio/
export default defineConfig({
  site: 'https://mrexcellearn.github.io',
  base: '/portfolio',
  trailingSlash: 'ignore',
  output: 'static',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light-high-contrast' },
  },
});
