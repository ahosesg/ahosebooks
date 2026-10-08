import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ahosesg.github.io',
  base: '/ahosebooks',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
