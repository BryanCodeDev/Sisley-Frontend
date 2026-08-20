'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductCard from '@/app/components/ProductCard';
import Button from '@/app/components/Button';
import { products } from '@/data/products';
import { getCategoryBySlug, categories } from '@/data/categories';
import { useParams, notFound } from 'next/navigation';

export default function CategoriaPage() {
  const params = useParams();
  const slug = params.slug;
  const category = getCategoryBySlug(slug);
  
  const [sort, setSort] = useState('destacados');
  
  let categoryProducts = category ? products.filter((p) => p.category === category.id) : [];

  if (sort === 'precio-asc') {
    categoryProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'precio-desc') {
    categoryProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'nombre') {
    categoryProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    categoryProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-2">Categoría</p>
            <h1 className="text-3xl md:text-4xl font-light text-sisley-black mb-2">{category.name}</h1>
            <p className="text-sm text-sisley-gray-500">{category.description}</p>
          </div>

          <div className="flex justify-between items-center mb-6 pb-4 border-b border-sisley-gray-200">
            <p className="text-sm text-sisley-gray-500">
              {categoryProducts.length} {categoryProducts.length === 1 ? 'producto' : 'productos'}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm bg-transparent border border-sisley-gray-300 px-3 py-2 focus:outline-none focus:border-sisley-black"
            >
              <option value="destacados">Destacados</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre A-Z</option>
            </select>
          </div>

          {categoryProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sisley-gray-400 mb-4">No hay productos en esta categoría</p>
              <Link href="/catalogo">
                <Button size="sm">Ver todos los productos</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/catalogo">
              <Button variant="secondary">Volver al catálogo</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
