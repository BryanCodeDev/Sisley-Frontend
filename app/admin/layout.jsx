'use client';

import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import Header from '@/app/components/Header';

export default function AdminLayout({ children, requiredPermission }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute requiredPermission={requiredPermission}>
      <div className="min-h-screen bg-sisley-bg">
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div className="flex-1 min-w-0">
            <Header variant="admin" />

            <main className="p-6 md:p-8">
              {children}
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
