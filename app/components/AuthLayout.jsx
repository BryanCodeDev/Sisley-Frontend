import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Image from 'next/image';

export default function AuthLayout({ eyebrow, title, description, children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)]">
          <div className="hidden lg:flex items-center justify-center bg-sisley-charcoal p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="/assets/catalog/Hero-principal.webp"
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="max-w-md relative z-10">
              <p className="text-meta uppercase tracking-[0.3em] text-white/60 mb-6">{eyebrow}</p>
              <h2 className="font-serif display-sm text-white tracking-tighter leading-[0.95] mb-6">
                {title}
              </h2>
              <p className="text-sm text-white/60 leading-relaxed">{description}</p>
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
