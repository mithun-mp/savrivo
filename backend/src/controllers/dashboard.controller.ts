import type { Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product.model';
import { Category } from '../models/Category.model';
import { Merchant } from '../models/Merchant.model';
import { Offer } from '../models/Offer.model';
import { sendSuccess } from '../utils/response';

export async function getDashboard(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [
      totalProducts,
      publishedProducts,
      draftProducts,
      totalCategories,
      activeMerchants,
      expiredOffers,
      recentProducts,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ status: 'published' }),
      Product.countDocuments({ status: 'draft' }),
      Category.countDocuments({ active: true }),
      Merchant.countDocuments({ enabled: true }),
      Offer.countDocuments({ status: 'expired' }),
      Product.find().sort({ createdAt: -1 }).limit(5).select('title slug status createdAt').lean(),
    ]);

    sendSuccess(res, {
      stats: { totalProducts, publishedProducts, draftProducts, totalCategories, activeMerchants, expiredOffers },
      recentProducts,
    });
  } catch (err) { next(err); }
}