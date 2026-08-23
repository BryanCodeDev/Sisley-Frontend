import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Cambios y Devoluciones — Sisley Colombia',
  description: 'Política de cambios y devoluciones de Sisley Colombia.',
};

export default function Devoluciones() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Devoluciones</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight mb-6">
              Cambios y Devoluciones
            </h1>
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-medium text-sisley-text mb-3">Política de cambios</h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed">
                  Tienes hasta 30 días después de la entrega para solicitar un cambio. El producto debe estar sin uso, con sus etiquetas originales y en su empaque original.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-sisley-text mb-3">Devoluciones</h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed">
                  Si no estás satisfecho con tu compra, puedes solicitar un reembolso dentro de los primeros 30 días posteriores a la entrega. El reembolso se procesará en 5-7 días hábiles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
