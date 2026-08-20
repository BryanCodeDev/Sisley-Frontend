'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import Badge from '@/app/components/Badge';
import { orders } from '@/data/orders';
import Link from 'next/link';

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
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Cuenta</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight">
              Mi cuenta
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="lg:col-span-1">
              <div className="border border-sisley-border p-6">
                <div className="w-16 h-16 bg-sisley-bg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-sisley-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-sisley-text">María García López</p>
                <p className="text-xs text-sisley-muted mt-1">maria.garcia@example.com</p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex border-b border-sisley-border mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-xs uppercase tracking-widest transition-all ${
                      activeTab === tab.id
                        ? 'border-b-2 border-sisley-black text-sisley-text'
                        : 'text-sisley-muted hover:text-sisley-text'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'perfil' && (
                <div className="max-w-2xl">
                  <h2 className="font-serif text-lg font-light text-sisley-text mb-6">Información personal</h2>
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
                  <h2 className="font-serif text-lg font-light text-sisley-text mb-6">Direcciones</h2>
                  <div className="border border-sisley-border p-6 max-w-2xl">
                    <p className="text-sm font-medium text-sisley-text mb-1">Calle 85 #12-45</p>
                    <p className="text-sm text-sisley-text-secondary mb-1">Bogotá, Colombia</p>
                    <p className="text-xs text-sisley-muted">Código postal: 110111</p>
                    <Badge variant="success" size="sm" className="mt-3">Principal</Badge>
                  </div>
                </div>
              )}

              {activeTab === 'pedidos' && (
                <div>
                  <h2 className="font-serif text-lg font-light text-sisley-text mb-6">Mis pedidos</h2>
                  <div className="border border-sisley-border divide-y divide-sisley-border">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-sm font-medium text-sisley-text">{order.id}</p>
                            <p className="text-xs text-sisley-muted">{order.date}</p>
                          </div>
                          <Badge
                            variant={
                              order.status === 'Entregado'
                                ? 'success'
                                : order.status === 'Cancelado'
                                ? 'danger'
                                : 'info'
                            }
                            size="sm"
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-sisley-text-secondary mb-1">
                          {order.items.map((i) => i.name).join(', ')}
                        </p>
                        <p className="text-sm text-sisley-text">${order.total.toLocaleString('es-CO')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'favoritos' && (
                <div>
                  <h2 className="font-serif text-lg font-light text-sisley-text mb-6">Favoritos</h2>
                  <p className="text-sm text-sisley-muted">Aún no has agregado productos a favoritos.</p>
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