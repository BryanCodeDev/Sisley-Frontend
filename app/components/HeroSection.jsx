'use client';

import { useEffect, useState } from 'react';
import Button from '@/app/components/Button';
import EditorialPlaceholder from '@/app/components/EditorialPlaceholder';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end bg-sisley-bg overflow-hidden">
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 transition-opacity duration-700 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10 transition-opacity duration-700 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`w-full h-full transition-transform duration-1000 ease-out ${
            loaded ? 'scale-100' : 'scale-105'
          }`}
        >
          <EditorialPlaceholder
            title="New Collection"
            subtitle="Nueva Colección"
            categorySlug="nueva-coleccion"
            index={0}
            aspectRatio="banner"
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="relative z-20 max-w-[1600px] mx-auto px-6 lg:px-10 pb-20 md:pb-32 pt-32 w-full">
        <div className="max-w-2xl">
          <p
            className={`text-[11px] uppercase tracking-widest text-white/80 mb-4 md:mb-6 transition-all duration-700 ease-out ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Nueva Colección
          </p>
          <h1
            className={`font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6 transition-all duration-700 ease-out ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            El arte de vestir
          </h1>
          <p
            className={`text-sm md:text-base text-white/80 leading-relaxed mb-8 max-w-lg transition-all duration-700 ease-out ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            Descubre una colección donde la elegancia contemporánea se encuentra con la artesanía atemporal.
          </p>
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ease-out ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <Button href="/catalogo" size="lg">
              Descubrir colección
            </Button>
            <Button href="/catalogo?coleccion=nueva" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-sisley-black">
              Comprar ahora
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-500 ease-out ${
          loaded ? 'opacity-60' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1500ms' }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white">Scroll</span>
        <svg className="w-4 h-4 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}
