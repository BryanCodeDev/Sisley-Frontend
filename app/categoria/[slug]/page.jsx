'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductCard from '@/app/components/ProductCard';
import Button from '@/app/components/Button';
import SectionHeader from '@/app/components/SectionHeader';
import Skeleton from '@/app/components/Skeleton';
import { getCategoryBySlug } from '@/app/services/categories';
import { getProducts } from '@/app/services/products';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';

export default function CategoriaPage() {
  const params = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState('destacados');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const catData = await getCategoryBySlug(params.slug);
        if (!catData) {
          notFound();
          return;
        }
        setCategory(catData);

        const prodData = await getProducts({ category: catData.id, status: 'active' });
        setProducts(prodData.data || []);
      } catch (err) {
        if (err.message?.includes('404')) {
          notFound();
          return;
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.slug]);

  let sortedProducts = [...products];

  if (sort === 'precio-asc') {
    sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sort === 'precio-desc') {
    sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sort === 'nombre') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    sortedProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
            <Skeleton className="h-8 w-48 mb-10" />
            <Skeleton className="h-10 w-full mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`${i === 0 ? 'lg:col-span-7 aspect-[4/5]' : 'lg:col-span-5 aspect-[3/4]'} w-full bg-sisley-smoke animate-pulse`} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-20 text-center">
            <p className="text-sm text-red-600 mb-4">Error: {error}</p>
            <Button onClick={() => window.location.reload()}>Reintentar</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  let categoryNotFound = false;

  if (!loading && !category && !error) {
    categoryNotFound = true;
  }

  if (categoryNotFound) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="mb-10">
            <SectionHeader
              eyebrow="Categoría"
              title={category?.name || 'Categoría'}
              subtitle={category?.description}
              align="left"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-sisley-border">
            <p className="text-sm text-sisley-text-secondary">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'producto' : 'productos'}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm bg-transparent border border-sisley-border px-3 py-2 focus:outline-none focus:border-sisley-black"
            >
              <option value="destacados">Destacados</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre A-Z</option>
            </select>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sisley-muted mb-4">No hay productos en esta categoría</p>
              <Link href="/catalogo">
                <Button size="sm">Ver todos los productos</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
              {sortedProducts.map((product, index) => (
                <ScrollReveal key={product.id} delay={60 * (index + 1)} animation="reveal-up">
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
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
