'use client';

import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { href: '/catalogo', label: 'Tienda' },
    { href: '/catalogo?categoria=hidratacion', label: 'Hidratación' },
    { href: '/catalogo?categoria=tratamiento', label: 'Tratamiento' },
    { href: '/catalogo?categoria=proteccion', label: 'Protección' },
    { href: '/mis-pedidos', label: 'Mis Pedidos' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-sisley-white border-b border-sisley-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8">
            <a href="/" className="text-xl md:text-2xl font-light tracking-widest text-sisley-black">
              SISLEY
            </a>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-widest text-sisley-gray-600 hover:text-sisley-black transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-48 lg:w-64 pl-4 pr-10 py-2 text-sm border border-sisley-gray-300 bg-sisley-gray-50 focus:outline-none focus:border-sisley-black transition-colors"
                />
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sisley-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Buscar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <a href="/mi-cuenta" className="hidden md:block p-2 hover:opacity-70 transition-opacity" aria-label="Cuenta">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </a>

            <a href="/carrito" className="relative p-2 hover:opacity-70 transition-opacity" aria-label="Carrito">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-sisley-black text-white text-[10px] flex items-center justify-center">
                0
              </span>
            </a>

            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="md:hidden pb-4">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 text-sm border border-sisley-gray-300 bg-sisley-gray-50 focus:outline-none focus:border-sisley-black transition-colors"
            />
          </div>
        )}

        {menuOpen && (
          <nav className="md:hidden pb-6 pt-2 border-t border-sisley-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-sm uppercase tracking-widest text-sisley-gray-600 hover:text-sisley-black transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
