import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productApi, mediaUrl, Product } from '../services/api';

/** Slug must match the `category` column the backend seeds. */
const CATEGORIES = [
  { slug: null,        label: 'All' },
  { slug: 'press-on',  label: 'Press-On' },
  { slug: 'handcraft', label: 'Handcraft' },
  { slug: 'diy',       label: 'DIY' },
];

const ShoppingCenter = () => {
  // the active category lives in the URL, so a filtered view is shareable
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get('category');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // 108 products in the catalog; request them all rather than the default page of 100
      const response = await productApi.list(200, 0, active ?? undefined);
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }, [active]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--violet))] mx-auto mb-4"></div>
          <p className="text-[rgb(var(--muted))]">Loading products…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="glass rounded-2xl p-6 max-w-md">
          <p className="text-center text-[rgb(var(--rose))]">{error}</p>
          <button
            onClick={loadProducts}
            className="mt-4 w-full rounded-full bg-[rgb(var(--chrome))] px-4 py-2 text-sm font-semibold text-[rgb(var(--ink))] transition-transform hover:scale-[1.02]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12">
        <p className="mb-4 text-[0.7rem] uppercase tracking-[0.4em] text-[rgb(var(--muted))]">
          The collection
        </p>
        <h1 className="tracking-display text-4xl font-semibold sm:text-5xl">
          {CATEGORIES.find((c) => c.slug === active)?.label ?? 'All'} designs
        </h1>

        <nav className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const isActive = c.slug === active;
            return (
              <button
                key={c.label}
                onClick={() =>
                  setSearchParams(c.slug ? { category: c.slug } : {}, { replace: true })
                }
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-full px-5 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))] ${
                  isActive
                    ? 'bg-[rgb(var(--chrome))] font-semibold text-[rgb(var(--ink))]'
                    : 'border border-white/10 text-[rgb(var(--muted))] hover:border-white/25 hover:text-[rgb(var(--chrome))]'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </nav>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[rgb(var(--muted))]">No products available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group edge-lit block overflow-hidden rounded-2xl bg-[rgb(var(--ink-soft))] transition-transform duration-500 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))]"
            >
              <div className="relative aspect-square overflow-hidden bg-[rgb(var(--ink-raised))]">
                <img
                  src={mediaUrl(product.thumb_url)}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* The whole card is the link; this is a hover affordance, not the tap target. */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/35">
                  <span className="translate-y-2 rounded-full bg-[rgb(var(--chrome))] px-5 py-2 text-sm font-semibold text-[rgb(var(--ink))] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    View
                  </span>
                </div>
              </div>

              <div className="px-4 py-3">
                <h3 className="truncate text-sm font-medium text-[rgb(var(--chrome))]">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-[rgb(var(--muted))]">
                    {product.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingCenter;
