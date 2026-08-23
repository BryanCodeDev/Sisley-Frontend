import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Contacto — Sisley Colombia',
  description: 'Contáctanos para cualquier pregunta sobre nuestros productos o pedidos.',
};

export default function Contacto() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Contacto</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight mb-6">
              Contáctanos
            </h1>
            <p className="text-sm text-sisley-text-secondary leading-relaxed mb-8">
              Estamos aquí para ayudarte. Escríbenos para cualquier pregunta sobre nuestros productos, pedidos o envíos.
            </p>
            <div className="space-y-6">
              <div className="border border-sisley-border p-6">
                <h2 className="text-sm font-medium text-sisley-text mb-2">WhatsApp</h2>
                <p className="text-sm text-sisley-text-secondary">+57 300 123 4567</p>
              </div>
              <div className="border border-sisley-border p-6">
                <h2 className="text-sm font-medium text-sisley-text mb-2">Email</h2>
                <p className="text-sm text-sisley-text-secondary">contacto@sisley.co</p>
              </div>
              <div className="border border-sisley-border p-6">
                <h2 className="text-sm font-medium text-sisley-text mb-2">Horario de atención</h2>
                <p className="text-sm text-sisley-text-secondary">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
