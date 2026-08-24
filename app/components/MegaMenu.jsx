'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const DEFAULT_NAV_STRUCTURE = [
  {
    label: 'Mujer',
    href: '/catalogo?categoria=mujer',
    image: '/assets/catalog/Hero-principal.webp',
    children: [
      { label: 'Nueva Colección', href: '/catalogo?coleccion=nueva' },
      { label: 'Vestidos', href: '/catalogo?categoria=mujer' },
      { label: 'Camisas', href: '/catalogo?categoria=mujer' },
      { label: 'Pantalones', href: '/catalogo?categoria=mujer' },
      { label: 'Accesorios', href: '/catalogo?categoria=mujer' },
    ],
  },
  {
    label: 'Hombre',
    href: '/catalogo?categoria=hombre',
    image: '/assets/catalog/Hero-alterno.webp',
    children: [
      { label: 'Nueva Colección', href: '/catalogo?coleccion=nueva' },
      { label: 'Camisas', href: '/catalogo?categoria=hombre' },
      { label: 'Pantalones', href: '/catalogo?categoria=hombre' },
      { label: 'Blazers', href: '/catalogo?categoria=hombre' },
      { label: 'Accesorios', href: '/catalogo?categoria=hombre' },
    ],
  },
  {
    label: 'Nueva Colección',
    href: '/catalogo?coleccion=nueva',
    image: '/assets/catalog/Hero-Nueva-Colección.webp',
    children: [
      { label: 'Ver todo', href: '/catalogo?coleccion=nueva' },
      { label: 'Editorial', href: '/catalogo?coleccion=nueva' },
      { label: 'Limitado', href: '/catalogo?coleccion=nueva' },
    ],
  },
  {
    label: 'Editorial',
    href: '/catalogo?editorial=ss26',
    image: '/assets/catalog/Hero-principal.webp',
    children: [
      { label: 'Campaña Otoño 2026', href: '/catalogo?editorial=ss26' },
      { label: 'Lookbook', href: '/catalogo?editorial=ss26' },
      { label: 'Detrás de cámaras', href: '/sobre-sisley' },
    ],
  },
];

export default function MegaMenu({ categories = [] }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const menuRef = useRef(null);
  const hoverTimer = useRef(null);

  const navItems = categories.length > 0
    ? categories.map((cat) => ({
        label: cat.name,
        href: `/catalogo?categoria=${cat.slug}`,
        image: cat.image || cat.imageUrl || '/assets/catalog/Hero-principal.webp',
        children: [
          { label: 'Ver colección', href: `/catalogo?categoria=${cat.slug}` },
          { label: 'Novedades', href: `/catalogo?categoria=${cat.slug}` },
          { label: 'Bestsellers', href: `/catalogo?categoria=${cat.slug}` },
        ],
      }))
    : DEFAULT_NAV_STRUCTURE;

  const handleMouseEnter = (index) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpenIndex(index);
    const raf = requestAnimationFrame(() => setVisible(true));
    hoverTimer.current = raf;
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) cancelAnimationFrame(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setVisible(false);
      setOpenIndex(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (hoverTimer.current) cancelAnimationFrame(hoverTimer.current);
    };
  }, []);

  if (navItems.length === 0) return null;

  const activeItem = openIndex !== null ? navItems[openIndex] : null;

  return (
    <div
      className="relative hidden lg:block"
      onMouseEnter={() => handleMouseEnter(0)}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="flex items-center gap-8" aria-label="Navegación principal">
        {navItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative text-[11px] uppercase tracking-widest text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200 py-6"
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {item.label}
            <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-sisley-black transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
          </Link>
        ))}
      </nav>

      <div
        ref={menuRef}
        className={`absolute top-full left-0 right-0 z-40 bg-sisley-white/95 backdrop-blur-md border-b border-sisley-border transition-all duration-300 ease-out motion-reduce:transition-none ${
          visible && activeItem ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={() => handleMouseEnter(openIndex ?? 0)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-10 md:py-14">
          <div className="grid grid-cols-12 gap-8 md:gap-12">
            <div className="col-span-12 md:col-span-8 lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
                {activeItem?.children?.map((child, i) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="group flex items-center gap-3 text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors duration-200"
                    style={{ transitionDelay: visible ? `${i * 60}ms` : '0ms' }}
                  >
                    <span className="text-[10px] uppercase tracking-widest text-sisley-muted group-hover:text-sisley-black transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex items-center gap-2">
                      {child.label}
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 motion-reduce:transition-none" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden md:block md:col-span-4 lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-sisley-smoke">
                <Image
                  src={activeItem?.image || '/assets/catalog/Hero-principal.webp'}
                  alt={activeItem?.label || 'Colección'}
                  fill
                  sizes="(max-width: 1024px) 0px, 400px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <p className="text-meta uppercase tracking-[0.25em] text-white/60 mb-2">Explorar</p>
                  <p className="font-serif text-xl text-white tracking-tight">{activeItem?.label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
