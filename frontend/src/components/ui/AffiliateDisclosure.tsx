import React from 'react';
import { Info } from 'lucide-react';
import { url } from '@/lib/paths';

export default function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs" style={{ color: 'var(--color-text-2)' }}>
        <Info size={11} className="inline mr-1 opacity-60" aria-hidden="true" />
        Affiliate links. We may earn a commission.{' '}
        <a href={url('/affiliate-disclosure')} className="underline underline-offset-2">Learn more</a>
      </p>
    );
  }

  return (
    <aside
      className="flex gap-3 p-4 rounded-lg text-sm leading-relaxed"
      style={{ background: 'var(--color-overlay)', border: '1px solid var(--color-border)', color: 'var(--color-text-2)' }}
    >
      <Info size={16} className="shrink-0 mt-0.5 opacity-60" aria-hidden="true" />
      <p>
        <strong style={{ color: 'var(--color-text-1)' }}>Affiliate disclosure:</strong>{' '}
        SAVRIVO participates in affiliate programmes. When you click "Shop Now" and make a qualifying purchase, we may earn a small commission at no extra cost to you. This does not influence our editorial recommendations.{' '}
        <a href={url('/affiliate-disclosure')} className="underline underline-offset-2">
          Read our full disclosure
        </a>
        .
      </p>
    </aside>
  );
}

