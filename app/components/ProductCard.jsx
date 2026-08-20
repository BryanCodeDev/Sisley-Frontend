'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/producto/${product.slug || product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-sisley-bg overflow-hidden mb-4">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              isHovered ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sisley-border-strong">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-sisley-white text-sisley-text text-[10px] uppercase tracking-widest z-10">
            {product.badge}
          </span>
        )}

        <button
          className="absolute top-3 right-3 p-2 bg-sisley-white/90 backdrop-blur-sm text-sisley-text hover:text-sisley-black transition-colors z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
          aria-label="Agregar a favoritos"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <div
          className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
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
      </div>

      <div className="px-1">
        <p className="text-[10px] uppercase tracking-widest text-sisley-muted mb-1.5">
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