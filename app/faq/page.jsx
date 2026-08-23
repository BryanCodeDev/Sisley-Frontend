import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Preguntas Frecuentes — Sisley Colombia',
  description: 'Respuestas a las preguntas más frecuentes sobre Sisley Colombia.',
};

export default function FAQ() {
  const faqs = [
    {
      question: '¿Cuánto tarda en llegar mi pedido?',
      answer: 'Los envíos estándar tardan de 3 a 5 días hábiles. Los envíos express llegan en 1 a 2 días hábiles.',
    },
    {
      question: '¿Puedo cambiar o devolver un producto?',
      answer: 'Sí, tienes hasta 30 días después de la entrega para solicitar un cambio o devolución.',
    },
    {
      question: '¿Cómo puedo rastrear mi pedido?',
      answer: 'Una vez que tu pedido sea enviado, recibirás un correo con el número de seguimiento.',
    },
    {
      question: '¿Hacen envíos internacionales?',
      answer: 'Por el momento, solo realizamos envíos dentro de Colombia.',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos tarjetas de crédito/débito, PSE y transferencia bancaria.',
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">FAQ</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight mb-10">
              Preguntas Frecuentes
            </h1>
            <div className="space-y-0 border-t border-sisley-border">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-sisley-border py-6">
                  <h2 className="text-sm font-medium text-sisley-text mb-2">{faq.question}</h2>
                  <p className="text-sm text-sisley-text-secondary leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
