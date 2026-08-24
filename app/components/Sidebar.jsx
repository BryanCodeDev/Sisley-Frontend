'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  Warehouse,
  Receipt,
  BarChart3,
  X,
} from 'lucide-react';

const allNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, permission: null },
  { href: '/admin/productos', label: 'Productos', icon: Package, permission: 'products.read' },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ClipboardList, permission: 'orders.read' },
  { href: '/admin/clientes', label: 'Clientes', icon: Users, permission: 'customers.read' },
  { href: '/admin/inventario', label: 'Inventario', icon: Warehouse, permission: 'inventory.read' },
  { href: '/admin/facturacion', label: 'Facturación', icon: Receipt, permission: null },
  { href: '/admin/reportes', label: 'Reportes', icon: BarChart3, permission: 'reports.read' },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { hasPermission } = useAuth();

  const navItems = allNavItems.filter((item) => {
    if (!item.permission) return true;
    return hasPermission(item.permission);
  });

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
        </div>
      )}

      <aside
        className={`
          hidden lg:flex fixed inset-y-0 left-0 z-[60] w-64 bg-sisley-charcoal flex-col
        `}
      >
        <div className="flex items-center justify-between p-6 flex-shrink-0">
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">Administración</span>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors lg:hidden" aria-label="Cerrar menú">
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest transition-all duration-200 border-l-2 ${
                  isActive
                    ? 'border-white bg-white/10 text-white font-medium'
                    : 'border-transparent text-white/50 hover:bg-white/5 hover:text-white/80'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-[10px] uppercase tracking-widest text-white/30 text-center">
            Sisley Admin v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
