import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductCard from '@/app/components/ProductCard';
import Button from '@/app/components/Button';
import SectionHeader from '@/app/components/SectionHeader';
import ScrollReveal from '@/app/components/ScrollReveal';
import EditorialLabel from '@/app/components/EditorialLabel';
import HeroSection from '@/app/components/HeroSection';
import ImageWithPlaceholder from '@/app/components/ImageWithPlaceholder';
import { getProducts } from '@/app/services/products';
import Image from 'next/image';
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

        <section className="border-y border-sisley-border bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6">
              {[
                { t: 'Envío a todo Colombia', d: 'Recibe tu pedido donde estés.' },
                { t: 'Devoluciones en 30 días', d: 'Cámbialo si no es perfecto.' },
                { t: 'Pago 100% seguro', d: 'Tus datos, siempre protegidos.' },
                { t: 'Tallas reales', d: 'Guía de tallas para acertar.' },
              ].map((b) => (
                <div key={b.t} className="flex flex-col">
                  <p className="font-serif text-sm text-sisley-black">{b.t}</p>
                  <p className="text-xs text-sisley-muted mt-1">{b.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <ScrollReveal>
              <EditorialLabel number="01" label="Explora por estilo" />
              <SectionHeader
                eyebrow="Categorías"
                title="Tu estilo, a un clic"
                subtitle="Del look de todos los días al detalle de gala. Elige tu categoría y descubre una selección pensada para ti."
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
                          {category.count ? `${category.count} piezas` : 'Colección'}
                        </p>
                        <h3 className="font-serif text-xl md:text-2xl font-light text-sisley-black group-hover:translate-x-1 transition-transform duration-300">
                          {category.name}
                        </h3>
                        <span className="mt-2 inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-sisley-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Ver colección →
                        </span>
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
                    title="Destacados de la temporada"
                    subtitle="Piezas elegidas a mano por nuestra directora creativa. Lo mejor de Sisley, ahora en un solo lugar."
                    align="left"
                    className="mb-0"
                  />
                </div>
                <Link href="/catalogo" className="text-[11px] uppercase tracking-widest text-sisley-text-secondary hover:text-sisley-black transition-colors">
                  Ver todo →
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
                <div className="relative overflow-hidden aspect-[4/5] w-full">
                  <Image
                    src="/assets/catalog/Hero-alterno.webp"
                    alt="La nueva temporada — Sisley Colombia"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="max-w-lg">
                  <EditorialLabel number="03" label="Editorial" />
                  <h2 className="font-serif text-3xl md:text-4xl font-light text-white tracking-tight leading-tight mb-6">
                    La nueva temporada, a tu medida
                  </h2>
                  <p className="text-sm text-sisley-dark-muted leading-relaxed mb-8">
                    Cada prenda nace de una obsesión por el detalle: telas que se sienten, cortes que favorecen y acabados que perduran. Esta temporada, vestir bien nunca fue tan fácil.
                  </p>
                  <Button href="/catalogo" variant="secondary" className="border-white text-white hover:bg-white hover:text-sisley-black">
                    Descubrir la colección
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
                <div>
                  <EditorialLabel number="04" label="Novedades" />
                  <SectionHeader
                    eyebrow="Novedades"
                    title="Lo último que acaba de llegar"
                    subtitle="Renovamos la colección cada semana. Estrenos limitados, primero para ti."
                    align="left"
                    className="mb-0"
                  />
                </div>
                <Link href="/catalogo" className="text-[11px] uppercase tracking-widest text-sisley-text-secondary hover:text-sisley-black transition-colors">
                  Ver todo →
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {destacados.slice(4, 8).map((product, index) => (
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
              <p className="text-[11px] uppercase tracking-widest text-white/60 mb-4">Tu nueva colección</p>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight leading-tight mb-6">
                Tu armario merece una nueva historia
              </h2>
              <p className="text-sm text-white/70 leading-relaxed mb-8 max-w-xl mx-auto">
                Únete a miles de mujeres que ya visten Sisley: envío rápido, cambios fáciles y la calidad que no decepciona.
              </p>
              <Button href="/catalogo" variant="secondary" className="border-white text-white hover:bg-white hover:text-sisley-black">
                Empezar a comprar
              </Button>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
