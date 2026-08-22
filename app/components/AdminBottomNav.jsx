'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import AdminMoreSheet from './AdminMoreSheet';

const primaryItems = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z',
  },
  {
    href: '/admin/productos',
    label: 'Productos',
    icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z',
    permission: 'products.read',
  },
  {
    href: '/admin/pedidos',
    label: 'Pedidos',
    icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
    permission: 'orders.read',
  },
  {
    href: '/admin/clientes',
    label: 'Clientes',
    icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-3.4-5.759 4.125 4.125 0 00-3.4 5.759 9.337 9.337 0 00-4.121-.952 9.375 9.375 0 01-5.25-1.5 9.375 9.375 0 01-5.25 1.5 9.337 9.337 0 00-4.121.952 4.125 4.125 0 00-3.4-5.759 4.125 4.125 0 00-3.4 5.759 9.38 9.38 0 002.625.372M15 19.128V18a3.375 3.375 0 00-3.375-3.375h-1.5A3.375 3.375 0 007.125 18v1.128M12 9.375a3.375 3.375 0 100-6.75 3.375 3.375 0 000 6.75z',
    permission: 'customers.read',
  },
];

const moreItems = [
  {
    href: '/admin/inventario',
    label: 'Inventario',
    icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z',
    permission: 'inventory.read',
  },
  {
    href: '/admin/facturacion',
    label: 'Facturación',
    icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
    permission: null,
  },
  {
    href: '/admin/reportes',
    label: 'Reportes',
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 15.375v-2.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-8.25zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V15m-9 2.25h9.75M3.375 18.375h17.25',
    permission: 'reports.read',
  },
];

const secondaryPaths = moreItems.map((item) => item.href);

export default function AdminBottomNav() {
  const pathname = usePathname();
  const { hasPermission } = useAuth();
  const [moreOpen, setMoreOpen] = useState(false);

  const visiblePrimary = primaryItems.filter((item) => {
    if (!item.permission) return true;
    return hasPermission(item.permission);
  });

  const visibleMore = moreItems.filter((item) => {
    if (!item.permission) return true;
    return hasPermission(item.permission);
  });

  const isMoreActive = visibleMore.some((item) => pathname === item.href || pathname.startsWith(item.href));

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-sisley-white/90 backdrop-blur-md border-t border-sisley-border md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center justify-around">
          {visiblePrimary.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-2 min-w-[64px] ${
                  isActive ? 'text-sisley-black' : 'text-sisley-text-secondary'
                }`}
              >
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="text-[10px] uppercase tracking-widest">{item.label}</span>
              </Link>
            );
          })}

          <button
            onClick={() => setMoreOpen(true)}
            className={`flex flex-col items-center justify-center py-2 px-2 min-w-[64px] ${
              isMoreActive ? 'text-sisley-black' : 'text-sisley-text-secondary'
            }`}
            aria-label="Más módulos"
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <span className="text-[10px] uppercase tracking-widest">Más</span>
          </button>
        </div>
      </nav>

      <AdminMoreSheet open={moreOpen} onClose={() => setMoreOpen(false)} items={visibleMore} />
    </>
  );
}
