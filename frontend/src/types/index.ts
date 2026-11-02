// SAVRIVO API types for the frontend

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

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  seoTitle?: string;
  seoDescription?: string;
  displayOrder: number;
  active: boolean;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductSpec {
  key: string;
  value: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  fullDescription?: string;
  brand?: string;
  categoryId?: Category | string;
  subcategory?: string;
  images: ProductImage[];
  specifications: ProductSpec[];
  highlights: string[];
  tags: string[];
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Merchant {
  _id: string;
  name: string;
  slug: string;
  websiteUrl: string;
  logoUrl?: string;
  affiliateProgramName?: string;
  enabled: boolean;
}

export interface Offer {
  _id: string;
  productId: string;
  merchantId: Merchant | string;
  productUrl: string;
  affiliateUrl: string;
  currentPrice?: number;
  originalPrice?: number;
  currency: string;
  availability: 'in_stock' | 'out_of_stock' | 'unknown';
  sellerName?: string;
  sourceType: 'manual' | 'official_api' | 'authorized_feed';
  offerLastVerifiedAt?: string;
  status: 'active' | 'expired' | 'disabled';
}

export interface Guide {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  coverImage?: string;
  author: string;
  category?: string;
  relatedProducts?: Product[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
}

export interface SearchResults {
  products: Product[];
  categories: Category[];
  guides: Guide[];
}

export interface DashboardStats {
  stats: {
    totalProducts: number;
    publishedProducts: number;
    draftProducts: number;
    totalCategories: number;
    activeMerchants: number;
    expiredOffers: number;
  };
  recentProducts: Pick<Product, '_id' | 'title' | 'slug' | 'status' | 'createdAt'>[];
}

