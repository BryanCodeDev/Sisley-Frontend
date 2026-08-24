'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCustomerAuth } from '@/app/contexts/CustomerAuthContext';
import { useAuth } from '@/app/contexts/AuthContext';
import UserDropdown from './UserDropdown';
import { getCart } from '@/app/services/cart';
import { getCategories } from '@/app/services/categories';

const defaultNavLinks = [
  { href: '/catalogo?categoria=mujer', label: 'Mujer', prefetch: false },
  { href: '/catalogo?categoria=hombre', label: 'Hombre', prefetch: false },
  { href: '/catalogo?categoria=nueva-coleccion', label: 'Nueva Colección', prefetch: false },
  { href: '/catalogo?categoria=ofertas', label: 'Ofertas', prefetch: false },
];

const SEARCH_SUGGESTIONS = ['Vestidos', 'Blazers', 'Camisas', 'Pantalones'];

/** Nav link with a left-to-right underline sweep on hover (spec item 9). Self-contained, no external CSS needed. */
function NavLink({ href, prefetch, children, inverted = false }) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={`group relative text-sm transition-colors duration-200 ${
        inverted ? 'text-white hover:text-white/80' : 'text-sisley-text-secondary hover:text-sisley-black'
      }`}
    >
      {children}
      <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-sisley-black transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
    </Link>
  );
}

/**
 * Closes an overlay on Escape and returns focus to whatever triggered it,
 * so keyboard users aren't stranded inside the drawer/search panel.
 */
function useEscapeToClose(isOpen, onClose, triggerRef) {
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, triggerRef]);
}

