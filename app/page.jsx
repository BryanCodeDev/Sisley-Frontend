import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductCard from '@/app/components/ProductCard';
import Button from '@/app/components/Button';
import SectionHeader from '@/app/components/SectionHeader';
import ScrollReveal from '@/app/components/ScrollReveal';
import EditorialLabel from '@/app/components/EditorialLabel';
import HeroSection from '@/app/components/HeroSection';
import ImageWithPlaceholder from '@/app/components/ImageWithPlaceholder';
import EditorialPlaceholder from '@/app/components/EditorialPlaceholder';
import { getProducts } from '@/app/services/products';
import { getCategories } from '@/app/services/categories';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getFeaturedProducts() {
  try {
    const data = await getProducts({ status: 'active', limit: '12', orderBy: 'featured', inStock: 'true' });
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
  const topCategories = categories.slice(0, 4);

  return (
    <>
      <Header />
      <main>
        <HeroSection />

        <section className="py-20 md:py-32 bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <ScrollReveal>
              <EditorialLabel number="01" label="Explora por estilo" />
              <SectionHeader
                eyebrow="Categorías"
                title="Explora por estilo"
                align="left"
                className="mb-10"
              />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              {topCategories.map((category, index) => {
                const isLarge = index === 0;
                return (
                  <ScrollReveal key={category.id} delay={100 * (index + 1)}>
                    <Link
                      href={`/catalogo?categoria=${category.slug}`}
                      className={`group relative overflow-hidden bg-sisley-bg ${
                        isLarge ? 'md:col-span-7 aspect-[4/5] md:aspect-auto md:row-span-2' : 'md:col-span-5 aspect-[4/3]'
                      }`}
                    >
                      <ImageWithPlaceholder
                        src={category.imageUrl || category.image || null}
                        alt={category.name}
                        categorySlug={category.slug}
                        index={index}
                        className="w-full h-full"
                      />
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
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-bg">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
                <div>
                  <EditorialLabel number="02" label="Selección" />
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
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {destacados.slice(0, 4).map((product, index) => (
                <ScrollReveal key={product.id} delay={100 * (index + 1)}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-dark text-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <ScrollReveal>
                <EditorialPlaceholder
                  title="La nueva temporada"
                  subtitle="Editorial"
                  categorySlug="nueva-coleccion"
                  index={1}
                  aspectRatio="editorial"
                  className="w-full"
                />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="max-w-lg">
                  <EditorialLabel number="03" label="Editorial" />
                  <h2 className="font-serif text-3xl md:text-4xl font-light text-white tracking-tight leading-tight mb-6">
                    La nueva temporada
                  </h2>
                  <p className="text-sm text-sisley-dark-muted leading-relaxed mb-8">
                    Cada pieza está diseñada para contar una historia. Desde la selección de tejidos hasta el corte final, cada detalle refleja nuestra búsqueda incesante de la excelencia.
                  </p>
                  <Button href="/catalogo" variant="secondary" className="border-white text-white hover:bg-white hover:text-sisley-black">
                    Descubrir más
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <ScrollReveal>
              <EditorialLabel number="04" label="Novedades" />
              <SectionHeader
                eyebrow="Novedades"
                title="New arrivals"
                subtitle="Las últimas incorporaciones a nuestra colección."
                align="left"
                className="mb-10"
              />
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {destacados.slice(0, 4).map((product, index) => (
                <ScrollReveal key={product.id} delay={100 * (index + 1)}>
                  <ProductCard key={product.id} product={product} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-black text-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 text-center">
            <ScrollReveal>
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
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
