'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/app/components/Button';
import HeroBackground from '@/app/components/HeroBackground';
import { ChevronRight } from 'lucide-react';

const MAX_PARALLAX_SHIFT_PX = 40;
const PARALLAX_FACTOR = 0.08;
const SCROLLED_THRESHOLD_PX = 40;
const MAX_FRAME_SHIFT_PX = 8;

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [parallax, setParallax] = useState(0);
  const imageWrapRef = useRef(null);
  const lastShiftRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let ticking = false;
    function handleScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const raw = Math.min(window.scrollY * PARALLAX_FACTOR, MAX_PARALLAX_SHIFT_PX);
        const delta = raw - lastShiftRef.current;
        if (Math.abs(delta) > MAX_FRAME_SHIFT_PX) {
          setParallax(lastShiftRef.current + Math.sign(delta) * MAX_FRAME_SHIFT_PX);
        } else {
          setParallax(raw);
        }
        lastShiftRef.current = raw;
        setScrolled(window.scrollY > SCROLLED_THRESHOLD_PX);
        ticking = false;
      });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end bg-sisley-charcoal overflow-hidden">
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10 transition-opacity duration-1000 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          ref={imageWrapRef}
          className={`w-full h-full transition-transform duration-[2000ms] ease-out motion-reduce:scale-100 motion-reduce:translate-y-0 ${
            loaded ? 'scale-100' : 'scale-105'
          }`}
          style={{ transform: `translateY(${parallax}px)` }}
        >
          <HeroBackground />
        </div>
      </div>

      <div className="relative z-20 max-w-[1600px] mx-auto px-6 lg:px-10 pb-16 md:pb-24 lg:pb-32 pt-32 w-full">
        <div className="max-w-3xl">
          <p
            className={`text-meta uppercase tracking-[0.3em] text-white/70 mb-6 md:mb-8 transition-all duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Nueva Colección — Otoño 2026
          </p>
          <h1
            className={`font-serif editorial text-white tracking-tighter leading-[0.95] mb-8 transition-all duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            El arte de vestir
          </h1>
          <p
            className={`text-base md:text-lg text-white/75 leading-relaxed mb-10 max-w-xl transition-all duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            Descubre una colección donde la elegancia contemporánea se encuentra con la artesanía atemporal. Cada prenda, una declaración.
          </p>
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '1100ms' }}
          >
            <Button href="/catalogo" size="lg" className="group bg-white text-sisley-ink hover:bg-sisley-smoke">
              <span className="inline-flex items-center gap-3">
                Descubrir colección
                <ChevronRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none" strokeWidth={1.5} />
              </span>
            </Button>
            <Button
              href="/catalogo?coleccion=nueva"
              variant="ghost"
              size="lg"
              className="text-white border-white/30 hover:bg-white/10 hover:border-white"
            >
              <span className="inline-flex items-center gap-3">
                Comprar ahora
                <ChevronRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none" strokeWidth={1.5} />
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 transition-all duration-700 ease-out ${
          loaded && !scrolled ? 'opacity-60' : 'opacity-0'
        }`}
        style={{ transitionDelay: loaded && !scrolled ? '2000ms' : '0ms' }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/80">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent motion-safe:animate-pulse" />
      </div>
    </section>
  );
}
