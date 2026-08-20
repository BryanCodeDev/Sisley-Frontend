'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/app/components/ProductCard';
import Button from '@/app/components/Button';
import Badge from '@/app/components/Badge';
import { getProducts } from '@/app/services/products';
import { getCategories } from '@/app/services/categories';
import Link from 'next/link';
import { SlidersHorizontal, X } from 'lucide-react';

export default function CatalogoContent({ searchParams }) {
  const categoryFilter = searchParams?.categoria || '';
  const [sort, setSort] = useState('destacados');
  const [priceRange, setPriceRange] = useState('todos');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts({ status: 'active', limit: '100' }),
          getCategories({ status: 'active' }),
        ]);
        setProducts(productsRes.data || []);
        setCategories(categoriesRes.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  let filtered = [...products];

  if (categoryFilter) {
    filtered = filtered.filter((p) => p.categorySlug === categoryFilter || String(p.categoryId) === categoryFilter);
  }

  if (priceRange === 'bajo') {
    filtered = filtered.filter((p) => Number(p.price) < 200000);
  } else if (priceRange === 'medio') {
    filtered = filtered.filter((p) => Number(p.price) >= 200000 && Number(p.price) < 400000);
  } else if (priceRange === 'alto') {
    filtered = filtered.filter((p) => Number(p.price) >= 400000);
  }

  if (sort === 'precio-asc') {
    filtered.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sort === 'precio-desc') {
    filtered.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sort === 'nombre') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  const selectedCategory = categoryFilter ? categories.find((c) => c.slug === categoryFilter || String(c.id) === categoryFilter) : null;

  return (
    <main className="min-h-screen bg-sisley-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Tienda</p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight">
            {selectedCategory ? selectedCategory.name : 'Todos los productos'}
          </h1>
          {selectedCategory && (
            <p className="text-sm text-sisley-text-secondary mt-2">{selectedCategory.description}</p>
          )}
        </div>

        {error && (
          <div className="mb-6">
            <p className="text-sm text-red-600">Error: {error}</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-[11px] uppercase tracking-widest text-sisley-muted mb-4">Categorías</h3>
                <div className="space-y-2">
                  <Link
                    href="/catalogo"
                    className={`block text-sm py-1 ${!categoryFilter ? 'text-sisley-black font-medium' : 'text-sisley-text-secondary hover:text-sisley-black'}`}
                  >
                    Todas
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/catalogo?categoria=${category.slug}`}
                      className={`block text-sm py-1 ${categoryFilter === category.slug ? 'text-sisley-black font-medium' : 'text-sisley-text-secondary hover:text-sisley-black'}`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[11px] uppercase tracking-widest text-sisley-muted mb-4">Precio</h3>
                <div className="space-y-2">
                  {[
                    { value: 'todos', label: 'Todos' },
                    { value: 'bajo', label: 'Menos de $200.000' },
                    { value: 'medio', label: '$200.000 - $400.000' },
                    { value: 'alto', label: 'Más de $400.000' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPriceRange(option.value)}
                      className={`block text-sm py-1 text-left ${priceRange === option.value ? 'text-sisley-black font-medium' : 'text-sisley-text-secondary hover:text-sisley-black'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-sisley-border">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="md:hidden flex items-center gap-2 text-xs uppercase tracking-widest text-sisley-text-secondary hover:text-sisley-black transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtros
                </button>
                <p className="text-sm text-sisley-text-secondary">
                  {loading ? 'Cargando...' : `${filtered.length} ${filtered.length === 1 ? 'producto' : 'productos'}`}
                </p>
              </div>
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

            {!loading && filtered.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-sisley-muted mb-4">No se encontraron productos</p>
                <Link href="/catalogo">
                  <Button size="sm">Ver todos los productos</Button>
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-sisley-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-sisley-border">
              <span className="text-[11px] uppercase tracking-widest text-sisley-muted">Filtros</span>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors"
                aria-label="Cerrar filtros"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div>
                <h3 className="text-[11px] uppercase tracking-widest text-sisley-muted mb-4">Categorías</h3>
                <div className="space-y-2">
                  <Link
                    href="/catalogo"
                    onClick={() => setMobileFiltersOpen(false)}
                    className={`block text-sm py-1 ${!categoryFilter ? 'text-sisley-black font-medium' : 'text-sisley-text-secondary'}`}
                  >
                    Todas
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/catalogo?categoria=${category.slug}`}
                      onClick={() => setMobileFiltersOpen(false)}
                      className={`block text-sm py-1 ${categoryFilter === category.slug ? 'text-sisley-black font-medium' : 'text-sisley-text-secondary'}`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[11px] uppercase tracking-widest text-sisley-muted mb-4">Precio</h3>
                <div className="space-y-2">
                  {[
                    { value: 'todos', label: 'Todos' },
                    { value: 'bajo', label: 'Menos de $200.000' },
                    { value: 'medio', label: '$200.000 - $400.000' },
                    { value: 'alto', label: 'Más de $400.000' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => { setPriceRange(option.value); setMobileFiltersOpen(false); }}
                      className={`block text-sm py-1 text-left ${priceRange === option.value ? 'text-sisley-black font-medium' : 'text-sisley-text-secondary'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}