export default function Header({ variant = 'public' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [navLinks, setNavLinks] = useState(defaultNavLinks);
  const pathname = usePathname();
  const router = useRouter();
  const searchTriggerRef = useRef(null);
  const menuTriggerRef = useRef(null);
  const { customer, loading: customerLoading, isAuthenticated: isCustomerAuth, logout: customerLogout } = useCustomerAuth();
  const { user, loading: adminLoading, isAuthenticated: isAdminAuth, logout: adminLogout } = useAuth();

  const isAdmin = variant === 'admin';
  const adminUser = isAdminAuth ? user : null;

  const loadCartCount = useCallback(async () => {
    if (isAdmin) return;
    try {
      const data = await getCart();
      const items = data.data?.items || [];
      setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
    } catch {
      setCartCount(0);
    }
  }, [isAdmin]);

  useEffect(() => {
    loadCartCount();
    window.addEventListener('cartUpdated', loadCartCount);
    return () => window.removeEventListener('cartUpdated', loadCartCount);
  }, [loadCartCount]);

  useEffect(() => {
    async function loadNavCategories() {
      try {
        const data = await getCategories({ status: 'active', limit: '4' });
        if (data.data && data.data.length > 0) {
          setNavLinks(data.data.map((cat) => ({
            href: `/catalogo?categoria=${cat.slug}`,
            label: cat.name,
            prefetch: false,
          })));
        }
      } catch {
        setNavLinks(defaultNavLinks);
      }
    }
    if (!isAdmin) {
      loadNavCategories();
    }
  }, [isAdmin]);

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

  // Cierra el menú/búsqueda si cambia la ruta (ej. tras hacer clic en un link),
  // en vez de depender únicamente de cada onClick individual.
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Drives the slide/fade-in transitions for the mobile drawer once it mounts, so the
  // panel animates in from off-screen rather than appearing instantly (spec item 21/23).
  useEffect(() => {
    if (mobileOpen) {
      const raf = requestAnimationFrame(() => setMobileVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setMobileVisible(false);
    return undefined;
  }, [mobileOpen]);

  useEffect(() => {
    if (searchOpen) {
      const raf = requestAnimationFrame(() => setSearchVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setSearchVisible(false);
    return undefined;
  }, [searchOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  useEscapeToClose(mobileOpen, closeMobile, menuTriggerRef);
  useEscapeToClose(searchOpen, closeSearch, searchTriggerRef);

  function goToSearch(term) {
    const query = term.trim();
    if (!query) return;
    setSearchOpen(false);
    router.push(`/catalogo?search=${encodeURIComponent(query)}`);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isAdmin
            ? 'bg-sisley-white border-b border-sisley-border lg:pl-64'
            : scrolled
              ? 'bg-sisley-white/90 backdrop-blur-md border-b border-sisley-border shadow-[0_1px_24px_rgba(0,0,0,0.04)]'
              : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-14 md:h-16 lg:h-20">
            <div className="flex items-center gap-8 lg:gap-12">
              <Link href={isAdmin ? '/admin' : '/'} className="flex items-center relative w-24 h-8 md:h-10">
                <Image
                  src="/assets/logo.webp"
                  alt="Sisley"
                  fill
                  sizes="(max-width: 768px) 6rem, 10rem"
                  className="object-contain"
                  priority
                />
              </Link>

              {!isAdmin && (
                <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-8">
                  <NavLink href="/catalogo" prefetch inverted={!scrolled}>
                    Catálogo
                  </NavLink>
                  {navLinks.slice(0, 3).map((link) => (
                    <NavLink key={link.href} href={link.href} prefetch={link.prefetch ?? true} inverted={!scrolled}>
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
              )}
            </div>

             <div className="flex items-center gap-1 md:gap-2">
              {!isAdmin && (
                <button
                  ref={searchTriggerRef}
                  onClick={() => setSearchOpen(true)}
                  className={`p-2 transition-all duration-200 hover:scale-105 motion-reduce:hover:scale-100 ${!scrolled ? 'text-white hover:text-white/80' : 'text-sisley-text-secondary hover:text-sisley-black'}`}
                  aria-label="Buscar"
                  aria-haspopup="dialog"
                  aria-expanded={searchOpen}
                >
                  <span className="sr-only">Buscar</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}

              <UserDropdown variant={variant} inverted={!scrolled && !isAdmin} />

              {!isAdmin && (
                <>
                  <Link
                    href="/favoritos"
                    className={`hidden md:flex p-2 transition-all duration-200 hover:scale-105 motion-reduce:hover:scale-100 ${!scrolled ? 'text-white hover:text-white/80' : 'text-sisley-text-secondary hover:text-sisley-black'}`}
                    aria-label="Favoritos"
                  >
                    <span className="sr-only">Favoritos</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </Link>

                  <Link
                    href="/carrito"
                    className={`relative p-2 transition-all duration-200 hover:scale-105 motion-reduce:hover:scale-100 ${!scrolled ? 'text-white hover:text-white/80' : 'text-sisley-text-secondary hover:text-sisley-black'}`}
                    aria-label={`Carrito${cartCount > 0 ? `, ${cartCount} artículo${cartCount === 1 ? '' : 's'}` : ''}`}
                  >
                    <span className="sr-only">Carrito</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {cartCount > 0 && (
                      <span
                        aria-hidden="true"
                        className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-sisley-black text-white text-[10px] font-medium rounded-full px-1"
                      >
                        {cartCount > 99 ? '99+' : cartCount}
                      </span>
                    )}
                  </Link>
                </>
              )}

              <button
                ref={menuTriggerRef}
                onClick={() => setMobileOpen(true)}
                className={`${isAdmin ? 'hidden lg:flex' : 'lg:hidden'} p-2 transition-colors duration-200 ${!scrolled ? 'text-white hover:text-white/80' : 'text-sisley-text-secondary hover:text-sisley-black'}`}
                aria-label="Menú"
                aria-haspopup="dialog"
                aria-expanded={mobileOpen}
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
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
              mobileVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMobile}
          />
          <div
            className={`absolute inset-y-0 right-0 w-full max-w-md bg-sisley-white shadow-2xl flex flex-col transition-transform duration-500 ease-out motion-reduce:!translate-x-0 ${
              mobileVisible ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between p-6 border-b border-sisley-border">
              <span id="mobile-menu-title" className="text-lg font-light tracking-[0.2em] text-sisley-black uppercase">Menú</span>
              <button
                onClick={closeMobile}
                className="p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors"
                aria-label="Cerrar menú"
              >
                <span className="sr-only">Cerrar</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-6" aria-label="Menú móvil">
              <div className="space-y-1">
                {isAdmin ? (
                  <div className="space-y-1">
                    <Link href="/admin" onClick={closeMobile} className="block py-4 text-2xl font-light text-sisley-text hover:text-sisley-black transition-colors border-b border-sisley-border">Dashboard</Link>
                    <Link href="/admin/productos" onClick={closeMobile} className="block py-4 text-2xl font-light text-sisley-text hover:text-sisley-black transition-colors border-b border-sisley-border">Productos</Link>
                    <Link href="/admin/pedidos" onClick={closeMobile} className="block py-4 text-2xl font-light text-sisley-text hover:text-sisley-black transition-colors border-b border-sisley-border">Pedidos</Link>
                    <Link href="/admin/clientes" onClick={closeMobile} className="block py-4 text-2xl font-light text-sisley-text hover:text-sisley-black transition-colors border-b border-sisley-border">Clientes</Link>
                    <Link href="/admin/inventario" onClick={closeMobile} className="block py-4 text-2xl font-light text-sisley-text hover:text-sisley-black transition-colors border-b border-sisley-border">Inventario</Link>
                    <Link href="/admin/facturacion" onClick={closeMobile} className="block py-4 text-2xl font-light text-sisley-text hover:text-sisley-black transition-colors border-b border-sisley-border">Facturación</Link>
                    <Link href="/admin/reportes" onClick={closeMobile} className="block py-4 text-2xl font-light text-sisley-text hover:text-sisley-black transition-colors border-b border-sisley-border">Reportes</Link>
                  </div>
                ) : (
                  <>
                    <Link href="/catalogo" onClick={closeMobile} className="block py-4 text-2xl font-light text-sisley-text hover:text-sisley-black transition-colors border-b border-sisley-border">
                      Catálogo
                    </Link>
                    {navLinks.slice(0, 3).map((link) => (
                      <Link key={link.href} href={link.href} onClick={closeMobile} className="block py-4 text-2xl font-light text-sisley-text hover:text-sisley-black transition-colors border-b border-sisley-border">
                        {link.label}
                      </Link>
                    ))}
                  </>
                )}
              </div>

              {!isAdmin && (
                <div className="mt-8 pt-8 border-t border-sisley-border">
                  <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-4">Cuenta</p>
                  <div className="space-y-3">
                    {customer ? (
                      <>
                        <div className="mb-3">
                          <p className="text-sm font-medium text-sisley-text">Hola, {customer.firstName || customer.name?.split(' ')[0] || 'Cliente'}</p>
                          <p className="text-xs text-sisley-muted">{customer.email}</p>
                        </div>
                        <Link href="/mi-cuenta" onClick={closeMobile} className="block text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors">
                          Mi cuenta
                        </Link>
                        <Link href="/mis-pedidos" onClick={closeMobile} className="block text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors">
                          Mis pedidos
                        </Link>
                        <button
                          onClick={async () => {
                            closeMobile();
                            await customerLogout();
                          }}
                          className="block text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors"
                        >
                          Cerrar sesión
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={closeMobile} className="block text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors">
                          Iniciar sesión
                        </Link>
                        <Link href="/registro" onClick={closeMobile} className="block text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors">
                          Crear cuenta
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}

      {!isAdmin && searchOpen && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="search-title">
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
              searchVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeSearch}
          />
          <div
            className={`absolute inset-x-0 top-0 bg-sisley-white border-b border-sisley-border p-6 md:p-10 transition-transform duration-500 ease-out motion-reduce:!translate-y-0 ${
              searchVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <p id="search-title" className="text-[11px] uppercase tracking-widest text-sisley-muted">Buscar</p>
                <button
                  onClick={closeSearch}
                  className="p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors"
                  aria-label="Cerrar búsqueda"
                >
                  <span className="sr-only">Cerrar</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  goToSearch(searchQuery);
                }}
              >
                <label htmlFor="header-search-input" className="sr-only">
                  ¿Qué estás buscando?
                </label>
                <input
                  id="header-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="¿Qué estás buscando?"
                  className="w-full text-2xl md:text-3xl font-light bg-transparent border-b-2 border-sisley-border focus:border-sisley-black focus:outline-none py-3 placeholder:text-sisley-muted-strong transition-colors duration-300"
                  autoFocus
                />
              </form>
              <div className="mt-6 flex flex-wrap gap-2">
                {SEARCH_SUGGESTIONS.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => goToSearch(term)}
                    className="px-4 py-2 text-xs uppercase tracking-widest border border-sisley-border text-sisley-text-secondary hover:border-sisley-black hover:text-sisley-black transition-colors duration-200 cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}