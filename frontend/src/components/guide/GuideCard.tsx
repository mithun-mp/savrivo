import React from 'react';
import type { Guide } from '@/types';
import { formatDate } from '@/lib/api';
import { BookOpen } from 'lucide-react';

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <article
      className="group flex flex-col rounded-xl overflow-hidden card-hover"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Cover */}
      <a href={`/guides/${guide.slug}`} className="block overflow-hidden" style={{ aspectRatio: '16/9', background: 'var(--color-overlay)' }}>
        {guide.coverImage ? (
          <img
            src={guide.coverImage}
            alt={`Cover for ${guide.title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ color: 'var(--color-border)' }}>
            <BookOpen size={32} />
          </div>
        )}
      </a>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {guide.category && (
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-accent)' }}>
            {guide.category}
          </p>
        )}
        <a href={`/guides/${guide.slug}`}>
          <h3 className="font-display text-base font-semibold mb-2 line-clamp-2 leading-snug hover:underline underline-offset-2" style={{ color: 'var(--color-text-1)' }}>
            {guide.title}
          </h3>
        </a>
        {guide.excerpt && (
          <p className="text-sm line-clamp-2 flex-1" style={{ color: 'var(--color-text-2)' }}>{guide.excerpt}</p>
        )}
        <div className="mt-4 flex items-center justify-between text-xs" style={{ color: 'var(--color-text-2)' }}>
          <span>{guide.author || 'Savrivo Editorial'}</span>
          {guide.publishedAt && <span>{formatDate(guide.publishedAt)}</span>}
        </div>
      </div>
    </article>
  );
}

