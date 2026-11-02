import { Category } from '../models/Category.model';
import { slugify } from '../utils/slugify';

export async function getCategories() {
  return Category.find({ active: true }).sort({ displayOrder: 1, name: 1 }).lean();
}

export async function getCategoryBySlug(slug: string) {
  return Category.findOne({ slug, active: true }).lean();
}

export async function createCategory(data: Record<string, unknown>) {
  if (!data.slug && data.name) {
    data.slug = slugify(String(data.name));
  }
  const cat = new Category(data);
  return cat.save();
}

export async function updateCategory(id: string, data: Record<string, unknown>) {
  return Category.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
}

export async function getAllCategories() {
  return Category.find().sort({ displayOrder: 1, name: 1 }).lean();
}