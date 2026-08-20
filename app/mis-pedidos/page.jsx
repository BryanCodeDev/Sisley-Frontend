'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Badge from '@/app/components/Badge';
import { orders } from '@/data/orders';
import Link from 'next/link';

export default function MisPedidos() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Cuenta</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight">
              Mis pedidos
            </h1>
          </div>

          <div className="border border-sisley-border divide-y divide-sisley-border">
            {orders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-sisley-bg transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-sisley-text">{order.id}</p>
                    <p className="text-xs text-sisley-muted">{order.date}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-medium text-sisley-text">${order.total.toLocaleString('es-CO')}</p>
                    <Badge
                      variant={
                        order.status === 'Entregado'
                          ? 'success'
                          : order.status === 'Cancelado'
                          ? 'danger'
                          : order.status === 'Enviado'
                          ? 'info'
                          : 'warning'
                      }
                      size="sm"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-sisley-text-secondary">
                        {item.name} x{item.qty}
                      </span>
                      <span className="text-sisley-text">${item.price.toLocaleString('es-CO')}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-sisley-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <p className="text-xs text-sisley-muted">{order.shipping} · {order.address}</p>
                  <Button variant="ghost" size="sm">Ver detalles</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}