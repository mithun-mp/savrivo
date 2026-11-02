import { z } from 'zod';

export const createGuideSchema = z.object({
  title: z.string().min(1).max(300),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/).optional(),
  excerpt: z.string().max(500).optional(),
  body: z.string().optional(),
  coverImage: z.string().url().optional(),
  author: z.string().optional().default('Savrivo Editorial'),
  category: z.string().optional(),
  relatedProducts: z.array(z.string()).optional().default([]),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional().default('draft'),
  publishedAt: z.string().datetime().optional(),
});

export const updateGuideSchema = createGuideSchema.partial();