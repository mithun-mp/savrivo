import { Schema, model, Document, Types } from 'mongoose';

export interface IGuide extends Document {
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  coverImage?: string;
  author: string;
  category?: string;
  relatedProducts: Types.ObjectId[];
  seoTitle?: string;
  seoDescription?: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const guideSchema = new Schema<IGuide>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String },
    body: { type: String },
    coverImage: { type: String },
    author: { type: String, default: 'Savrivo Editorial' },
    category: { type: String },
    relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    seoTitle: { type: String },
    seoDescription: { type: String },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

guideSchema.index({ status: 1, publishedAt: -1 });
guideSchema.index({ title: 'text', excerpt: 'text' });

export const Guide = model<IGuide>('Guide', guideSchema);