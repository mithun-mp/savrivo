import React from 'react';
import type { Offer, Merchant } from '@/types';
import { formatINR, formatDate } from '@/lib/api';
import { ExternalLink, Clock, Info } from 'lucide-react';
import AffiliateDisclosure from '../ui/AffiliateDisclosure';

interface OfferCardProps {
  offer: Offer;
}

function getMerchant(m: Offer['merchantId']): Merchant | null {
  if (typeof m === 'string') return null;
  return m as Merchant;
}

export default function OfferCard({ offer }: OfferCardProps) {
  const merchant = getMerchant(offer.merchantId);
  const hasPrice = typeof offer.currentPrice === 'number' && offer.currentPrice > 0;
  const hasOriginal = typeof offer.originalPrice === 'number' && offer.originalPrice > 0;
  const hasDiscount = hasPrice && hasOriginal && offer.originalPrice! > offer.currentPrice!;

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {merchant && (
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-accent)' }}>
              {merchant.name}
            </p>
          )}
          {hasPrice && (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold" style={{ color: 'var(--color-text-1)' }}>
                {formatINR(offer.currentPrice!)}
              </span>
              {hasDiscount && (
                <span className="text-sm line-through opacity-50" style={{ color: 'var(--color-text-2)' }}>
                  {formatINR(offer.originalPrice!)}
                </span>
              )}
            </div>
          )}
          {!hasPrice && (
            <p className="text-sm" style={{ color: 'var(--color-text-2)' }}>
              Price available at retailer
            </p>
          )}
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-full shrink-0"
          style={
            offer.availability === 'in_stock'
              ? { background: 'rgba(22,163,74,0.1)', color: 'var(--color-success)' }
              : offer.availability === 'out_of_stock'
              ? { background: 'rgba(220,38,38,0.1)', color: 'var(--color-error)' }
              : { background: 'var(--color-overlay)', color: 'var(--color-text-2)' }
          }
        >
          {offer.availability === 'in_stock' ? 'In Stock' : offer.availability === 'out_of_stock' ? 'Out of Stock' : 'Check Availability'}
        </span>
      </div>

      {/* Price note */}
      {hasPrice && (
        <p className="text-xs flex items-center gap-1" style={{ color: 'var(--color-text-2)' }}>
          <Info size={11} aria-hidden="true" />
          Price shown is indicative. Verify current price at the retailer.
        </p>
      )}

      {/* Last verified */}
      {offer.offerLastVerifiedAt && (
        <p className="text-xs flex items-center gap-1" style={{ color: 'var(--color-text-2)' }}>
          <Clock size={11} aria-hidden="true" />
          Last verified: {formatDate(offer.offerLastVerifiedAt)}
        </p>
      )}

      {/* Shop Now */}
      <a
        href={offer.affiliateUrl}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className="flex items-center justify-center gap-2 py-3 px-5 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90 active:scale-95"
        style={{ background: 'var(--color-accent)' }}
      >
        Shop at {merchant?.name || 'Retailer'}
        <ExternalLink size={14} aria-hidden="true" />
      </a>

      <AffiliateDisclosure compact />
    </div>
  );
}

