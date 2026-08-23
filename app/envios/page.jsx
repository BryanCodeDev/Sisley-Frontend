import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Envíos y Entregas — Sisley Colombia',
  description: 'Información sobre envíos, tiempos de entrega y costos de envío.',
};

export default function Envios() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Envíos</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight mb-6">
              Envíos y Entregas
            </h1>
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-medium text-sisley-text mb-3">Envío estándar</h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed">
                  Entrega de 3 a 5 días hábiles en todo el territorio nacional. Envío gratuito en compras superiores a $500.000.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-sisley-text mb-3">Envío express</h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed">
                  Entrega de 1 a 2 días hábiles. Costo adicional de $45.000.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-sisley-text mb-3">Retiro en tienda</h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed">
                  Puedes retirar tu pedido en nuestra tienda principal en Bogotá sin costo adicional.
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
