import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Sobre Sisley — Sisley Colombia',
  description: 'Conoce la historia y filosofía de Sisley Colombia.',
};

export default function SobreSisley() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Nuestra marca</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight mb-6">
              Sobre Sisley
            </h1>
            <div className="space-y-6">
              <p className="text-sm text-sisley-text-secondary leading-relaxed">
                Sisley Colombia es una marca de moda premium que nace de la pasión por la elegancia contemporánea y el estilo atemporal. Cada pieza es diseñada con meticulosa atención al detalle, utilizando materiales de la más alta calidad.
              </p>
              <p className="text-sm text-sisley-text-secondary leading-relaxed">
                Nuestra misión es ofrecer prendas que hagan sentir a cada mujer segura y elegante, combinando las últimas tendencias con diseños clásicos que perduran en el tiempo.
              </p>
              <p className="text-sm text-sisley-text-secondary leading-relaxed">
                Con presencia en las principales ciudades de Colombia, nos esforzamos por brindar una experiencia de compra excepcional, tanto en tienda como en línea.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
