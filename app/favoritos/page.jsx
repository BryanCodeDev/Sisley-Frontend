'use client';

import { useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import EmptyState from '@/app/components/EmptyState';
import ProductCard from '@/app/components/ProductCard';
import { useFavorites } from '@/app/contexts/FavoritesContext';

export default function Favoritos() {
  const { favorites } = useFavorites();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Cuenta</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight">
              Mis favoritos
            </h1>
          </div>

          {favorites.length === 0 ? (
            <EmptyState
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              title="No tienes favoritos aún"
              description="Guarda los productos que te gustan para encontrarlos fácilmente después."
              actionLabel="Explorar catálogo"
              actionHref="/catalogo"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
