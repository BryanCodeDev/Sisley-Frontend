import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Política de Cookies — Sisley Colombia',
  description: 'Política de cookies del sitio web de Sisley Colombia.',
};

export default function Cookies() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Legal</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight mb-6">
              Política de Cookies
            </h1>
            <div className="space-y-6">
              <p className="text-sm text-sisley-text-secondary leading-relaxed">
                Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Esta política explica qué son las cookies y cómo las utilizamos.
              </p>
              <div>
                <h2 className="text-sm font-medium text-sisley-text mb-2">¿Qué son las cookies?</h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed">
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos ayudan a recordar tus preferencias y mejorar la funcionalidad del sitio.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-sisley-text mb-2">Cookies que utilizamos</h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed">
                  Usamos cookies esenciales para el funcionamiento del sitio, cookies de análisis para entender cómo interactúas con nuestro sitio, y cookies de preferencias para recordar tu configuración.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-sisley-text mb-2">Gestión de cookies</h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed">
                  Puedes configurar tu navegador para rechazar cookies o alertarte cuando se envían. Sin embargo, algunas partes del sitio pueden no funcionar correctamente sin ellas.
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
