'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Badge from '@/app/components/Badge';
import { orders } from '@/data/orders';

export default function MisPedidos() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl font-light text-sisley-black mb-8">Mis pedidos</h1>

          <div className="border border-sisley-gray-200 divide-y divide-sisley-gray-200">
            {orders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-sisley-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-sisley-black">{order.id}</p>
                    <p className="text-xs text-sisley-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-sisley-black">${order.total.toLocaleString('es-CO')}</p>
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
                      <span className="text-sisley-gray-600">
                        {item.name} x{item.qty}
                      </span>
                      <span className="text-sisley-black">${item.price.toLocaleString('es-CO')}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-sisley-gray-200 flex justify-between items-center">
                  <p className="text-xs text-sisley-gray-500">{order.shipping} · {order.address}</p>
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
