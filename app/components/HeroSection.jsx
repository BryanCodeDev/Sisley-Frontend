'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/app/components/Button';
import HeroBackground from '@/app/components/HeroBackground';

const MAX_PARALLAX_SHIFT_PX = 24;
const PARALLAX_FACTOR = 0.06;
const SCROLLED_THRESHOLD_PX = 40;

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [parallax, setParallax] = useState(0);
  const imageWrapRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Cinematic, near-imperceptible parallax on the hero image (max ~24px) + scroll-indicator fade.
  // Both derived values are computed inside one rAF-throttled handler so a single scroll
  // event only ever triggers one batched state update. Skipped entirely for prefers-reduced-motion.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let ticking = false;
    function handleScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > SCROLLED_THRESHOLD_PX);
        setParallax(Math.min(window.scrollY * PARALLAX_FACTOR, MAX_PARALLAX_SHIFT_PX));
        ticking = false;
      });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
          ref={imageWrapRef}
          className={`w-full h-full transition-transform duration-1000 ease-out motion-reduce:!scale-100 motion-reduce:!translate-y-0 ${
            loaded ? 'scale-100' : 'scale-105'
          }`}
          style={{ transform: `translateY(${parallax}px)` }}
        >
          <HeroBackground />
        </div>
      </div>

      <div className="relative z-20 max-w-[1600px] mx-auto px-6 lg:px-10 pb-20 md:pb-32 pt-32 w-full">
        <div className="max-w-2xl">
          <p
            className={`text-[11px] uppercase tracking-widest text-white/80 mb-4 md:mb-6 transition-all duration-500 ease-out motion-reduce:!opacity-100 motion-reduce:!translate-y-0 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Nueva Colección
          </p>
          <h1
            className={`font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6 transition-all duration-700 ease-out motion-reduce:!opacity-100 motion-reduce:!translate-y-0 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            El arte de vestir
          </h1>
          <p
            className={`text-sm md:text-base text-white/80 leading-relaxed mb-8 max-w-lg transition-all duration-500 ease-out motion-reduce:!opacity-100 motion-reduce:!translate-y-0 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '900ms' }}
          >
            Descubre una colección donde la elegancia contemporánea se encuentra con la artesanía atemporal.
          </p>
          <div
            className={`flex flex-wrap gap-4 transition-all duration-500 ease-out motion-reduce:!opacity-100 motion-reduce:!translate-y-0 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1100ms' }}
          >
            <Button href="/catalogo" size="lg" className="group">
              <span className="inline-flex items-center gap-2">
                Descubrir colección
                <svg
                  className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </span>
            </Button>
            <Button
              href="/catalogo?coleccion=nueva"
              variant="secondary"
              size="lg"
              className="group border-white text-white hover:bg-white hover:text-sisley-black"
            >
              <span className="inline-flex items-center gap-2">
                Comprar ahora
                <svg
                  className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-500 ease-out ${
          loaded && !scrolled ? 'opacity-60' : 'opacity-0'
        }`}
        style={{ transitionDelay: loaded && !scrolled ? '1500ms' : '0ms' }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white">Scroll</span>
        <svg
          className="w-4 h-4 text-white motion-safe:animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}