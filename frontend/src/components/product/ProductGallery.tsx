import React, { useState } from 'react';
import type { ProductImage } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  if (!images.length) {
    return (
      <div
        className="w-full rounded-xl flex items-center justify-center"
        style={{ aspectRatio: '1/1', background: 'var(--color-overlay)', border: '1px solid var(--color-border)' }}
      >
        <svg width="60" height="70" viewBox="0 0 48 56" fill="none" aria-hidden="true">
          <path d="M32 6 C22 6 14 11 14 19 C14 25 19 28 26 30 L30 31.5 C38 33.5 44 37 44 44 C44 51 37 50 30 50 C23 50 16 47 14 41"
            stroke="var(--color-border)" strokeWidth="3" strokeLinecap="round" fill="none"/>
        </svg>
      </div>
    );
  }

  const img = images[active];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{ aspectRatio: '1/1', background: 'var(--color-overlay)', border: '1px solid var(--color-border)' }}
      >
        {img && !imgErrors[active] ? (
          <img
            src={img.url}
            alt={img.alt || `${title} — image ${active + 1}`}
            className="w-full h-full object-contain p-4"
            loading={active === 0 ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setImgErrors(prev => ({ ...prev, [active]: true }))}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ color: 'var(--color-border)' }}>
            No image
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive(i => Math.max(0, i - 1))}
              disabled={active === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
              style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} style={{ color: 'var(--color-text-1)' }} />
            </button>
            <button
              onClick={() => setActive(i => Math.min(images.length - 1, i + 1))}
              disabled={active === images.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
              style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}
              aria-label="Next image"
            >
              <ChevronRight size={20} style={{ color: 'var(--color-text-1)' }} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2.5 flex-wrap pt-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all hover:opacity-95"
              style={{
                border: `2px solid ${i === active ? 'var(--color-accent)' : 'var(--color-border)'}`,
                background: 'var(--color-overlay)',
              }}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === active}
            >
              {!imgErrors[i] && (
                <img
                  src={img.url}
                  alt={img.alt || `Thumbnail ${i + 1}`}
                  className="w-full h-full object-contain p-1.5"
                  loading="lazy"
                  onError={() => setImgErrors(prev => ({ ...prev, [i]: true }))}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

