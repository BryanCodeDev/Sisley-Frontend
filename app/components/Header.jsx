'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCustomerAuth } from '@/app/contexts/CustomerAuthContext';
import { useAuth } from '@/app/contexts/AuthContext';
import UserDropdown from './UserDropdown';
import MegaMenu from './MegaMenu';
import CartDrawer from './CartDrawer';
import { getCart } from '@/app/services/cart';
import { getCategories } from '@/app/services/categories';
import { Search, Heart, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';

const SEARCH_SUGGESTIONS = ['Vestidos', 'Blazers', 'Camisas', 'Pantalones', 'Nueva colección'];

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
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([]);
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
        const data = await getCategories({ status: 'active', limit: '8' });
        if (data.data && data.data.length > 0) {
          setCategories(data.data);
        }
      } catch {
        setCategories([]);
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

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

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
                <MegaMenu categories={categories} />
              )}
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              {!isAdmin && (
                <button
                  ref={searchTriggerRef}
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-sisley-text-secondary hover:text-sisley-black transition-all duration-200 hover:scale-105 motion-reduce:hover:scale-100"
                  aria-label="Buscar"
                  aria-haspopup="dialog"
                  aria-expanded={searchOpen}
                >
                  <Search className="w-5 h-5" strokeWidth={1.5} />
                </button>
              )}

              <UserDropdown variant={variant} />

              {!isAdmin && (
                <>
                  <Link
                    href="/favoritos"
                    className="hidden md:flex p-2 text-sisley-text-secondary hover:text-sisley-black transition-all duration-200 hover:scale-105 motion-reduce:hover:scale-100"
                    aria-label="Favoritos"
                  >
                    <Heart className="w-5 h-5" strokeWidth={1.5} />
                  </Link>

                  <button
                    onClick={() => setCartDrawerOpen(true)}
                    className="relative p-2 text-sisley-text-secondary hover:text-sisley-black transition-all duration-200 hover:scale-105 motion-reduce:hover:scale-100"
                    aria-label={`Carrito${cartCount > 0 ? `, ${cartCount} artículo${cartCount === 1 ? '' : 's'}` : ''}`}
                  >
                    <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                    {cartCount > 0 && (
                      <span
                        aria-hidden="true"
                        className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-sisley-black text-white text-[10px] font-medium rounded-full px-1"
                      >
                        {cartCount > 99 ? '99+' : cartCount}
                      </span>
                    )}
                  </button>
                </>
              )}

              <button
                ref={menuTriggerRef}
                onClick={() => setMobileOpen(true)}
                className={`${isAdmin ? 'hidden lg:flex' : 'lg:hidden'} p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200`}
                aria-label="Menú"
                aria-haspopup="dialog"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
              mobileVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMobile}
          />
          <div
            className={`absolute inset-0 bg-sisley-white flex flex-col transition-all duration-500 ease-out motion-reduce:opacity-100 motion-reduce:translate-x-0 ${
              mobileVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-sisley-border">
              <span id="mobile-menu-title" className="text-[11px] uppercase tracking-[0.25em] text-sisley-muted">Menú</span>
              <button
                onClick={closeMobile}
                className="p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-6 md:p-8" aria-label="Menú móvil">
              <div className="space-y-0">
                {isAdmin ? (
                  <div className="space-y-0">
                    {[
                      { href: '/admin', label: 'Dashboard' },
                      { href: '/admin/productos', label: 'Productos' },
                      { href: '/admin/pedidos', label: 'Pedidos' },
                      { href: '/admin/clientes', label: 'Clientes' },
                      { href: '/admin/inventario', label: 'Inventario' },
                      { href: '/admin/facturacion', label: 'Facturación' },
                      { href: '/admin/reportes', label: 'Reportes' },
                    ].map((item, i) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobile}
                        className="flex items-center justify-between py-5 text-3xl md:text-4xl font-serif font-light text-sisley-text hover:text-sisley-black transition-colors border-b border-sisley-border stagger-child"
                        style={{ transitionDelay: `${80 * i}ms` }}
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="w-5 h-5 opacity-40" strokeWidth={1.5} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <>
                    <Link href="/catalogo" onClick={closeMobile} className="flex items-center justify-between py-5 text-3xl md:text-4xl font-serif font-light text-sisley-text hover:text-sisley-black transition-colors border-b border-sisley-border stagger-child">
                      <span>Catálogo</span>
                      <ChevronRight className="w-5 h-5 opacity-40" strokeWidth={1.5} />
                    </Link>
                    {categories.slice(0, 4).map((link, i) => (
                      <Link
                        key={link.id}
                        href={`/catalogo?categoria=${link.slug}`}
                        onClick={closeMobile}
                        className="flex items-center justify-between py-5 text-3xl md:text-4xl font-serif font-light text-sisley-text hover:text-sisley-black transition-colors border-b border-sisley-border stagger-child"
                        style={{ transitionDelay: `${80 * (i + 1)}ms` }}
                      >
                        <span>{link.name}</span>
                        <ChevronRight className="w-5 h-5 opacity-40" strokeWidth={1.5} />
                      </Link>
                    ))}
                  </>
                )}
              </div>

              {!isAdmin && (
                <div className="mt-10 pt-8 border-t border-sisley-border">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-sisley-muted mb-6">Cuenta</p>
                  <div className="space-y-4">
                    {customer ? (
                      <>
                        <div className="mb-4">
                          <p className="text-base font-medium text-sisley-text">Hola, {customer.firstName || customer.name?.split(' ')[0] || 'Cliente'}</p>
                          <p className="text-xs text-sisley-muted mt-1">{customer.email}</p>
                        </div>
                        <Link href="/mi-cuenta" onClick={closeMobile} className="block text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors py-2">
                          Mi cuenta
                        </Link>
                        <Link href="/mis-pedidos" onClick={closeMobile} className="block text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors py-2">
                          Mis pedidos
                        </Link>
                        <button
                          onClick={async () => {
                            closeMobile();
                            await customerLogout();
                          }}
                          className="block text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors py-2"
                        >
                          Cerrar sesión
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={closeMobile} className="block text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors py-2">
                          Iniciar sesión
                        </Link>
                        <Link href="/registro" onClick={closeMobile} className="block text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors py-2">
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
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
              searchVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeSearch}
          />
          <div
            className={`absolute inset-x-0 top-0 bg-sisley-white border-b border-sisley-border transition-all duration-500 ease-out motion-reduce:translate-y-0 ${
              searchVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}
          >
            <div className="max-w-3xl mx-auto px-6 md:px-10 py-10 md:py-16">
              <div className="flex items-center justify-between mb-8">
                <p id="search-title" className="text-[11px] uppercase tracking-[0.25em] text-sisley-muted">Buscar</p>
                <button
                  onClick={closeSearch}
                  className="p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors"
                  aria-label="Cerrar búsqueda"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
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
              <div className="mt-8 flex flex-wrap gap-3">
                {SEARCH_SUGGESTIONS.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => goToSearch(term)}
                    className="px-5 py-2.5 text-xs uppercase tracking-widest border border-sisley-border text-sisley-text-secondary hover:border-sisley-black hover:text-sisley-black transition-colors duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
              {searchQuery && (
                <div className="mt-8 pt-8 border-t border-sisley-border">
                  <p className="text-meta uppercase tracking-[0.25em] text-sisley-muted mb-4">Resultados</p>
                  <div className="space-y-4">
                    <p className="text-sm text-sisley-text-secondary">
                      Escribe para ver resultados de &quot;{searchQuery}&quot;.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </>
  );
}
