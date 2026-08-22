'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Badge from '@/app/components/Badge';
import Skeleton from '@/app/components/Skeleton';
import { useCustomerAuth } from '@/app/contexts/CustomerAuthContext';
import { getOrders } from '@/app/services/orders';
import Link from 'next/link';

const STATUS_MAP = {
  PENDING: 'Pendiente',
  PAYMENT_PENDING: 'Pago pendiente',
  PAID: 'Pagado',
  PROCESSING: 'Procesando',
  READY_TO_SHIP: 'Listo para enviar',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
  REFUNDED: 'Reembolsado',
};

function statusLabel(status) {
  return STATUS_MAP[status] || status;
}

function statusVariant(status) {
  if (status === 'DELIVERED') return 'success';
  if (status === 'CANCELLED' || status === 'REFUNDED') return 'danger';
  if (status === 'SHIPPED' || status === 'READY_TO_SHIP') return 'info';
  if (status === 'PAID' || status === 'PROCESSING') return 'default';
  return 'warning';
}

export default function MisPedidos() {
  const router = useRouter();
  const { customer, loading: authLoading, isAuthenticated } = useCustomerAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!customer?.id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await getOrders({ customerId: customer.id });
        setOrders(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [customer?.id]);

  if (authLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
            <Skeleton className="h-8 w-48 mb-10" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  if (!isAuthenticated) {
    return null;
  }

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

          {error && (
            <div className="mb-6">
              <p className="text-sm text-red-600">Error: {error}</p>
              <Button variant="secondary" onClick={() => window.location.reload()}>Reintentar</Button>
            </div>
          )}

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sisley-muted mb-4">Aún no tienes pedidos.</p>
              <Link href="/catalogo"><Button>Ir a la tienda</Button></Link>
            </div>
          ) : (
            <div className="border border-sisley-border divide-y divide-sisley-border">
              {orders.map((order) => {
                const orderNumber = order.orderNumber || `#${order.id}`;
                const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('es-CO') : '—';
                const orderStatus = statusLabel(order.status);
                const shippingLabel = [order.shippingAddress, order.shippingCity, order.shippingDepartment].filter(Boolean).join(', ') || '—';
                return (
                  <div key={order.id} className="p-6 hover:bg-sisley-bg transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-sisley-text">{orderNumber}</p>
                        <p className="text-xs text-sisley-muted">{orderDate}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-medium text-sisley-text">${Number(order.total).toLocaleString('es-CO')}</p>
                        <Badge variant={statusVariant(order.status)} size="sm">
                          {orderStatus}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {(order.items || []).map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-sisley-text-secondary">
                            {item.productName || item.variantSku || 'Producto'} x{item.quantity || 1}
                          </span>
                          <span className="text-sisley-text">${Number(item.unitPrice || 0).toLocaleString('es-CO')}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-sisley-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <p className="text-xs text-sisley-muted">{shippingLabel}</p>
                      <p className="text-xs text-sisley-muted capitalize">{(order.paymentMethod || '—').replace(/_/g, ' ')}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
