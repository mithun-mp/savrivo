import React, { useState, useEffect, useCallback } from 'react';
import type { Product, Category } from '@/types';
import { api } from '@/lib/api';
import ProductGrid from '../product/ProductGrid';
import Pagination from '../ui/Pagination';
import { Filter, X, SlidersHorizontal } from 'lucide-react';

interface ProductsBrowserProps {
  initialCategories?: Category[];
}

export default function ProductsBrowser({ initialCategories = [] }: ProductsBrowserProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [featured, setFeatured] = useState(false);
  const [sort, setSort] = useState('newest');

  const fetchProducts = useCallback(async (p = page) => {
    setLoading(true); setError('');
    try {
      const params = new URLSearchParams({ page: String(p), limit: '12', sort });
      if (category) params.set('category', category);
      if (brand) params.set('brand', brand);
      if (featured) params.set('featured', 'true');
      if (search) params.set('q', search);
      const res = await api.products.list(params.toString());
      setProducts((res.data as Product[]) || []);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch {
      setError('Could not load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, category, brand, featured, sort, search]);

  useEffect(() => { fetchProducts(1); setPage(1); }, [category, brand, featured, sort, search]);
  useEffect(() => { if (page > 1) fetchProducts(page); }, [page]);

  const clearFilters = () => {
    setCategory(''); setBrand(''); setFeatured(false); setSort('newest'); setSearch('');
  };
  const hasFilters = !!(category || brand || featured || search || sort !== 'newest');

  const selectClass = "text-sm px-3.5 py-2.5 rounded-lg border outline-none w-full transition-colors";
  const selectStyle: React.CSSProperties = { background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-1)' };

  const FilterPanel = () => (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--color-text-2)' }}>Search</label>
        <input
          type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Product name…" className={selectClass} style={selectStyle}
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--color-text-2)' }}>Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)} className={selectClass} style={selectStyle}>
          <option value="">All Categories</option>
          {initialCategories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--color-text-2)' }}>Brand</label>
        <input
          type="text" value={brand} onChange={e => setBrand(e.target.value)}
          placeholder="Brand name…" className={selectClass} style={selectStyle}
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--color-text-2)' }}>Sort by</label>
        <select value={sort} onChange={e => setSort(e.target.value)} className={selectClass} style={selectStyle}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <input
          id="featured" type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)}
          className="w-4 h-4 rounded accent-[var(--color-accent)]"
        />
        <label htmlFor="featured" className="text-sm font-medium" style={{ color: 'var(--color-text-1)' }}>Editor's picks only</label>
      </div>
      {hasFilters && (
        <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs font-semibold py-1 hover:underline" style={{ color: 'var(--color-error)' }}>
          <X size={14} /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
      {/* Desktop sidebar filters */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-28 self-start">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-5 flex items-center" style={{ color: 'var(--color-text-2)' }}>
          <Filter size={14} className="inline mr-1.5" /> Filters
        </h2>
        <FilterPanel />
      </aside>

      {/* Mobile filter button + drawer */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white shadow-sv-lg min-h-[44px]"
          style={{ background: 'var(--color-accent)' }}
          aria-label="Open filter drawer"
        >
          <SlidersHorizontal size={16} /> Filters
          {hasFilters && <span className="w-2 h-2 rounded-full bg-white opacity-90" />}
        </button>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 p-6 rounded-t-2xl max-h-[85vh] overflow-y-auto" style={{ background: 'var(--color-surface)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold" style={{ color: 'var(--color-text-1)' }}>Filters</h2>
              <button onClick={() => setFilterOpen(false)} className="p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center" style={{ color: 'var(--color-text-2)' }} aria-label="Close filters">
                <X size={20} />
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setFilterOpen(false)}
              className="w-full mt-6 py-3.5 rounded-xl text-base font-semibold text-white shadow-sv-sm"
              style={{ background: 'var(--color-accent)' }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="flex-1 min-w-0 pb-20 lg:pb-0">
        <ProductGrid products={products} loading={loading} error={error} skeletonCount={12} />
        {!loading && totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>
    </div>
  );
}

