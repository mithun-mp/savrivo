import { Schema, model, Document } from 'mongoose';
import type { AdminRole } from '../types';

export interface IAdminUser extends Document {
  email: string;
  passwordHash: string;
  role: AdminRole;
  active: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const adminUserSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['superadmin', 'editor'], default: 'editor' },
    active: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export const AdminUser = model<IAdminUser>('AdminUser', adminUserSchema);