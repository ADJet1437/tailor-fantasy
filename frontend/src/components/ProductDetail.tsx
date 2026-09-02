import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productApi, mediaUrl, Product } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productApi.get(id);
        if (!cancelled) setProduct(data);
      } catch (err) {
        if (!cancelled) setError('Failed to load this product.');
        console.error('Error loading product:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--violet))]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-[rgb(var(--muted))]">{error ?? 'Product not found.'}</p>
        <Link to="/products" className="text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--chrome))]">
          ← Back
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        to="/products"
        className="mb-6 inline-block text-sm text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--chrome))]"
      >
        ← Back
      </Link>

      {product.detail_url ? (
        <img
          src={mediaUrl(product.detail_url)}
          alt={product.name}
          className="mx-auto block w-full max-w-3xl rounded-2xl"
        />
      ) : (
        <p className="py-16 text-center text-[rgb(var(--muted))]">
          No detail image available.
        </p>
      )}
    </div>
  );
};

export default ProductDetail;
