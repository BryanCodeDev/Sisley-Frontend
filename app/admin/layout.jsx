'use client';

import Sidebar from '@/app/components/Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-sisley-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
