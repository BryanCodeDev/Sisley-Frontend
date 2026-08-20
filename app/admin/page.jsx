'use client';

import { useEffect, useState } from 'react';
import Badge from '@/app/components/Badge';
import KPICard from '@/app/components/KPICard';
import ActivityList from '@/app/components/ActivityList';
import { getProducts } from '@/app/services/products';
import { getOrders } from '@/app/services/orders';
import { getCustomers } from '@/app/services/customers';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: { label: 'Ventas', total: 0, change: 0, prefix: '$' },
    orders: { label: 'Pedidos', total: 0, change: 0 },
    customers: { label: 'Clientes', total: 0, change: 0 },
    products: { label: 'Productos', total: 0, change: 0 },
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [productsRes, ordersRes, customersRes] = await Promise.all([
          getProducts({ status: 'active', limit: '1' }),
          getOrders({ limit: '5' }),
          getCustomers({ status: 'active', limit: '1' }),
        ]);

        const productsCount = productsRes.pagination?.total || 0;
        const ordersList = ordersRes.data || [];
        const ordersCount = ordersRes.pagination?.total || 0;
        const customersCount = customersRes.pagination?.total || 0;
        const totalRevenue = ordersList.reduce((sum, order) => sum + Number(order.total || 0), 0);

        setStats({
          revenue: { label: 'Ventas', total: totalRevenue, change: 12.5, prefix: '$' },
          orders: { label: 'Pedidos', total: ordersCount, change: 8.2 },
          customers: { label: 'Clientes', total: customersCount, change: 4.1 },
          products: { label: 'Productos', total: productsCount, change: -2.4 },
        });

        setRecentOrders(
          ordersList.map((order) => ({
            id: order.orderNumber || order.id,
            customer: order.customerEmail || 'Cliente',
            total: Number(order.total || 0),
            status: order.status,
            date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('es-CO') : '',
          }))
        );
      } catch (err) {
        console.error('Failed to load dashboard stats:', err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light text-sisley-text">Dashboard</h1>
        <p className="text-sm text-sisley-text-secondary mt-1">Vista general del negocio</p>
      </div>

      {loading ? (
        <p className="text-sm text-sisley-muted">Cargando...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            <KPICard
              label={stats.revenue.label}
              value={stats.revenue.total}
              change={stats.revenue.change}
              prefix={stats.revenue.prefix}
              icon="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.5-2.303.5-3.5-.879-1.047-1.914-2.303-1.914-3.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <KPICard
              label={stats.orders.label}
              value={stats.orders.total}
              change={stats.orders.change}
              icon="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-3.4-5.759 4.125 4.125 0 00-3.4 5.759 9.337 9.337 0 00-4.121-.952 9.375 9.375 0 01-5.25-1.5 9.375 9.375 0 01-5.25 1.5 9.337 9.337 0 00-4.121.952 4.125 4.125 0 00-3.4-5.759 4.125 4.125 0 00-3.4 5.759 9.38 9.38 0 002.625.372M15 19.128V18a3.375 3.375 0 00-3.375-3.375h-1.5A3.375 3.375 0 007.125 18v1.128M12 9.375a3.375 3.375 0 100-6.75 3.375 3.375 0 000 6.75z"
            />
            <KPICard
              label={stats.customers.label}
              value={stats.customers.total}
              change={stats.customers.change}
              icon="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-3.4-5.759 4.125 4.125 0 00-3.4 5.759 9.337 9.337 0 00-4.121-.952 9.375 9.375 0 01-5.25-1.5 9.375 9.375 0 01-5.25 1.5 9.337 9.337 0 00-4.121.952 4.125 4.125 0 00-3.4-5.759 4.125 4.125 0 00-3.4 5.759 9.38 9.38 0 002.625.372M15 19.128V18a3.375 3.375 0 00-3.375-3.375h-1.5A3.375 3.375 0 007.125 18v1.128M12 9.375a3.375 3.375 0 100-6.75 3.375 3.375 0 000 6.75z"
            />
            <KPICard
              label={stats.products.label}
              value={stats.products.total}
              change={stats.products.change}
              icon="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-sisley-white border border-sisley-border p-6">
                <h2 className="text-[11px] uppercase tracking-widest text-sisley-muted mb-6">Actividad reciente</h2>
                <div className="space-y-0">
                  {recentOrders.length === 0 ? (
                    <p className="text-sm text-sisley-muted">Sin actividad reciente</p>
                  ) : (
                    recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between py-3 border-b border-sisley-border last:border-0">
                        <div>
                          <p className="text-sm text-sisley-text">{order.id}</p>
                          <p className="text-xs text-sisley-muted">{order.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-sisley-text">${Number(order.total).toLocaleString('es-CO')}</p>
                          <Badge
                            variant={
                              order.status === 'DELIVERED' || order.status === 'Entregado' ? 'success' :
                              order.status === 'CANCELLED' || order.status === 'Cancelado' ? 'danger' :
                              order.status === 'SHIPPED' || order.status === 'Enviado' ? 'info' : 'warning'
                            }
                            size="sm"
                            mode="admin"
                          >
                            {order.status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-sisley-white border border-sisley-border p-6">
                <h2 className="text-[11px] uppercase tracking-widest text-sisley-muted mb-6">Alertas de stock</h2>
                <ActivityList
                  items={[
                    { title: 'Mascarilla de Arcilla Purificante — Agotado', time: 'Hace 1 hora' },
                    { title: 'Bálsamo Labial Reparador — Stock bajo (3)', time: 'Hace 3 horas' },
                    { title: 'Sérum Iluminador Éclat — Stock bajo (8)', time: 'Hace 5 horas' },
                    { title: 'Contorno de Ojos Antioxidante — Stock normal', time: 'Hace 8 horas' },
                  ]}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
