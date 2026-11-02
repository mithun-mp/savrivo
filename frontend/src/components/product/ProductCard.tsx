import React, { useState } from 'react';
import type { Product, Category } from '@/types';
import { formatINR } from '@/lib/api';
import Badge from '../ui/Badge';
import { ExternalLink } from 'lucide-react';
import { url } from '@/lib/paths';

interface ProductCardProps {
  product: Product;
}

function getCategoryName(cat: Product['categoryId']): string {
  if (!cat) return '';
  if (typeof cat === 'string') return '';
  return (cat as Category).name;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const mainImage = product.images?.[0];
  const categoryName = getCategoryName(product.categoryId);

  return (
    <article
      className="group flex flex-col rounded-xl overflow-hidden card-hover"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Image */}
      <a href={url(`/product/${product.slug}`)} className="block relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {mainImage && !imgError ? (
          <img
            src={mainImage.url}
            alt={mainImage.alt || product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'var(--color-overlay)' }}
          >
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path d="M32 6 C22 6 14 11 14 19 C14 25 19 28 26 30 L30 31.5 C38 33.5 44 37 44 44 C44 51 37 50 30 50 C23 50 16 47 14 41"
                stroke="var(--color-border)" strokeWidth="3" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
        )}
        {/* Category badge */}
        {categoryName && (
          <span
            className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm"
            style={{ background: 'var(--color-surface)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}
          >
            {categoryName}
          </span>
        )}
        {product.featured && (
          <span
            className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm"
            style={{ background: 'var(--color-curated-badge)', color: 'var(--color-curated-text)', border: '1px solid var(--color-border)' }}
          >
            Editor's Pick
          </span>
        )}
      </a>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {product.brand && (
          <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-2)' }}>
            {product.brand}
          </p>
        )}
        <a href={url(`/product/${product.slug}`)}>
          <h3
            className="font-sans text-base md:text-[17px] font-semibold mb-2 line-clamp-2 leading-snug hover:underline underline-offset-2"
            style={{ color: 'var(--color-text-1)' }}
          >
            {product.title}
          </h3>
        </a>
        {product.shortDescription && (
          <p className="text-sm line-clamp-2 leading-relaxed mb-4 flex-1" style={{ color: 'var(--color-text-2)' }}>
            {product.shortDescription}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-2" style={{ borderTop: '1px solid var(--color-border)' }}>
          <a
            href={url(`/product/${product.slug}`)}
            className="text-sm font-semibold py-1 hover:underline underline-offset-2"
            style={{ color: 'var(--color-accent)' }}
          >
            View Details
          </a>
          <ExternalLink size={14} style={{ color: 'var(--color-text-2)' }} aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}

