import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductCard from '@/app/components/ProductCard';
import Button from '@/app/components/Button';
import SectionHeader from '@/app/components/SectionHeader';
import ImageWithPlaceholder from '@/app/components/ImageWithPlaceholder';
import { getProducts } from '@/app/services/products';
import { getCategories } from '@/app/services/categories';
import Link from 'next/link';

async function getFeaturedProducts() {
  try {
    const data = await getProducts({ status: 'active', limit: '12', orderBy: 'featured' });
    return data.data || [];
  } catch (error) {
    console.error('Failed to load featured products:', error.message);
    return [];
  }
}

async function getActiveCategories() {
  try {
    const data = await getCategories({ status: 'active', limit: '8' });
    return data.data || [];
  } catch (error) {
    console.error('Failed to load categories:', error.message);
    return [];
  }
}

export default async function Home() {
  const [featured, categories] = await Promise.all([getFeaturedProducts(), getActiveCategories()]);
  const destacados = featured.slice(0, 8);

  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-screen flex items-end bg-sisley-bg">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10" />
            <ImageWithPlaceholder
              alt="Nueva colección Sisley"
              className="w-full h-full object-cover"
              style={{ aspectRatio: 'banner' }}
            />
          </div>

          <div className="relative z-20 max-w-[1600px] mx-auto px-6 lg:px-10 pb-20 md:pb-32 pt-32 w-full">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-widest text-white/80 mb-4 md:mb-6">
                Nueva Colección
              </p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6">
                El arte de vestir
              </h1>
              <p className="text-sm md:text-base text-white/80 leading-relaxed mb-8 max-w-lg">
                Descubre una colección donde la elegancia contemporánea se encuentra con la artesanía atemporal.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/catalogo" size="lg">
                  Descubrir colección
                </Button>
                <Button href="/catalogo?coleccion=nueva" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-sisley-black">
                  Comprar ahora
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <SectionHeader
              eyebrow="Categorías"
              title="Explora por estilo"
              align="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              {categories.slice(0, 4).map((category, index) => {
                const isLarge = index === 0;
                return (
                  <Link
                    key={category.id}
                    href={`/catalogo?categoria=${category.slug}`}
                    className={`group relative overflow-hidden bg-sisley-bg ${
                      isLarge ? 'md:col-span-7 aspect-[4/5] md:aspect-auto md:row-span-2' : 'md:col-span-5 aspect-[4/3]'
                    }`}
                  >
                    <div className="absolute inset-0 bg-sisley-bg flex items-center justify-center">
                      <svg className="w-16 h-16 text-sisley-border-strong" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <p className="text-[10px] uppercase tracking-widest text-sisley-muted mb-1">
                        {category.count || ''} productos
                      </p>
                      <h3 className="font-serif text-xl md:text-2xl font-light text-sisley-black group-hover:translate-x-1 transition-transform duration-300">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-bg">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
              <div>
                <SectionHeader
                  eyebrow="Selección"
                  title="Destacados"
                  subtitle="Piezas seleccionadas por nuestra directora creativa para esta temporada."
                  align="left"
                  className="mb-0"
                />
              </div>
              <Link href="/catalogo" className="text-[11px] uppercase tracking-widest text-sisley-text-secondary hover:text-sisley-black transition-colors">
                Ver todos →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {destacados.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="aspect-[4/5] bg-sisley-bg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-24 h-24 text-sisley-border-strong" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="max-w-lg">
                <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-4">Editorial</p>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-sisley-black tracking-tight leading-tight mb-6">
                  La nueva temporada
                </h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed mb-8">
                  Cada pieza está diseñada para contar una historia. Desde la selección de tejidos hasta el corte final, cada detalle refleja nuestra búsqueda incesante de la excelencia.
                </p>
                <Button href="/catalogo" variant="secondary">
                  Descubrir más
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-bg">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <SectionHeader
              eyebrow="Novedades"
              title="New arrivals"
              subtitle="Las últimas incorporaciones a nuestra colección."
              align="left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {destacados.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-black text-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 text-center">
            <p className="text-[11px] uppercase tracking-widest text-white/60 mb-4">Colección</p>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight leading-tight mb-6">
              La nueva temporada te espera
            </h2>
            <p className="text-sm text-white/70 leading-relaxed mb-8 max-w-xl mx-auto">
              Descubre piezas diseñadas para perdurar. Moda con propósito, calidad y alma.
            </p>
            <Button href="/catalogo" variant="secondary" className="border-white text-white hover:bg-white hover:text-sisley-black">
              Explorar colección
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}