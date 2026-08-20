'use client';

import Link from 'next/link';

export default function Footer() {
  const footerLinks = {
    tienda: [
      { href: '/catalogo', label: 'Todos los productos' },
      { href: '/catalogo?categoria=hidratacion', label: 'Hidratación' },
      { href: '/catalogo?categoria=tratamiento', label: 'Tratamiento' },
      { href: '/catalogo?categoria=proteccion', label: 'Protección solar' },
    ],
    cuenta: [
      { href: '/mi-cuenta', label: 'Mi cuenta' },
      { href: '/mis-pedidos', label: 'Mis pedidos' },
      { href: '/carrito', label: 'Carrito' },
      { href: '/checkout', label: 'Checkout' },
    ],
    empresa: [
      { href: '/', label: 'Sobre nosotros' },
      { href: '/', label: 'Contacto' },
      { href: '/', label: 'Política de privacidad' },
      { href: '/', label: 'Términos y condiciones' },
    ],
  };

  return (
    <footer className="bg-sisley-gray-50 border-t border-sisley-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="text-lg font-light tracking-widest text-sisley-black mb-4">SISLEY</h3>
            <p className="text-sm text-sisley-gray-500 leading-relaxed">
              Belleza inteligente. Productos formulados con ingredientes de origen natural para una piel radiante.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-4">Tienda</h4>
            <ul className="space-y-2">
              {footerLinks.tienda.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-sisley-gray-600 hover:text-sisley-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-4">Cuenta</h4>
            <ul className="space-y-2">
              {footerLinks.cuenta.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-sisley-gray-600 hover:text-sisley-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-sisley-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-sisley-gray-400">
            Sisley Colombia. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/" className="text-xs text-sisley-gray-400 hover:text-sisley-black transition-colors">
              Privacidad
            </Link>
            <Link href="/" className="text-xs text-sisley-gray-400 hover:text-sisley-black transition-colors">
              Términos
            </Link>
            <Link href="/" className="text-xs text-sisley-gray-400 hover:text-sisley-black transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
