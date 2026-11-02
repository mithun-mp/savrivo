import { z } from 'zod';

export const createOfferSchema = z.object({
  productId: z.string().min(1),
  merchantId: z.string().min(1),
  productUrl: z.string().url(),
  affiliateUrl: z.string().url(),
  currentPrice: z.number().positive().optional(),
  originalPrice: z.number().positive().optional(),
  currency: z.string().default('INR'),
  availability: z.enum(['in_stock', 'out_of_stock', 'unknown']).optional().default('unknown'),
  sellerName: z.string().optional(),
  sourceType: z.enum(['manual', 'official_api', 'authorized_feed']).optional().default('manual'),
  offerLastVerifiedAt: z.string().datetime().optional(),
  status: z.enum(['active', 'expired', 'disabled']).optional().default('active'),
  trackingLabel: z.string().optional(),
});

export const updateOfferSchema = createOfferSchema.partial();