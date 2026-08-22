'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/catalogo?categoria=mujer', label: 'Mujer', prefetch: false },
  { href: '/catalogo?categoria=hombre', label: 'Hombre', prefetch: false },
  { href: '/catalogo?categoria=nueva-coleccion', label: 'Nueva Colección', prefetch: false },
  { href: '/catalogo?categoria=ofertas', label: 'Ofertas', prefetch: false },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen, searchOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-sisley-white/90 backdrop-blur-md border-b border-sisley-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
            <div className="flex items-center gap-8 lg:gap-12">
              <Link href="/" className="flex items-center relative w-24 h-8 md:h-10">
                <Image
                  src="/assets/logo.webp"
                  alt="Sisley"
                  fill
                  sizes="(max-width: 768px) 6rem, 10rem"
                  className="object-contain"
                  priority
                />
              </Link>

              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={link.prefetch ?? true}
                    className="nav-link"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200"
                aria-label="Buscar"
              >
                <span className="sr-only">Buscar</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <Link
                href="/mi-cuenta"
                className="hidden md:flex p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200"
                aria-label="Mi cuenta"
              >
                <span className="sr-only">Mi cuenta</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              <Link
                href="/mis-pedidos"
                className="hidden md:flex p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200"
                aria-label="Favoritos"
              >
                <span className="sr-only">Favoritos</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>

              <Link
                href="/carrito"
                className="relative p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200"
                aria-label="Carrito"
              >
                <span className="sr-only">Carrito</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-sisley-black rounded-full" />
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200"
                aria-label="Menú"
              >
                <span className="sr-only">Menú</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-sisley-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-sisley-border">
              <span className="text-lg font-light tracking-[0.2em] text-sisley-black uppercase">Menú</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors"
                aria-label="Cerrar menú"
              >
                <span className="sr-only">Cerrar</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-6">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-2xl font-light text-sisley-text hover:text-sisley-black transition-colors border-b border-sisley-border last:border-0"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-sisley-border">
                <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-4">Cuenta</p>
                <div className="space-y-3">
                  <Link href="/mi-cuenta" onClick={() => setMobileOpen(false)} className="block text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors">
                    Mi cuenta
                  </Link>
                  <Link href="/mis-pedidos" onClick={() => setMobileOpen(false)} className="block text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors">
                    Mis pedidos
                  </Link>
                  <Link href="/carrito" onClick={() => setMobileOpen(false)} className="block text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors">
                    Carrito
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="absolute inset-x-0 top-0 bg-sisley-white border-b border-sisley-border p-6 md:p-10">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[11px] uppercase tracking-widest text-sisley-muted">Buscar</p>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors"
                  aria-label="Cerrar búsqueda"
                >
                  <span className="sr-only">Cerrar</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                className="w-full text-2xl md:text-3xl font-light bg-transparent border-b-2 border-sisley-border focus:border-sisley-black focus:outline-none py-3 placeholder:text-sisley-muted-strong"
                autoFocus
              />
              <div className="mt-6 flex flex-wrap gap-2">
                {['Vestidos', 'Blazers', 'Camisas', 'Pantalones'].map((term) => (
                  <span
                    key={term}
                    className="px-4 py-2 text-xs uppercase tracking-widest border border-sisley-border text-sisley-text-secondary hover:border-sisley-black hover:text-sisley-black transition-colors cursor-pointer"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
