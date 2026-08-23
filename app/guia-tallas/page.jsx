import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Guía de Tallas — Sisley Colombia',
  description: 'Encuentra tu talla perfecta con nuestra guía de tallas.',
};

export default function GuiaTallas() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Guía de Tallas</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight mb-6">
              Encuentra tu talla
            </h1>
            <p className="text-sm text-sisley-text-secondary leading-relaxed mb-8">
              Usa esta guía como referencia. Si estás entre dos tallas, te recomendamos elegir la talla superior.
            </p>
            <div className="border border-sisley-border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-sisley-border bg-sisley-bg">
                      <th className="text-left py-3 px-4 text-xs uppercase tracking-widest text-sisley-muted font-medium">Talla</th>
                      <th className="text-left py-3 px-4 text-xs uppercase tracking-widest text-sisley-muted font-medium">Busto (cm)</th>
                      <th className="text-left py-3 px-4 text-xs uppercase tracking-widest text-sisley-muted font-medium">Cintura (cm)</th>
                      <th className="text-left py-3 px-4 text-xs uppercase tracking-widest text-sisley-muted font-medium">Cadera (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: 'XS', bust: '82-85', waist: '62-65', hip: '88-91' },
                      { size: 'S', bust: '86-89', waist: '66-69', hip: '92-95' },
                      { size: 'M', bust: '90-93', waist: '70-73', hip: '96-99' },
                      { size: 'L', bust: '94-98', waist: '74-78', hip: '100-104' },
                      { size: 'XL', bust: '99-104', waist: '79-84', hip: '105-110' },
                    ].map((row) => (
                      <tr key={row.size} className="border-b border-sisley-border last:border-0">
                        <td className="py-3 px-4 font-medium text-sisley-text">{row.size}</td>
                        <td className="py-3 px-4 text-sisley-text-secondary">{row.bust}</td>
                        <td className="py-3 px-4 text-sisley-text-secondary">{row.waist}</td>
                        <td className="py-3 px-4 text-sisley-text-secondary">{row.hip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
