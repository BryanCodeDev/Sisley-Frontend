'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import Badge from '@/app/components/Badge';
import { orders } from '@/data/orders';

export default function MiCuenta() {
  const [activeTab, setActiveTab] = useState('perfil');

  const tabs = [
    { id: 'perfil', label: 'Perfil' },
    { id: 'direcciones', label: 'Direcciones' },
    { id: 'pedidos', label: 'Pedidos' },
    { id: 'favoritos', label: 'Favoritos' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl font-light text-sisley-black mb-8">Mi cuenta</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="border border-sisley-gray-200 p-6">
                <div className="w-16 h-16 bg-sisley-gray-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-sisley-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-sisley-black">María García López</p>
                <p className="text-xs text-sisley-gray-500">maria.garcia@example.com</p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex border-b border-sisley-gray-200 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-xs uppercase tracking-widest transition-all ${
                      activeTab === tab.id
                        ? 'border-b-2 border-sisley-black text-sisley-black'
                        : 'text-sisley-gray-500 hover:text-sisley-black'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'perfil' && (
                <div className="max-w-2xl">
                  <h2 className="text-lg font-light text-sisley-black mb-6">Información personal</h2>
                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Nombre" defaultValue="María" />
                      <Input label="Apellido" defaultValue="García López" />
                    </div>
                    <Input label="Correo electrónico" type="email" defaultValue="maria.garcia@example.com" />
                    <Input label="Teléfono" type="tel" defaultValue="+57 300 123 4567" />
                    <div className="pt-4">
                      <Button>Guardar cambios</Button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'direcciones' && (
                <div>
                  <h2 className="text-lg font-light text-sisley-black mb-6">Direcciones</h2>
                  <div className="border border-sisley-gray-200 p-6 max-w-2xl">
                    <p className="text-sm font-medium text-sisley-black mb-1">Calle 85 #12-45</p>
                    <p className="text-sm text-sisley-gray-500 mb-1">Bogotá, Colombia</p>
                    <p className="text-xs text-sisley-gray-400">Código postal: 110111</p>
                    <Badge variant="success" size="sm" className="mt-3">Principal</Badge>
                  </div>
                </div>
              )}

              {activeTab === 'pedidos' && (
                <div>
                  <h2 className="text-lg font-light text-sisley-black mb-6">Mis pedidos</h2>
                  <div className="border border-sisley-gray-200 divide-y divide-sisley-gray-200">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm font-medium text-sisley-black">{order.id}</p>
                            <p className="text-xs text-sisley-gray-500">{order.date}</p>
                          </div>
                          <Badge variant={order.status === 'Entregado' ? 'success' : order.status === 'Cancelado' ? 'danger' : 'info'} size="sm">
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-sisley-gray-600 mb-1">
                          {order.items.map((i) => i.name).join(', ')}
                        </p>
                        <p className="text-sm text-sisley-black">${order.total.toLocaleString('es-CO')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'favoritos' && (
                <div>
                  <h2 className="text-lg font-light text-sisley-black mb-6">Favoritos</h2>
                  <p className="text-sm text-sisley-gray-500">Aún no has agregado productos a favoritos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
