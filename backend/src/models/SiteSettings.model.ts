import { Schema, model, Document } from 'mongoose';

interface SocialLinks {
  twitter?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

export interface ISiteSettings extends Document {
  _key: string;
  siteName: string;
  tagline?: string;
  defaultCurrency: string;
  defaultTheme: 'light' | 'dark';
  socialLinks: SocialLinks;
  contactEmail?: string;
  maintenanceMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    _key: { type: String, default: 'global', unique: true },
    siteName: { type: String, default: 'SAVRIVO' },
    tagline: { type: String, default: 'Smart Finds. Better Choices.' },
    defaultCurrency: { type: String, default: 'INR' },
    defaultTheme: { type: String, enum: ['light', 'dark'], default: 'light' },
    socialLinks: {
      twitter: String,
      instagram: String,
      facebook: String,
      youtube: String,
    },
    contactEmail: { type: String },
    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const SiteSettings = model<ISiteSettings>('SiteSettings', siteSettingsSchema);