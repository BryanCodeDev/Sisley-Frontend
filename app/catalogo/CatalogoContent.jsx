'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/app/components/ProductCard';
import Button from '@/app/components/Button';
import EditorialLabel from '@/app/components/EditorialLabel';
import ScrollReveal from '@/app/components/ScrollReveal';
import { getProducts } from '@/app/services/products';
import { getCategories } from '@/app/services/categories';
import Link from 'next/link';
import { SlidersHorizontal, X, ChevronRight } from 'lucide-react';

export default function CatalogoContent({ searchParams }) {
  const categoryFilter = searchParams?.categoria || '';
  const searchQuery = searchParams?.search || '';
  const [sort, setSort] = useState('destacados');
  const [priceRange, setPriceRange] = useState('todos');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter((p) =>
      p.name?.toLowerCase().includes(q) ||
      p.categoryName?.toLowerCase().includes(q)
    );
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
  const hasActiveFilters = categoryFilter || priceRange !== 'todos' || searchQuery;

  const clearFilters = () => {
    setPriceRange('todos');
    window.location.href = '/catalogo';
  };

  return (
    <main className="min-h-screen bg-sisley-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 pt-12 md:pt-16">
        <div className="mb-10 md:mb-14">
          <EditorialLabel number="01" label="Tienda" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif display-sm md:display-md text-sisley-text tracking-tighter leading-[0.95]">
                {selectedCategory ? selectedCategory.name : searchQuery ? `"${searchQuery}"` : 'Todos los productos'}
              </h1>
              {selectedCategory && (
                <p className="text-sm text-sisley-text-secondary mt-3 max-w-xl">{selectedCategory.description}</p>
              )}
              {searchQuery && !selectedCategory && (
                <p className="text-sm text-sisley-text-secondary mt-3">
                  {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'} para "{searchQuery}"
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${
                  showFilters ? 'text-sisley-black' : 'text-sisley-text-secondary hover:text-sisley-black'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
                Filtros
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-xs bg-transparent border border-sisley-border px-3 py-2 focus:outline-none focus:border-sisley-black uppercase tracking-widest text-sisley-text-secondary"
              >
                <option value="destacados">Destacados</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="nombre">Nombre A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-sisley-border">
            <span className="text-[11px] uppercase tracking-widest text-sisley-muted">Filtros activos:</span>
            {categoryFilter && selectedCategory && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-sisley-smoke text-xs text-sisley-text">
                {selectedCategory.name}
                <button onClick={() => { setPriceRange('todos'); window.location.href = '/catalogo'; }} className="hover:text-sisley-black">
                  <X className="w-3 h-3" strokeWidth={1.5} />
                </button>
              </span>
            )}
            {priceRange !== 'todos' && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-sisley-smoke text-xs text-sisley-text">
                {priceRange === 'bajo' ? 'Menos de $200.000' : priceRange === 'medio' ? '$200.000 - $400.000' : 'Más de $400.000'}
                <button onClick={() => setPriceRange('todos')} className="hover:text-sisley-black">
                  <X className="w-3 h-3" strokeWidth={1.5} />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-sisley-smoke text-xs text-sisley-text">
                "{searchQuery}"
                <button onClick={() => window.location.href = '/catalogo'} className="hover:text-sisley-black">
                  <X className="w-3 h-3" strokeWidth={1.5} />
                </button>
              </span>
            )}
            <button onClick={clearFilters} className="text-[11px] uppercase tracking-widest text-sisley-muted hover:text-sisley-black underline ml-2">
              Limpiar todo
            </button>
          </div>
        )}

        {showFilters && (
          <div className="mb-10 pb-8 border-b border-sisley-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-meta uppercase tracking-[0.25em] text-sisley-muted mb-4">Categorías</h3>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/catalogo"
                    className={`px-4 py-2 text-xs border transition-colors ${
                      !categoryFilter ? 'border-sisley-black bg-sisley-black text-white' : 'border-sisley-border text-sisley-text-secondary hover:border-sisley-black'
                    }`}
                  >
                    Todas
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/catalogo?categoria=${category.slug}`}
                      className={`px-4 py-2 text-xs border transition-colors ${
                        categoryFilter === category.slug ? 'border-sisley-black bg-sisley-black text-white' : 'border-sisley-border text-sisley-text-secondary hover:border-sisley-black'
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-meta uppercase tracking-[0.25em] text-sisley-muted mb-4">Precio</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'todos', label: 'Todos' },
                    { value: 'bajo', label: 'Menos de $200.000' },
                    { value: 'medio', label: '$200.000 - $400.000' },
                    { value: 'alto', label: 'Más de $400.000' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPriceRange(option.value)}
                      className={`px-4 py-2 text-xs border transition-colors ${
                        priceRange === option.value ? 'border-sisley-black bg-sisley-black text-white' : 'border-sisley-border text-sisley-text-secondary hover:border-sisley-black'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8">
            <p className="text-sm text-red-600">Error: {error}</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-sisley-muted mb-2 text-lg">No se encontraron productos</p>
            <p className="text-sm text-sisley-muted mb-8">Intenta ajustar los filtros o explora el catálogo completo.</p>
            <Link href="/catalogo">
              <Button size="sm">Ver todos los productos</Button>
            </Link>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] w-full bg-sisley-smoke animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((product, index) => (
              <ScrollReveal key={product.id} delay={60 * (index + 1)} animation="reveal-up">
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-sisley-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-sisley-border">
              <span className="text-meta uppercase tracking-[0.25em] text-sisley-muted">Filtros</span>
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
                <h3 className="text-meta uppercase tracking-[0.25em] text-sisley-muted mb-4">Categorías</h3>
                <div className="space-y-2">
                  <Link
                    href="/catalogo"
                    onClick={() => setMobileFiltersOpen(false)}
                    className={`block text-sm py-2 ${!categoryFilter ? 'text-sisley-black font-medium' : 'text-sisley-text-secondary'}`}
                  >
                    Todas
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/catalogo?categoria=${category.slug}`}
                      onClick={() => setMobileFiltersOpen(false)}
                      className={`block text-sm py-2 ${categoryFilter === category.slug ? 'text-sisley-black font-medium' : 'text-sisley-text-secondary'}`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-meta uppercase tracking-[0.25em] text-sisley-muted mb-4">Precio</h3>
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
                      className={`block text-sm py-2 text-left ${priceRange === option.value ? 'text-sisley-black font-medium' : 'text-sisley-text-secondary'}`}
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
