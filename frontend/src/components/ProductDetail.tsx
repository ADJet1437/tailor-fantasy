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
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-gray-500">{error ?? 'Product not found.'}</p>
        <Link to="/" className="text-purple-600 hover:text-purple-800">
          ← Back
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Link
        to="/"
        className="inline-block text-purple-600 hover:text-purple-800 mb-4"
      >
        ← Back
      </Link>

      {product.detail_url ? (
        <img
          src={mediaUrl(product.detail_url)}
          alt={product.name}
          className="w-full max-w-3xl mx-auto block"
        />
      ) : (
        <p className="text-center text-gray-400 py-16">
          No detail image available.
        </p>
      )}
    </div>
  );
};

export default ProductDetail;
