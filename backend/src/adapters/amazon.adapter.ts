import { GenericAdapter } from './generic.adapter';
import { config } from '../config/env';

export class AmazonAdapter extends GenericAdapter {
  buildAffiliateUrl(asin: string, tag?: string): string {
    if (!config.amazon.accessKey || !config.amazon.secretKey) {
      console.warn('[Amazon] PA-API credentials not configured. Using manual URL mode.');
    }
    const associateTag = tag ?? config.amazon.associateTag;
    if (!associateTag) {
      console.warn('[Amazon] No associate tag configured. Returning plain URL.');
      return `https://www.amazon.in/dp/${asin}`;
    }
    return `https://www.amazon.in/dp/${asin}?tag=${associateTag}`;
  }
}