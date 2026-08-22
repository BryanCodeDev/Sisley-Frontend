'use client';

import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useAuth } from '@/app/contexts/AuthContext';

export default function AdminLayout({ children, requiredPermission }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <ProtectedRoute requiredPermission={requiredPermission}>
      <div className="min-h-screen bg-sisley-bg">
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div className="flex-1 min-w-0">
            <header className="sticky top-0 z-30 bg-sisley-bg border-b border-sisley-border">
              <div className="flex items-center justify-between h-14 px-6 lg:px-10">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 -ml-2 text-sisley-text-secondary hover:text-sisley-text transition-colors"
                    aria-label="Abrir menú"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  </button>
                  <div className="hidden lg:block">
                    <p className="text-[11px] uppercase tracking-widest text-sisley-muted">Panel administrativo</p>
                  </div>
                </div>

                 <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-medium text-sisley-text">
                      {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Administrador' : 'Admin Sisley'}
                    </p>
                    <p className="text-[10px] text-sisley-muted">
                      {user?.email || 'admin@sisley.co'}
                    </p>
                  </div>
                   <div className="w-8 h-8 bg-sisley-border rounded-full flex items-center justify-center">
                     <span className="text-[10px] font-medium text-sisley-text">
                       {user ? `${(user.firstName || '')[0] || ''}${(user.lastName || '')[0] || ''}` : 'A'}
                     </span>
                   </div>
                </div>
              </div>
            </header>

            <main className="p-6 md:p-8">
              {children}
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
