import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductCard from '@/app/components/ProductCard';
import Button from '@/app/components/Button';
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
  const destacados = featured.slice(0, 4);

  return (
    <>
      <Header />
      <main>
        <section className="relative h-screen min-h-[600px] flex items-center bg-sisley-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-6">
                New Collection
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-sisley-black mb-6 leading-tight">
                El estilo que define cada momento.
              </h1>
              <p className="text-base md:text-lg text-sisley-gray-600 leading-relaxed mb-8 max-w-lg">
                Descubre nuestra nueva colección de moda premium. Elegancia, calidad y diseño contemporáneo.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/catalogo" size="lg">
                  Explorar colección
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-3">Destacados</p>
                <h2 className="text-2xl md:text-3xl font-light text-sisley-black">Los más elegidos</h2>
              </div>
              <Link href="/catalogo" className="hidden md:block text-xs uppercase tracking-widest text-sisley-gray-500 hover:text-sisley-black transition-colors">
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {destacados.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Link href="/catalogo" className="text-xs uppercase tracking-widest text-sisley-gray-500 hover:text-sisley-black transition-colors">
                Ver todos →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-3">Nueva Colección</p>
              <h2 className="text-2xl md:text-3xl font-light text-sisley-black mb-4">Edición Limitada</h2>
              <p className="text-sm text-sisley-gray-600 max-w-xl mx-auto leading-relaxed">
                Piezas exclusivas diseñadas para quienes buscan distinción en cada detalle.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="aspect-[4/5] w-full max-w-md bg-sisley-gray-100 flex items-center justify-center">
                <svg className="w-24 h-24 text-sisley-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/catalogo" className="text-xs uppercase tracking-widest text-sisley-gray-500 hover:text-sisley-black transition-colors underline underline-offset-4">
                Ver colección →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-3">Categorías</p>
              <h2 className="text-2xl md:text-3xl font-light text-sisley-black">Explora por categoría</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/catalogo?categoria=${category.slug}`}
                  className="group relative aspect-[4/3] bg-sisley-gray-100 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-sisley-gray-100 flex items-center justify-center">
                    <svg className="w-12 h-12 text-sisley-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs uppercase tracking-widest text-sisley-gray-500 mb-1">{category.name}</p>
                    <h3 className="text-lg font-light text-sisley-black">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-sisley-black text-sisley-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-4">Editorial</p>
            <h2 className="text-2xl md:text-4xl font-light mb-6 max-w-2xl mx-auto leading-tight">
              La belleza comienza con el cuidado
            </h2>
            <p className="text-sm text-sisley-gray-400 max-w-xl mx-auto leading-relaxed mb-8">
              Cada fórmula es el resultado de años de investigación. Ingredientes seleccionados por su pureza y eficacia.
            </p>
            <Button href="/catalogo" variant="secondary" size="lg">
              Descubrir más
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
