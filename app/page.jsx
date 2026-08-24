import { Suspense } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductCard from '@/app/components/ProductCard';
import Button from '@/app/components/Button';
import SectionHeader from '@/app/components/SectionHeader';
import ScrollReveal from '@/app/components/ScrollReveal';
import EditorialLabel from '@/app/components/EditorialLabel';
import HeroSection from '@/app/components/HeroSection';
import ErrorBoundary from '@/app/components/ErrorBoundary';
import ImageReveal from '@/app/components/ImageReveal';
import { getProducts } from '@/app/services/products';
import { getCategories } from '@/app/services/categories';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sisley Colombia — Moda Premium',
  description: 'Descubre la nueva colección Sisley: moda premium, elegancia contemporánea y estilo atemporal.',
  openGraph: {
    title: 'Sisley Colombia',
    description: 'Moda premium con identidad. Envío a todo Colombia.',
    images: ['/assets/logo.webp'],
  },
};

async function getFeaturedProducts() {
  try {
    const data = await getProducts({
      status: 'active',
      limit: '12',
      orderBy: 'featured',
      inStock: 'true',
    });
    return data.data ?? [];
  } catch (error) {
    console.error('Failed to load featured products:', error.message);
    return [];
  }
}

async function getActiveCategories() {
  try {
    const data = await getCategories({ status: 'active', limit: '8' });
    return data.data ?? [];
  } catch (error) {
    console.error('Failed to load categories:', error.message);
    return [];
  }
}

