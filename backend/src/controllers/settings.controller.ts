import type { Request, Response, NextFunction } from 'express';
import { SiteSettings } from '../models/SiteSettings.model';
import { sendSuccess } from '../utils/response';

export async function getSettings(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let settings: any = await SiteSettings.findOne({ _key: 'global' }).lean();
    if (!settings) {
      const newSettings = new SiteSettings({ _key: 'global' });
      settings = (await newSettings.save()).toObject();
    }
    sendSuccess(res, settings);
  } catch (err) { next(err); }
}

export async function updateSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const allowed = ['siteName', 'tagline', 'defaultCurrency', 'defaultTheme', 'socialLinks', 'contactEmail', 'maintenanceMode'];
    const data: Record<string, unknown> = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) data[key] = req.body[key];
    }
    const settings = await SiteSettings.findOneAndUpdate(
      { _key: 'global' },
      { $set: data },
      { new: true, upsert: true, runValidators: true }
    );
    sendSuccess(res, settings, 200, 'Settings updated');
  } catch (err) { next(err); }
}