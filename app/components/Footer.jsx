'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  shop: [
    { id: 'shop-1', href: '/catalogo', label: 'Todos los productos' },
    { id: 'shop-2', href: '/catalogo?categoria=mujer', label: 'Mujer' },
    { id: 'shop-3', href: '/catalogo?categoria=hombre', label: 'Hombre' },
    { id: 'shop-4', href: '/catalogo?categoria=nueva-coleccion', label: 'Nueva colección' },
    { id: 'shop-5', href: '/catalogo?categoria=ofertas', label: 'Ofertas' },
  ],
  help: [
    { id: 'help-1', href: '/contacto', label: 'Contacto' },
    { id: 'help-2', href: '/envios', label: 'Envíos y entregas' },
    { id: 'help-3', href: '/devoluciones', label: 'Cambios y devoluciones' },
    { id: 'help-4', href: '/guia-tallas', label: 'Guía de tallas' },
    { id: 'help-5', href: '/faq', label: 'Preguntas frecuentes' },
  ],
  company: [
    { id: 'company-1', href: '/sobre-sisley', label: 'Sobre Sisley' },
    { id: 'company-2', href: '/privacidad', label: 'Privacidad' },
    { id: 'company-3', href: '/terminos', label: 'Términos' },
  ],
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p role="status" aria-live="polite" className="text-sm text-white max-w-md mx-auto">
        Gracias por suscribirte. Revisa tu correo para confirmar.
      </p>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-0 max-w-md mx-auto border-b border-white/30 focus-within:border-white transition-colors duration-300"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="Tu correo electrónico"
          aria-label="Correo electrónico"
          disabled={status === 'loading'}
          className="flex-1 bg-transparent py-3 text-sm placeholder:text-white/40 focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          aria-label="Suscribirse"
          disabled={status === 'loading'}
          className="group shrink-0 p-3 text-white transition-transform duration-300 hover:translate-x-1 disabled:opacity-60 disabled:hover:translate-x-0 motion-reduce:transition-none motion-reduce:hover:translate-x-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </form>
      {status === 'error' && (
        <p role="alert" aria-live="polite" className="text-xs text-red-300 mt-3">
          Ingresa un correo electrónico válido.
        </p>
      )}
    </>
  );
}

function FooterLink({ href, children, className = '' }) {
  return (
    <Link
      href={href}
      className={`group relative inline-block w-fit text-white/60 transition-colors duration-300 hover:text-white ${className}`}
    >
      {children}
      <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-sisley-charcoal text-white">
      {/* Newsletter — única aparición en la página */}
      <div className="border-b border-white/10">
        <Reveal delay={100} className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16 md:py-24 text-center">
          <p className="text-meta uppercase tracking-[0.3em] text-white/40 mb-4">Newsletter</p>
          <h2 className="font-serif display-sm md:display-md text-white tracking-tighter leading-[0.95] mb-4">
            Stay in the know
          </h2>
          <p className="text-sm text-white/50 max-w-md mx-auto mb-8">
            Recibe novedades de la colección, lanzamientos y acceso anticipado a eventos Sisley.
          </p>
          <NewsletterForm />
        </Reveal>
      </div>

      {/* Brand statement */}
      <div className="border-b border-white/10">
        <Reveal className="max-w-[1600px] mx-auto px-6 lg:px-10 py-20 md:py-32">
          <p className="text-meta uppercase tracking-[0.3em] text-white/40 mb-6">Sisley Colombia</p>
          <h2 className="font-serif display-lg md:display-xl text-white tracking-tighter leading-[0.9] mb-6">
            Moda que habla<br />por ti.
          </h2>
          <p className="text-sm text-white/50 leading-relaxed max-w-md">
            Elegancia contemporánea, artesanía atemporal. Cada prenda es una declaración de intenciones.
          </p>
        </Reveal>
      </div>

      {/* Links */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="py-16 md:py-24 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <Reveal className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-6 w-fit">
              <Image
                src="/assets/logo.webp"
                alt="Sisley"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Moda premium colombiana. Elegancia contemporánea y estilo atemporal.
            </p>
            <div className="flex items-center gap-5 mt-6">
              <a href="/" aria-label="Instagram" className="group relative text-white/40 hover:text-white transition-colors duration-200">
                <span className="text-xs uppercase tracking-widest">Ig</span>
                <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
              </a>
              <a href="/" aria-label="Facebook" className="group relative text-white/40 hover:text-white transition-colors duration-200">
                <span className="text-xs uppercase tracking-widest">Fb</span>
                <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
              </a>
              <a href="/" aria-label="Twitter" className="group relative text-white/40 hover:text-white transition-colors duration-200">
                <span className="text-xs uppercase tracking-widest">X</span>
                <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="text-meta uppercase tracking-[0.25em] text-white/40 mb-5">Tienda</p>
            <nav aria-label="Tienda">
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.id}>
                    <FooterLink href={link.href} className="text-sm">
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-meta uppercase tracking-[0.25em] text-white/40 mb-5">Ayuda</p>
            <nav aria-label="Ayuda">
              <ul className="space-y-3">
                {footerLinks.help.map((link) => (
                  <li key={link.id}>
                    <FooterLink href={link.href} className="text-sm">
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-meta uppercase tracking-[0.25em] text-white/40 mb-5">Empresa</p>
            <nav aria-label="Empresa">
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.id}>
                    <FooterLink href={link.href} className="text-sm">
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Sisley Colombia. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <FooterLink href="/privacidad" className="text-xs">Privacidad</FooterLink>
            <FooterLink href="/terminos" className="text-xs">Términos</FooterLink>
            <FooterLink href="/cookies" className="text-xs">Cookies</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
