'use client';

import Link from 'next/link';
import { getProductBySlug } from '@/data/products';

export default function ProductCard({ product }) {
  return (
    <Link href={`/producto/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] bg-sisley-gray-100 overflow-hidden mb-4">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sisley-gray-300">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-sisley-black text-white text-[10px] uppercase tracking-widest">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
      <div className="px-1">
        <p className="text-[10px] uppercase tracking-widest text-sisley-gray-400 mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-normal text-sisley-black mb-2 group-hover:opacity-70 transition-opacity">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            ${product.price.toLocaleString('es-CO')}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-sisley-gray-400 line-through">
              ${product.originalPrice.toLocaleString('es-CO')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
