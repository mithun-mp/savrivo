import { Product } from '../models/Product.model';
import { Category } from '../models/Category.model';
import { Guide } from '../models/Guide.model';

export async function search(q: string, limit = 10) {
  if (!q || q.trim().length < 2) {
    return { products: [], categories: [], guides: [] };
  }

  const safeQ = q.trim();

  const [products, categories, guides] = await Promise.all([
    Product.find({ $text: { $search: safeQ }, status: 'published' })
      .select('title slug brand shortDescription images')
      .limit(limit)
      .lean(),
    Category.find({ $text: { $search: safeQ }, active: true })
      .select('name slug description icon')
      .limit(5)
      .lean(),
    Guide.find({ $text: { $search: safeQ }, status: 'published' })
      .select('title slug excerpt coverImage')
      .limit(5)
      .lean(),
  ]);

  return { products, categories, guides };
}