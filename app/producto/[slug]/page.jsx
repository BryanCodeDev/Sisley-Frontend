'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import ProductCard from '@/app/components/ProductCard';
import Breadcrumb from '@/app/components/Breadcrumb';
import Accordion from '@/app/components/Accordion';
import EditorialLabel from '@/app/components/EditorialLabel';
import ScrollReveal from '@/app/components/ScrollReveal';
import ImageReveal from '@/app/components/ImageReveal';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/app/services/products';
import { addToCart } from '@/app/services/cart';
import { useFavorites } from '@/app/contexts/FavoritesContext';

const PRODUCT_FALLBACK_IMAGES = [
  '/assets/catalog/1.webp',
  '/assets/catalog/2.webp',
  '/assets/catalog/3.webp',
  '/assets/catalog/4.webp',
  '/assets/catalog/5.webp',
  '/assets/catalog/6.webp',
  '/assets/catalog/7.webp',
  '/assets/catalog/8.webp',
  '/assets/catalog/9.webp',
  '/assets/catalog/blusa-satinada.webp',
  '/assets/catalog/pantalon-wide-leg.webp',
  '/assets/catalog/vestido-midi-plisado.webp',
];

function getProductImage(src, index = 0) {
  if (src) return src;
  return PRODUCT_FALLBACK_IMAGES[index % PRODUCT_FALLBACK_IMAGES.length];
}

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
  const { isFavorite, toggleFavorite } = useFavorites();

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

        const relatedData = await getProducts({ category: data.categoryId, limit: '5' });
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
    }
  };

  const handleImageChange = (index) => {
    setActiveImage(index);
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
  const favorite = isFavorite(product.id);

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
              <div className="aspect-[3/4] bg-sisley-smoke overflow-hidden">
                <ImageReveal
                  src={images[activeImage]?.url || images[activeImage] || getProductImage(null, product.id ? product.id - 1 : 0)}
                  alt={product.name}
                  aspectRatio="aspect-[3/4]"
                  priority
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={`flex-shrink-0 w-16 h-20 bg-sisley-smoke overflow-hidden border transition-all duration-300 ${
                        activeImage === index ? 'border-sisley-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={typeof img === 'string' ? img : img?.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <ScrollReveal animation="reveal-up">
                <EditorialLabel number="01" label={product.categoryName || 'Producto'} />
                <h1 className="font-serif display-sm md:display-md text-sisley-text tracking-tighter leading-[0.95] mb-6">
                  {product.name}
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={100} animation="reveal-up">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-2xl md:text-3xl font-light text-sisley-black">
                    ${selectedVariant ? Number(selectedVariant.price).toLocaleString('es-CO') : Number(product.price).toLocaleString('es-CO')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-sisley-muted line-through">
                      ${Number(product.originalPrice).toLocaleString('es-CO')}
                    </span>
                  )}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} animation="reveal-up">
                <p className="text-sm md:text-base text-sisley-text-secondary leading-relaxed mb-8">
                  {product.description}
                </p>
              </ScrollReveal>

              {product.variants && product.variants.length > 1 && (
                <ScrollReveal delay={300} animation="reveal-up" className="mb-6">
                  <label className="block text-meta uppercase tracking-[0.25em] text-sisley-text-secondary mb-3">
                    Talla / Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2.5 text-sm border transition-all duration-200 ${
                          selectedVariant?.id === variant.id
                            ? 'border-sisley-black bg-sisley-black text-white'
                            : 'border-sisley-border text-sisley-text-secondary hover:border-sisley-black'
                        }`}
                      >
                        {variant.color} / {variant.size}
                      </button>
                    ))}
                  </div>
                </ScrollReveal>
              )}

              <ScrollReveal delay={400} animation="reveal-up" className="mb-8">
                <label className="block text-meta uppercase tracking-[0.25em] text-sisley-text-secondary mb-3">
                  Cantidad
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center border border-sisley-border hover:border-sisley-black transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                    </svg>
                  </button>
                  <span className="text-sm w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center border border-sisley-border hover:border-sisley-black transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                  </button>
                </div>
                {selectedVariant && (
                  <p className="text-xs text-sisley-muted mt-3">
                    Stock disponible: {selectedVariant.stock}
                  </p>
                )}
              </ScrollReveal>

              <ScrollReveal delay={500} animation="reveal-up">
                <div className="flex flex-wrap gap-4 mb-10">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className={`flex-1 transition-all duration-300 ${
                      added ? 'bg-sisley-text border-sisley-text' : ''
                    }`}
                  >
                    {added ? 'Agregado al carrito' : 'Agregar al carrito'}
                  </Button>
                  <button
                    onClick={() => toggleFavorite(product)}
                    className={`w-14 h-14 flex items-center justify-center border transition-all duration-200 ${
                      favorite ? 'border-red-200 bg-red-50 text-red-600' : 'border-sisley-border text-sisley-text-secondary hover:border-sisley-black'
                    }`}
                    aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  >
                    <Heart className="w-5 h-5" fill={favorite ? 'currentColor' : 'none'} strokeWidth={1.5} />
                  </button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={600} animation="reveal-up">
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
              </ScrollReveal>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-20 md:mt-32">
              <ScrollReveal animation="reveal-up">
                <div className="mb-10">
                  <EditorialLabel number="02" label="Relacionados" />
                  <h2 className="font-serif title-xl md:title-lg text-sisley-text tracking-tight">
                    También te gustará
                  </h2>
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {related.map((product) => (
                  <ScrollReveal key={product.id} delay={100} animation="reveal-up">
                    <ProductCard product={product} />
                  </ScrollReveal>
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
