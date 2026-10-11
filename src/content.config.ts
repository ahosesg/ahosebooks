import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cbam = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cbam' }),
  schema: z.object({
    page: z.number().int().min(1).max(15),
    title: z.string(),
    nav: z.string(),
    kicker: z.string(),
    layout: z.enum(['cover', 'standard', 'tree', 'references']).default('standard'),
    sources: z.array(z.string()),
    intro: z.string().optional(),
    figure: z.enum(['sectors', 'classification', 'roles', 'precursors', 'minimis', 'documents']).optional(),
    notes: z.array(z.object({
      number: z.number().int().positive(),
      text: z.string(),
      source: z.string().optional(),
      label: z.string().optional(),
    })).default([]),
  }),
});

export const collections = { cbam };
