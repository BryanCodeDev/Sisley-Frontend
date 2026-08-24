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
      <div className="min-h-screen bg-sisley-smoke">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 min-w-0 lg:pl-64">
          <Header variant="admin" />
          <main className="px-4 md:px-8 pt-14 md:pt-16 lg:pt-20 pb-24 md:pb-8">
            {children}
          </main>
        </div>

        <AdminBottomNav />
      </div>
    </ProtectedRoute>
  );
}
