import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cbam = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cbam' }),
  schema: z.object({
    page: z.number().int().min(1).max(15),
    title: z.string(),
    nav: z.string(),
    kicker: z.string(),
    layout: z.enum(['cover', 'standard', 'tree', 'worksheet', 'references']).default('standard'),
    sources: z.array(z.string()),
  }),
});

export const collections = { cbam };
