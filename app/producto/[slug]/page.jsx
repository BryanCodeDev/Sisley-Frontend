'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Badge from '@/app/components/Badge';
import ProductCard from '@/app/components/ProductCard';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/app/services/products';

export default function ProductoPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductBySlug(params.slug);
        if (!data) {
          notFound();
        }
        setProduct(data);
        setSelectedVariant(data.variants?.[0] || null);

        const relatedData = await getProducts({ category: data.categoryId, limit: '3' });
        setRelated((relatedData.data || []).filter((p) => p.id !== data.id).slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.slug]);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-sisley-white flex items-center justify-center">
          <p className="text-sm text-sisley-gray-500">Cargando producto...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-sisley-white flex items-center justify-center">
          <p className="text-sm text-red-600">Error: {error || 'Producto no encontrado'}</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-xs text-sisley-gray-400 mb-8">
            <Link href="/" className="hover:text-sisley-black transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-sisley-black transition-colors">Tienda</Link>
            <span>/</span>
            <Link href={`/catalogo?categoria=${product.categorySlug}`} className="hover:text-sisley-black transition-colors capitalize">
              {product.categoryName}
            </Link>
            <span>/</span>
            <span className="text-sisley-black">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            <div className="aspect-[3/4] bg-sisley-gray-100 flex items-center justify-center">
              <svg className="w-32 h-32 text-sisley-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <div>
              {product.featured && (
                <Badge variant="default" size="sm" className="mb-4">Destacado</Badge>
              )}
              <p className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-2">
                {product.categoryName}
              </p>
              <h1 className="text-2xl md:text-3xl font-light text-sisley-black mb-4">{product.name}</h1>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-light text-sisley-black">
                  ${selectedVariant ? Number(selectedVariant.price).toLocaleString('es-CO') : Number(product.price).toLocaleString('es-CO')}
                </span>
              </div>

              <p className="text-sm text-sisley-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

              {product.variants && product.variants.length > 1 && (
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-widest text-sisley-gray-600 mb-3">
                    Talla / Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2 text-sm border transition-all duration-200 ${
                          selectedVariant?.id === variant.id
                            ? 'border-sisley-black bg-sisley-black text-white'
                            : 'border-sisley-gray-300 text-sisley-gray-600 hover:border-sisley-black'
                        }`}
                      >
                        {variant.color} / {variant.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <label className="block text-xs uppercase tracking-widest text-sisley-gray-600 mb-3">
                  Cantidad
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-sisley-gray-300 hover:border-sisley-black transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-sisley-gray-300 hover:border-sisley-black transition-colors"
                  >
                    +
                  </button>
                </div>
                {selectedVariant && (
                  <p className="text-xs text-sisley-gray-500 mt-2">
                    Stock disponible: {selectedVariant.stock}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={handleAddToCart} className="flex-1">
                  {added ? 'Agregado ✓' : 'Agregar al carrito'}
                </Button>
                <Link href="/carrito">
                  <Button variant="secondary" size="lg">
                    Ver carrito
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-20 md:mt-32">
              <div className="mb-10">
                <p className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-3">Relacionados</p>
                <h2 className="text-2xl md:text-3xl font-light text-sisley-black">También te gustará</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {related.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
