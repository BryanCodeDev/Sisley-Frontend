'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFavorites } from '@/app/contexts/FavoritesContext';
import { Heart } from 'lucide-react';

const FALLBACK_IMAGES = [
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

function getProductImage(product) {
  if (product.images?.[0]?.url) return product.images[0].url;
  if (product.image) return product.image;
  const index = product.id ? (product.id - 1) % FALLBACK_IMAGES.length : 0;
  return FALLBACK_IMAGES[index];
}

function getProductImageAlt(product) {
  return product.images?.[0]?.altText || product.name || 'Producto Sisley';
}

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const imageSrc = getProductImage(product);
  const imageAlt = getProductImageAlt(product);
  const secondImage = product.images?.[1]?.url || imageSrc;
  const favorite = isFavorite(product.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <Link
      href={`/producto/${product.slug || product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-sisley-smoke overflow-hidden mb-4">
        <img
          src={isHovered ? secondImage : imageSrc}
          alt={imageAlt}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isHovered ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
          }`}
        />

        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-sisley-white text-sisley-text text-[10px] uppercase tracking-widest z-10">
            {product.badge}
          </span>
        )}

        <button
          className={`absolute top-3 right-3 p-2 backdrop-blur-sm text-sisley-text transition-all z-10 duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          } ${
            favorite ? 'bg-red-50 text-red-600' : 'bg-sisley-white/90 hover:text-sisley-black'
          }`}
          aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          onClick={handleFavoriteClick}
        >
          <Heart className="w-4 h-4" fill={favorite ? 'currentColor' : 'none'} strokeWidth={1.5} />
        </button>

        <div
          className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-white text-[11px] uppercase tracking-widest flex items-center gap-2">
            Ver producto
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </span>
        </div>

        <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.2em] text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {String(product.id).padStart(2, '0')}
        </div>
      </div>

      <div className="px-1">
        <p className="text-meta uppercase tracking-[0.2em] text-sisley-muted mb-2">
          {product.categoryName || product.category}
        </p>
        <h3 className="text-sm font-normal text-sisley-text leading-snug mb-2 group-hover:opacity-70 transition-opacity">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-sisley-black">
            ${Number(product.price).toLocaleString('es-CO')}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-sisley-muted line-through">
              ${Number(product.originalPrice).toLocaleString('es-CO')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
