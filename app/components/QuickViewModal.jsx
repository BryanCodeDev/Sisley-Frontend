'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Heart, Plus, Minus, Check, ChevronRight } from 'lucide-react';
import { addToCart } from '@/app/services/cart';
import { useFavorites } from '@/app/contexts/FavoritesContext';
import Button from './Button';

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
];

function getProductImage(src, index = 0) {
  if (src) return src;
  return PRODUCT_FALLBACK_IMAGES[index % PRODUCT_FALLBACK_IMAGES.length];
}

export default function QuickViewModal({ product, open, onClose }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [visible, setVisible] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants?.[0] || null);
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    return undefined;
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!product) return null;

  const images = product.images?.length ? product.images : [product.image].filter(Boolean);
  const favorite = isFavorite(product.id);

  const handleAddToCart = async () => {
    try {
      await addToCart({ variantId: selectedVariant?.id || product.id, quantity });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      // silent
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-labelledby="quickview-title">
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={onClose}
          />
          <div
            className={`absolute inset-0 flex items-center justify-center p-4 md:p-8 transition-all duration-500 ease-out motion-reduce:transition-none ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative bg-sisley-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-sisley-white/90 backdrop-blur-sm text-sisley-text-secondary hover:text-sisley-black transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[500px] bg-sisley-smoke">
                  <ImageRevealWrapper
                    src={images[0]?.url || images[0] || getProductImage(null, product.id ? product.id - 1 : 0)}
                    alt={product.name}
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-sisley-white text-sisley-text text-[10px] uppercase tracking-widest z-10">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="p-6 md:p-10 flex flex-col">
                  <div className="flex-1">
                    <p className="text-meta uppercase tracking-[0.25em] text-sisley-muted mb-3">
                      {product.categoryName || 'Producto'}
                    </p>
                    <h2 id="quickview-title" className="font-serif title-xl md:title-lg text-sisley-text tracking-tight leading-[1.1] mb-4">
                      {product.name}
                    </h2>
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-2xl font-light text-sisley-black">
                        ${Number(product.price).toLocaleString('es-CO')}
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
                      </div>
                    )}

                    <div className="mb-8">
                      <label className="block text-meta uppercase tracking-[0.25em] text-sisley-text-secondary mb-3">
                        Cantidad
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center border border-sisley-border hover:border-sisley-black transition-colors"
                          aria-label="Reducir cantidad"
                        >
                          <Minus className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                        <span className="text-sm w-8 text-center font-medium">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center border border-sisley-border hover:border-sisley-black transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button size="lg" onClick={handleAddToCart} className="flex-1">
                      <span className="inline-flex items-center gap-2">
                        {added ? (
                          <>
                            <Check className="w-4 h-4" />
                            Agregado
                          </>
                        ) : (
                          'Agregar al carrito'
                        )}
                      </span>
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

                  <Link href={`/producto/${product.slug || product.id}`} onClick={onClose} className="mt-4">
                    <Button variant="ghost" size="sm" className="w-full">
                      <span className="inline-flex items-center justify-center gap-2">
                        Ver producto completo
                        <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ImageRevealWrapper({ src, alt }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    setIsLoaded(false);
  }, [src]);

  return (
    <div className="relative w-full h-full">
      <img
        src={src}
        alt={alt}
        loading="eager"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-[1200ms] ease-out ${
          isVisible && isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        onTransitionEnd={() => setIsVisible(true)}
      />
    </div>
  );
}
