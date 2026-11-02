import { Schema, model, Document, Types } from 'mongoose';
import type { OfferSourceType, OfferStatus, Availability } from '../types';

export interface IOffer extends Document {
  productId: Types.ObjectId;
  merchantId: Types.ObjectId;
  productUrl: string;
  affiliateUrl: string;
  currentPrice?: number;
  originalPrice?: number;
  currency: string;
  availability: Availability;
  sellerName?: string;
  sourceType: OfferSourceType;
  priceLastUpdatedAt?: Date;
  offerLastVerifiedAt?: Date;
  status: OfferStatus;
  trackingLabel?: string;
  createdAt: Date;
  updatedAt: Date;
}

const offerSchema = new Schema<IOffer>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    merchantId: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true },
    productUrl: { type: String, required: true },
    affiliateUrl: { type: String, required: true },
    currentPrice: { type: Number },
    originalPrice: { type: Number },
    currency: { type: String, default: 'INR' },
    availability: { type: String, enum: ['in_stock', 'out_of_stock', 'unknown'], default: 'unknown' },
    sellerName: { type: String },
    sourceType: { type: String, enum: ['manual', 'official_api', 'authorized_feed'], default: 'manual' },
    priceLastUpdatedAt: { type: Date },
    offerLastVerifiedAt: { type: Date },
    status: { type: String, enum: ['active', 'expired', 'disabled'], default: 'active' },
    trackingLabel: { type: String },
  },
  { timestamps: true }
);

offerSchema.index({ productId: 1, status: 1 });
offerSchema.index({ merchantId: 1 });
offerSchema.index({ productId: 1, merchantId: 1 }, { unique: true });

export const Offer = model<IOffer>('Offer', offerSchema);