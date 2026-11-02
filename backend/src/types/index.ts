import 'express';

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: PaginationMeta;
  error?: {
    code: string;
    message: string;
    details?: unknown[];
  };
}

export interface AuthPayload {
  userId: string;
  email: string;
  role: string;
}

export type OfferSourceType = 'manual' | 'official_api' | 'authorized_feed';
export type ProductStatus = 'draft' | 'published' | 'archived';
export type OfferStatus = 'active' | 'expired' | 'disabled';
export type AdminRole = 'superadmin' | 'editor';
export type Availability = 'in_stock' | 'out_of_stock' | 'unknown';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}