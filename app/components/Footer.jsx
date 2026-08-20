'use client';

import Link from 'next/link';

const footerLinks = {
  shop: [
    { href: '/catalogo', label: 'Todos los productos' },
    { href: '/catalogo?genero=mujer', label: 'Mujer' },
    { href: '/catalogo?genero=hombre', label: 'Hombre' },
    { href: '/catalogo?coleccion=nueva', label: 'Nueva colección' },
    { href: '/catalogo?ofertas=true', label: 'Ofertas' },
  ],
  help: [
    { href: '/', label: 'Contacto' },
    { href: '/', label: 'Envíos y entregas' },
    { href: '/', label: 'Cambios y devoluciones' },
    { href: '/', label: 'Guía de tallas' },
    { href: '/', label: 'Preguntas frecuentes' },
  ],
  company: [
    { href: '/', label: 'Sobre Sisley' },
    { href: '/', label: 'Sostenibilidad' },
    { href: '/', label: 'Privacidad' },
    { href: '/', label: 'Términos' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-sisley-bg border-t border-sisley-border">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="py-16 md:py-24 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-lg font-light tracking-[0.2em] text-sisley-black uppercase">
              Sisley
            </Link>
            <p className="mt-4 text-sm text-sisley-text-secondary leading-relaxed max-w-xs">
              Moda premium colombiana. Elegancia contemporánea y estilo atemporal.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="/" aria-label="Instagram" className="text-sisley-text-secondary hover:text-sisley-black transition-colors">
                <span className="text-xs uppercase tracking-widest">Ig</span>
              </a>
              <a href="/" aria-label="Facebook" className="text-sisley-text-secondary hover:text-sisley-black transition-colors">
                <span className="text-xs uppercase tracking-widest">Fb</span>
              </a>
              <a href="/" aria-label="Twitter" className="text-sisley-text-secondary hover:text-sisley-black transition-colors">
                <span className="text-xs uppercase tracking-widest">X</span>
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-5">Tienda</p>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-5">Ayuda</p>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-5">Empresa</p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-sisley-text-secondary hover:text-sisley-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-sisley-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-sisley-muted">
            © {new Date().getFullYear()} Sisley Colombia. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xs text-sisley-muted hover:text-sisley-black transition-colors">
              Privacidad
            </Link>
            <Link href="/" className="text-xs text-sisley-muted hover:text-sisley-black transition-colors">
              Términos
            </Link>
            <Link href="/" className="text-xs text-sisley-muted hover:text-sisley-black transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}