'use client';

import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import Header from '@/app/components/Header';
import AdminBottomNav from '@/app/components/AdminBottomNav';

export default function AdminLayout({ children, requiredPermission }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute requiredPermission={requiredPermission}>
      <div className="min-h-screen bg-sisley-bg">
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div className="flex-1 min-w-0">
            <Header variant="admin" />

            <main className="p-4 md:p-8 pb-24 md:pb-8">
              {children}
            </main>
          </div>
        </div>

        <AdminBottomNav />
      </div>
    </ProtectedRoute>
  );
}
