import { Schema, model, Document } from 'mongoose';

export interface IMerchant extends Document {
  name: string;
  slug: string;
  websiteUrl: string;
  logoUrl?: string;
  affiliateProgramName?: string;
  enabled: boolean;
  trackingConfiguration?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const merchantSchema = new Schema<IMerchant>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    websiteUrl: { type: String, required: true },
    logoUrl: { type: String },
    affiliateProgramName: { type: String },
    enabled: { type: Boolean, default: true },
    trackingConfiguration: { type: Schema.Types.Mixed, select: false },
  },
  { timestamps: true }
);

merchantSchema.index({ enabled: 1, slug: 1 });

export const Merchant = model<IMerchant>('Merchant', merchantSchema);