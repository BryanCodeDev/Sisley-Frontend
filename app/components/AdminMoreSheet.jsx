'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminMoreSheet({ open, onClose, items = [] }) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 bg-sisley-white border-t border-sisley-border rounded-t-2xl">
        <div className="p-4">
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-sisley-border" />
          <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-4">Más módulos</p>
          <div className="space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-sisley-bg text-sisley-black font-medium' : 'text-sisley-text-secondary hover:bg-sisley-bg'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span className="text-sm">{item.label}</span>
                  {isActive && <span className="ml-auto text-[10px] uppercase tracking-widest text-sisley-muted">Actual</span>}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