async function CategoriesSection() {
  const categories = await getActiveCategories();
  const topCategories = categories.slice(0, 4);

  if (topCategories.length === 0) {
    return (
      <p className="text-sm text-sisley-muted">
        No hay categorías disponibles en este momento. Vuelve pronto o explora el{' '}
        <Link href="/catalogo" className="underline hover:text-sisley-black">
          catálogo completo
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {topCategories.map((category, index) => {
        const isLarge = index === 0;
        return (
          <ScrollReveal key={category.id} delay={100 * (index + 1)} animation="reveal-up">
            <Link
              href={`/catalogo?categoria=${category.slug}`}
              className={`group relative overflow-hidden block ${
                isLarge ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <div
                className={`relative w-full overflow-hidden bg-sisley-smoke ${
                  isLarge
                    ? 'aspect-[4/5] lg:aspect-auto lg:h-full min-h-[350px] lg:min-h-[500px]'
                    : 'aspect-[4/3]'
                }`}
              >
                <ImageReveal
                  src={category.imageUrl || category.image || null}
                  alt={category.name}
                  aspectRatio=""
                  className="w-full h-full"
                  fallbackLetter={category.name.charAt(0)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 lg:p-8">
                  <p className="text-meta uppercase tracking-[0.25em] text-white/60 mb-2">
                    {category.count ? `${category.count} piezas` : 'Colección'}
                  </p>
                  <h3
                    className={`font-serif font-light text-white tracking-tight ${
                      isLarge ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'
                    }`}
                  >
                    {category.name}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-meta uppercase tracking-[0.2em] text-white/90 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Explorar
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

function AsymmetricProductGrid({ products, emptyMessage }) {
  if (products.length === 0) {
    return (
      <p className="text-sm text-sisley-muted">
        {emptyMessage}{' '}
        <Link href="/catalogo" className="underline hover:text-sisley-black">
          Ver catálogo completo
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">
      {products.map((product, index) => {
        const isHero = index === 0;
        return (
          <ScrollReveal key={product.id} delay={80 * (index + 1)} animation="reveal-up">
            <div className={`${isHero ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'}`}>
              <ProductCard product={product} />
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

async function FeaturedSection() {
  const featured = await getFeaturedProducts();
  return (
    <AsymmetricProductGrid
      products={featured.slice(0, 5)}
      emptyMessage="Aún no hay destacados publicados."
    />
  );
}

async function NewArrivalsSection() {
  const featured = await getFeaturedProducts();
  return (
    <AsymmetricProductGrid
      products={featured.slice(5, 10)}
      emptyMessage="Aún no hay novedades publicadas."
    />
  );
}

function GridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`${i === 0 ? 'lg:col-span-7 aspect-[4/5]' : 'lg:col-span-5 aspect-[3/4]'} w-full bg-sisley-smoke animate-pulse`} />
      ))}
    </div>
  );
}

function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6" aria-hidden="true">
      <div className="lg:col-span-2 lg:row-span-2 aspect-[4/5] lg:aspect-auto min-h-[350px] lg:min-h-[500px] bg-sisley-smoke animate-pulse" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="aspect-[4/3] bg-sisley-smoke animate-pulse" />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />

        <section className="relative bg-sisley-charcoal text-white overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-20 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <ScrollReveal animation="reveal-up">
                <EditorialLabel number="01" label="Introducción" />
                <h2 className="font-serif display-sm md:display-md text-white tracking-tighter leading-[0.95] mb-6">
                  Nueva temporada.<br />Nueva historia.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200} animation="reveal-up">
                <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
                  Cada temporada reescribimos las reglas. Esta vez, la elegancia no es solo una cuestión de estilo, sino de actitud. Descubre piezas que hablan por ti.
                </p>
                <div className="mt-8">
                  <Link href="/catalogo">
                    <Button href="/catalogo" variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10 hover:border-white">
                      <span className="inline-flex items-center gap-3">
                        Explorar colección
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </span>
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section aria-labelledby="categorias-heading" className="py-20 md:py-32 bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <ScrollReveal animation="reveal-up">
              <EditorialLabel number="02" label="Categorías" />
              <SectionHeader
                id="categorias-heading"
                eyebrow="Explora"
                title="Tu estilo, a un clic"
                subtitle="Del look de todos los días al detalle de gala. Elige tu categoría y descubre una selección pensada para ti."
                align="left"
                className="mb-12"
              />
            </ScrollReveal>

            <ErrorBoundary
              title="No pudimos cargar las categorías"
              message="Intenta de nuevo o explora el catálogo completo."
            >
              <Suspense fallback={<CategoriesSkeleton />}>
                <CategoriesSection />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>

        <section aria-labelledby="destacados-heading" className="py-20 md:py-32 bg-sisley-smoke">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <ScrollReveal animation="reveal-up">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
                <div>
                  <EditorialLabel number="03" label="Selección" />
                  <SectionHeader
                    id="destacados-heading"
                    eyebrow="Destacados"
                    title="Piezas elegidas para ti"
                    subtitle="Selección curada por nuestra directora creativa. Lo mejor de la temporada, en un solo lugar."
                    align="left"
                    className="mb-0"
                  />
                </div>
                <Link
                  href="/catalogo"
                  className="text-meta uppercase tracking-[0.2em] text-sisley-text-secondary hover:text-sisley-black transition-colors inline-flex items-center gap-2 group"
                >
                  Ver todo
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>

            <ErrorBoundary
              title="No pudimos cargar los destacados"
              message="Intenta de nuevo o explora el catálogo completo."
            >
              <Suspense fallback={<GridSkeleton count={5} />}>
                <FeaturedSection />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>

        <section aria-labelledby="editorial-heading" className="py-20 md:py-32 bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <ScrollReveal animation="reveal-scale" className="relative overflow-hidden aspect-[4/5] w-full order-2 lg:order-1">
                <ImageReveal
                  src="/assets/catalog/Hero-alterno.webp"
                  alt="La nueva temporada — Sisley Colombia"
                  aspectRatio="aspect-[4/5]"
                  priority
                />
              </ScrollReveal>
              <ScrollReveal delay={200} animation="reveal-up" className="order-1 lg:order-2">
                <div className="max-w-lg lg:ml-auto">
                  <EditorialLabel number="04" label="Editorial" />
                  <h2
                    id="editorial-heading"
                    className="font-serif title-xl md:title-lg text-sisley-text tracking-tight leading-[1.05] mb-6"
                  >
                    La nueva temporada, a tu medida
                  </h2>
                  <p className="text-sm md:text-base text-sisley-text-secondary leading-relaxed mb-8">
                    Cada prenda nace de una obsesión por el detalle: telas que se sienten, cortes que favorecen y acabados que perduran. Esta temporada, vestir bien nunca fue tan fácil.
                  </p>
                  <Link href="/catalogo">
                    <Button href="/catalogo" size="lg" className="group">
                      <span className="inline-flex items-center gap-3">
                        Descubrir la colección
                        <svg className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </span>
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section aria-labelledby="novedades-heading" className="py-20 md:py-32 bg-sisley-charcoal text-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <ScrollReveal animation="reveal-up">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
                <div>
                  <EditorialLabel number="05" label="Novedades" />
                  <SectionHeader
                    id="novedades-heading"
                    eyebrow="Recién llegado"
                    title="Lo último que acaba de llegar"
                    subtitle="Renovamos la colección cada semana. Estrenos limitados, primero para ti."
                    align="left"
                    className="mb-0"
                  />
                </div>
                <Link
                  href="/catalogo"
                  className="text-meta uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  Ver todo
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>

            <ErrorBoundary
              title="No pudimos cargar las novedades"
              message="Intenta de nuevo o explora el catálogo completo."
            >
              <Suspense fallback={<GridSkeleton count={5} />}>
                <NewArrivalsSection />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>

        <section className="bg-sisley-black text-white py-16 md:py-24">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 text-center">
            <ScrollReveal animation="reveal-up">
              <p className="text-meta uppercase tracking-[0.3em] text-white/60 mb-6">Tu nueva historia</p>
              <h2 className="font-serif display-sm md:display-md text-white tracking-tighter leading-[0.95] mb-8">
                Tu armario merece<br />una nueva historia
              </h2>
              <p className="text-sm md:text-base text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
                Únete a miles de mujeres que ya visten Sisley. Envío rápido, cambios fáciles y la calidad que no decepciona.
              </p>
              <Link href="/catalogo">
                <Button href="/catalogo" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-sisley-black">
                  Empezar a comprar
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
