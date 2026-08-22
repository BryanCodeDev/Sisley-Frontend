'use client';

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

export default function Footer() {
  return (
    <footer className="bg-sisley-dark text-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="py-16 md:py-24 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
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
            <div className="flex items-center gap-4 mt-6">
              <a href="/" aria-label="Instagram" className="text-sisley-dark-muted hover:text-white transition-colors duration-200">
                <span className="text-xs uppercase tracking-widest">Ig</span>
              </a>
              <a href="/" aria-label="Facebook" className="text-sisley-dark-muted hover:text-white transition-colors duration-200">
                <span className="text-xs uppercase tracking-widest">Fb</span>
              </a>
              <a href="/" aria-label="Twitter" className="text-sisley-dark-muted hover:text-white transition-colors duration-200">
                <span className="text-xs uppercase tracking-widest">X</span>
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-sisley-dark-muted mb-5">Tienda</p>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} prefetch={link.prefetch ?? true} className="text-sm text-sisley-dark-muted hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-sisley-dark-muted mb-5">Ayuda</p>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} prefetch={link.prefetch ?? true} className="text-sm text-sisley-dark-muted hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-sisley-dark-muted mb-5">Empresa</p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} prefetch={link.prefetch ?? true} className="text-sm text-sisley-dark-muted hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-sisley-dark-muted">
            © {new Date().getFullYear()} Sisley Colombia. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xs text-sisley-dark-muted hover:text-white transition-colors duration-200">
              Privacidad
            </Link>
            <Link href="/" className="text-xs text-sisley-dark-muted hover:text-white transition-colors duration-200">
              Términos
            </Link>
            <Link href="/" className="text-xs text-sisley-dark-muted hover:text-white transition-colors duration-200">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
