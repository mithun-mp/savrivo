import React from 'react';
import type { Category } from '@/types';
import { ArrowRight } from 'lucide-react';
import { url } from '@/lib/paths';

// Map icon names (stored as strings) to SVG elements
const iconMap: Record<string, React.ReactNode> = {
  Cpu: <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  Home: <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  Sparkles: <><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>,
  BookOpen: <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  Dumbbell: <><path d="M6.5 6.5h11" strokeWidth="1.5" strokeLinecap="round" /><path d="M6.5 17.5h11" strokeWidth="1.5" strokeLinecap="round" /><rect x="2" y="5" width="4" height="14" rx="1" strokeWidth="1.5" /><rect x="18" y="5" width="4" height="14" rx="1" strokeWidth="1.5" /></>,
  ShoppingBag: <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  Gamepad2: <><rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="1.5" /><path d="M12 12h.01M7 12h3" strokeWidth="1.5" strokeLinecap="round" /></>,
};

function CategoryIcon({ name }: { name?: string }) {
  const paths = name ? iconMap[name] : null;
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      {paths || <circle cx="12" cy="12" r="8" strokeWidth="1.5" />}
    </svg>
  );
}

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <a
      href={url(`/category/${category.slug}`)}
      className="group flex flex-col gap-3.5 p-6 rounded-2xl transition-all duration-200 card-hover"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        color: 'var(--color-text-1)',
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
        style={{ background: 'var(--color-accent-badge)', color: 'var(--color-accent)' }}
      >
        <CategoryIcon name={category.icon} />
      </div>
      <div>
        <h3 className="font-semibold text-base mb-1.5" style={{ color: 'var(--color-text-1)' }}>{category.name}</h3>
        {category.description && (
          <p className="text-xs sm:text-sm line-clamp-2 leading-relaxed" style={{ color: 'var(--color-text-2)' }}>{category.description}</p>
        )}
      </div>
      <div className="flex items-center gap-1.5 text-sm font-semibold mt-auto" style={{ color: 'var(--color-accent)' }}>
        Explore <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </div>
    </a>
  );
}

