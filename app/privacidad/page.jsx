import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Política de Privacidad — Sisley Colombia',
  description: 'Política de privacidad y tratamiento de datos personales.',
};

export default function Privacidad() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Legal</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight mb-6">
              Política de Privacidad
            </h1>
            <div className="space-y-6">
              <p className="text-sm text-sisley-text-secondary leading-relaxed">
                En Sisley Colombia, nos tomamos muy en serio la privacidad de tus datos personales. Esta política describe cómo recopilamos, usamos y protegemos tu información.
              </p>
              <div>
                <h2 className="text-sm font-medium text-sisley-text mb-2">Datos que recopilamos</h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed">
                  Recopilamos información que nos proporcionas directamente, como nombre, correo electrónico, dirección de envío y teléfono cuando realizas una compra o creas una cuenta.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-sisley-text mb-2">Uso de la información</h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed">
                  Utilizamos tu información para procesar pedidos, enviar comunicaciones sobre tu compra y mejorar nuestros servicios.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-sisley-text mb-2">Protección de datos</h2>
                <p className="text-sm text-sisley-text-secondary leading-relaxed">
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos contra acceso no autorizado, alteración o destrucción.
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
