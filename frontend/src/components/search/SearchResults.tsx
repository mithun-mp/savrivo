import React, { useState, useEffect, useRef } from 'react';
import type { SearchResults as ISearchResults, Product, Category, Guide } from '@/types';
import { api } from '@/lib/api';
import { Search, Package, Grid, BookOpen, ArrowRight } from 'lucide-react';
import EmptyState from '../ui/EmptyState';
import { ProductCardSkeleton } from '../ui/Skeleton';

interface SearchResultsProps {
  initialQuery?: string;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function SearchResults({ initialQuery = '' }: SearchResultsProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<ISearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debouncedQ = useDebounce(query, 300);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!debouncedQ.trim()) { setResults(null); return; }
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLoading(true); setError('');
    api.search.query(debouncedQ)
      .then(r => { setResults(r.data as ISearchResults); })
      .catch(e => { if (e.name !== 'AbortError') setError('Search failed. Try again.'); })
      .finally(() => setLoading(false));
  }, [debouncedQ]);

  const total = results
    ? (results.products?.length || 0) + (results.categories?.length || 0) + (results.guides?.length || 0)
    : 0;

  return (
    <div className="space-y-8">
      {/* Search input */}
      <form onSubmit={e => { e.preventDefault(); }} role="search" className="relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-text-2)' }} aria-hidden />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search products, guides, categories…"
          aria-label="Search"
          autoFocus
          className="w-full pl-12 pr-4 py-4 rounded-xl text-base outline-none"
          style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-text-1)' }}
          onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
          onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
        />
      </form>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <ProductCardSkeleton key={i} />)}
        </div>
      )}

      {/* Error */}
      {error && !loading && <p className="text-sm" style={{ color: 'var(--color-error)' }}>{error}</p>}

      {/* Empty */}
      {!loading && !error && query && results && total === 0 && (
        <EmptyState
          title={`No results for "${query}"`}
          description="Try different keywords, or browse our categories."
          action={<a href="/categories" className="text-sm font-medium underline underline-offset-2" style={{ color: 'var(--color-accent)' }}>Browse categories</a>}
        />
      )}

      {/* Products */}
      {results?.products && results.products.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-2)' }}>
            <Package size={14} /> Products
          </h2>
          <div className="space-y-2">
            {results.products.map((p: Product) => (
              <a key={p._id} href={`/product/${p.slug}`}
                className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:opacity-80"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                {p.images?.[0] && (
                  <img src={p.images[0].url} alt="" className="w-12 h-12 object-contain rounded-lg flex-shrink-0" style={{ background: 'var(--color-overlay)' }} loading="lazy" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-1)' }}>{p.title}</p>
                  {p.brand && <p className="text-xs" style={{ color: 'var(--color-text-2)' }}>{p.brand}</p>}
                </div>
                <ArrowRight size={14} style={{ color: 'var(--color-text-2)' }} />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {results?.categories && results.categories.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-2)' }}>
            <Grid size={14} /> Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {results.categories.map((c: Category) => (
              <a key={c._id} href={`/category/${c.slug}`}
                className="text-sm px-4 py-2 rounded-full border transition-colors hover:opacity-80"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-1)' }}
              >
                {c.name}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Guides */}
      {results?.guides && results.guides.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-2)' }}>
            <BookOpen size={14} /> Buying Guides
          </h2>
          <div className="space-y-2">
            {results.guides.map((g: Guide) => (
              <a key={g._id} href={`/guides/${g.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:opacity-80"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-1)' }}>{g.title}</p>
                  {g.excerpt && <p className="text-xs line-clamp-1" style={{ color: 'var(--color-text-2)' }}>{g.excerpt}</p>}
                </div>
                <ArrowRight size={14} style={{ color: 'var(--color-text-2)' }} />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* No query */}
      {!query && (
        <EmptyState
          title="What are you looking for?"
          description="Search for products, categories, or buying guides."
        />
      )}
    </div>
  );
}

