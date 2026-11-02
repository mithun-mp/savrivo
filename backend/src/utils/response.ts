import type { Response } from 'express';
import type { ApiResponse, PaginationMeta } from '../types';

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200,
  message?: string,
  pagination?: PaginationMeta
): void {
  const body: ApiResponse<T> = { success: true, data, message, pagination };
  res.status(statusCode).json(body);
}

export function sendError(
  res: Response,
  message: string,
  statusCode = 500,
  code = 'INTERNAL_ERROR',
  details?: unknown[]
): void {
  const body: ApiResponse = {
    success: false,
    error: { code, message, details },
  };
  res.status(statusCode).json(body);
}