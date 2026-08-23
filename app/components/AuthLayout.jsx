import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

/**
 * Layout de dos columnas compartido por /login y /registro:
 * panel editorial a la izquierda (oculto en mobile) + contenido de formulario a la derecha.
 * Mantenerlo en un solo lugar evita que las dos páginas se desincronicen visualmente
 * cuando se ajuste el estilo del panel de autenticación.
 */
export default function AuthLayout({ eyebrow, title, description, children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)]">
          <div className="hidden lg:flex items-center justify-center bg-sisley-bg p-12">
            <div className="max-w-md">
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-4">{eyebrow}</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight leading-tight mb-6">
                {title}
              </h2>
              <p className="text-sm text-sisley-text-secondary leading-relaxed">{description}</p>
            </div>
          </div>

          <div className="flex items-center justify-center py-12 px-6">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
