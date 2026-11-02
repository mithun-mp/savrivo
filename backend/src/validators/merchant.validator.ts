import { z } from 'zod';

export const createMerchantSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/).optional(),
  websiteUrl: z.string().url(),
  logoUrl: z.string().url().optional(),
  affiliateProgramName: z.string().optional(),
  enabled: z.boolean().optional().default(true),
});

export const updateMerchantSchema = createMerchantSchema.partial();