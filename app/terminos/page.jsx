import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Términos y Condiciones — Sisley Colombia',
  description: 'Términos y condiciones de uso del sitio web.',
};

export default function Terminos() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Legal</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight mb-6">
              Términos y Condiciones
            </h1>
            <div className="space-y-6">
              <p className="text-sm text-sisley-text-secondary leading-relaxed">
                Al utilizar este sitio web, aceptas los siguientes términos y condiciones. Te recomendamos leerlos atentamente.
              </p>
              <div>
                <h2 className="text-sm font-medium text-sisley-text mb-2">Uso del sitio</h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed">
                  El contenido de este sitio es para tu uso personal y no comercial. No puedes modificar, copiar, distribuir ni transmitir ningún contenido sin nuestra autorización.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-sisley-text mb-2">Precios y disponibilidad</h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed">
                  Los precios están sujetos a cambio sin previo aviso. Nos reservamos el derecho de limitar las cantidades de cualquier producto.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-sisley-text mb-2">Propiedad intelectual</h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed">
                  Todos los diseños, imágenes, textos y gráficos son propiedad de Sisley Colombia y están protegidos por derechos de autor.
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
