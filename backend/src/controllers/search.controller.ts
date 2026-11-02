import type { Request, Response, NextFunction } from 'express';
import { search } from '../services/search.service';
import { sendSuccess } from '../utils/response';

export async function searchAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const q = String(req.query.q ?? '');
    const results = await search(q);
    sendSuccess(res, results);
  } catch (err) { next(err); }
}