import type { Request } from 'express';

export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

export function getPagination(query: Request['query']): PaginationOptions {
  const page = Math.max(1, parseInt(String(query.page ?? '1'), 10));
  const rawLimit = parseInt(String(query.limit ?? '20'), 10);
  const limit = Math.min(100, Math.max(1, rawLimit));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}