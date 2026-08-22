'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  shop: [
    { id: 'shop-1', href: '/catalogo', label: 'Todos los productos', prefetch: false },
    { id: 'shop-2', href: '/catalogo?genero=mujer', label: 'Mujer', prefetch: false },
    { id: 'shop-3', href: '/catalogo?genero=hombre', label: 'Hombre', prefetch: false },
    { id: 'shop-4', href: '/catalogo?coleccion=nueva', label: 'Nueva colección', prefetch: false },
    { id: 'shop-5', href: '/catalogo?ofertas=true', label: 'Ofertas', prefetch: false },
  ],
  help: [
    { id: 'help-1', href: '/', label: 'Contacto', prefetch: false },
    { id: 'help-2', href: '/', label: 'Envíos y entregas', prefetch: false },
    { id: 'help-3', href: '/', label: 'Cambios y devoluciones', prefetch: false },
    { id: 'help-4', href: '/', label: 'Guía de tallas', prefetch: false },
    { id: 'help-5', href: '/', label: 'Preguntas frecuentes', prefetch: false },
  ],
  company: [
    { id: 'company-1', href: '/', label: 'Sobre Sisley', prefetch: false },
    { id: 'company-2', href: '/', label: 'Sostenibilidad', prefetch: false },
    { id: 'company-3', href: '/', label: 'Privacidad', prefetch: false },
    { id: 'company-4', href: '/', label: 'Términos', prefetch: false },
  ],
};

/**
 * Underline-sweep link used across the footer.
 * scaleX(0) -> scaleX(1), transform-origin left (motion spec item 9).
 */
function SweepLink({ href, prefetch, className = '', children, ...props }) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={`group relative inline-block w-fit text-sisley-dark-muted transition-colors duration-300 hover:text-white ${className}`}
      {...props}
    >
      {children}
      <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
    </Link>
  );
}

/** Lightweight scroll-reveal: IntersectionObserver + CSS transform/opacity, no extra dependency. */
function useRevealOnView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useRevealOnView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:!translate-y-0 motion-reduce:!opacity-100 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-sisley-dark text-white">
      {/* Newsletter — editorial block, not a generic card (spec item 20) */}
      <div className="border-b border-white/10">
        <Reveal className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16 md:py-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-sisley-dark-muted mb-4">
            Newsletter
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight mb-4">
            Stay in the know
          </h2>
          <p className="text-sm text-sisley-dark-muted max-w-md mx-auto mb-8">
            Recibe novedades de la colección, lanzamientos y acceso anticipado a eventos Sisley.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center justify-center gap-0 max-w-md mx-auto border-b border-white/30 focus-within:border-white transition-colors duration-300"
          >
            <input
              type="email"
              required
              placeholder="Tu correo electrónico"
              aria-label="Correo electrónico"
              className="flex-1 bg-transparent py-3 text-sm placeholder:text-sisley-dark-muted focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Suscribirse"
              className="group shrink-0 p-3 text-white transition-transform duration-300 hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:translate-x-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </form>
        </Reveal>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="py-16 md:py-24 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <Reveal className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-4 w-fit">
              <Image
                src="/assets/logo.webp"
                alt="Sisley"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-sisley-dark-muted leading-relaxed max-w-xs">
              Moda premium colombiana. Elegancia contemporánea y estilo atemporal.
            </p>
            <div className="flex items-center gap-5 mt-6">
              <a href="/" aria-label="Instagram" className="group relative text-sisley-dark-muted hover:text-white transition-colors duration-200">
                <span className="text-xs uppercase tracking-widest">Ig</span>
                <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
              </a>
              <a href="/" aria-label="Facebook" className="group relative text-sisley-dark-muted hover:text-white transition-colors duration-200">
                <span className="text-xs uppercase tracking-widest">Fb</span>
                <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
              </a>
              <a href="/" aria-label="Twitter" className="group relative text-sisley-dark-muted hover:text-white transition-colors duration-200">
                <span className="text-xs uppercase tracking-widest">X</span>
                <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="text-[11px] uppercase tracking-widest text-sisley-dark-muted mb-5">Tienda</p>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.id}>
                  <SweepLink href={link.href} prefetch={link.prefetch ?? true} className="text-sm">
                    {link.label}
                  </SweepLink>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-[11px] uppercase tracking-widest text-sisley-dark-muted mb-5">Ayuda</p>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.id}>
                  <SweepLink href={link.href} prefetch={link.prefetch ?? true} className="text-sm">
                    {link.label}
                  </SweepLink>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-[11px] uppercase tracking-widest text-sisley-dark-muted mb-5">Empresa</p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.id}>
                  <SweepLink href={link.href} prefetch={link.prefetch ?? true} className="text-sm">
                    {link.label}
                  </SweepLink>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-sisley-dark-muted">
            © {new Date().getFullYear()} Sisley Colombia. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <SweepLink href="/" className="text-xs">Privacidad</SweepLink>
            <SweepLink href="/" className="text-xs">Términos</SweepLink>
            <SweepLink href="/" className="text-xs">Cookies</SweepLink>
          </div>
        </div>
      </div>
    </footer>
  );
}