export class GenericAdapter {
  buildAffiliateUrl(baseUrl: string, _trackingLabel?: string): string {
    return baseUrl;
  }

  validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}