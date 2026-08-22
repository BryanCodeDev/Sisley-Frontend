'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Badge from '@/app/components/Badge';
import ProductCard from '@/app/components/ProductCard';
import Breadcrumb from '@/app/components/Breadcrumb';
import Accordion from '@/app/components/Accordion';
import ImageWithPlaceholder from '@/app/components/ImageWithPlaceholder';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/app/services/products';
import { addToCart } from '@/app/services/cart';

export default function ProductoPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [imageKey, setImageKey] = useState(0);

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
        setActiveImage(0);
        setImageKey(0);

        const relatedData = await getProducts({ category: data.categoryId, limit: '4' });
        setRelated((relatedData.data || []).filter((p) => p.id !== data.id).slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.slug]);

  const handleAddToCart = async () => {
    try {
      await addToCart({ variantId: selectedVariant?.id || product.id, quantity });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('Error adding to cart:', err.message);
      alert('Error al agregar al carrito');
    }
  };

  const handleImageChange = (index) => {
    setActiveImage(index);
    setImageKey((k) => k + 1);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-sisley-white flex items-center justify-center">
          <p className="text-sm text-sisley-muted">Cargando producto...</p>
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

  const images = product.images?.length ? product.images : [product.image].filter(Boolean);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-8 md:py-12">
          <Breadcrumb
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Tienda', href: '/catalogo' },
              { label: product.categoryName, href: `/catalogo?categoria=${product.categorySlug}` },
              { label: product.name },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-sisley-bg overflow-hidden">
                <ImageWithPlaceholder
                  key={imageKey}
                  src={images[activeImage] || null}
                  alt={product.name}
                  categorySlug={product.categorySlug || product.category || ''}
                  index={(product.id ? product.id - 1 : 0) % 3}
                  className="w-full h-full object-cover"
                  style={{ animation: 'fade-in 400ms ease-out' }}
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={`flex-shrink-0 w-16 h-20 bg-sisley-bg overflow-hidden border-2 transition-all duration-300 ${
                        activeImage === index ? 'border-sisley-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <ImageWithPlaceholder
                        src={img}
                        alt=""
                        categorySlug={product.categorySlug || product.category || ''}
                        index={index % 3}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              {product.badge && (
                <Badge variant="outline" size="sm" className="mb-4">{product.badge}</Badge>
              )}
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">
                {product.categoryName}
              </p>
              <h1 className="font-serif text-2xl md:text-3xl font-light text-sisley-text tracking-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-light text-sisley-black">
                  ${selectedVariant ? Number(selectedVariant.price).toLocaleString('es-CO') : Number(product.price).toLocaleString('es-CO')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-sisley-muted line-through">
                    ${Number(product.originalPrice).toLocaleString('es-CO')}
                  </span>
                )}
              </div>

              <p className="text-sm text-sisley-text-secondary leading-relaxed mb-8">
                {product.description}
              </p>

              {product.variants && product.variants.length > 1 && (
                <div className="mb-6">
                  <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-3">
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
                            : 'border-sisley-border text-sisley-text-secondary hover:border-sisley-black'
                        }`}
                      >
                        {variant.color} / {variant.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-3">
                  Cantidad
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-sisley-border hover:border-sisley-black transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                    </svg>
                  </button>
                  <span className="text-sm w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-sisley-border hover:border-sisley-black transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                  </button>
                </div>
                {selectedVariant && (
                  <p className="text-xs text-sisley-muted mt-2">
                    Stock disponible: {selectedVariant.stock}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className={`flex-1 transition-all duration-300 ${
                    added ? 'bg-sisley-text border-sisley-text' : ''
                  }`}
                >
                  {added ? 'Agregado al carrito' : 'Agregar al carrito'}
                </Button>
                <Button variant="ghost" size="lg">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Favoritos
                </Button>
              </div>

              <div className="border-t border-sisley-border pt-8">
                <Accordion
                  items={[
                    {
                      title: 'Envíos y entregas',
                      content: 'Entrega estándar: 3-5 días hábiles. Envío express: 1-2 días hábiles. Envío gratuito en compras superiores a $500.000.',
                    },
                    {
                      title: 'Cambios y devoluciones',
                      content: 'Tienes hasta 30 días después de la entrega para solicitar un cambio o devolución. El producto debe estar sin uso y con su empaque original.',
                    },
                    {
                      title: 'Cuidado del producto',
                      content: 'Sigue las instrucciones de cuidado indicadas en la etiqueta. Para mejores resultados, almacena los productos en un lugar fresco y seco, alejados de la luz solar directa.',
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-20 md:mt-32">
              <div className="mb-10">
                <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-3">También te gustará</p>
                <h2 className="font-serif text-2xl md:text-3xl font-light text-sisley-text tracking-tight">
                  Productos relacionados
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {related.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-sisley-white border-t border-sisley-border p-4 z-40">
          <Button size="lg" onClick={handleAddToCart} className="w-full">
            {added ? 'Agregado al carrito' : 'Agregar al carrito'}
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
