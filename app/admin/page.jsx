'use client';

import { useEffect, useState } from 'react';
import Badge from '@/app/components/Badge';
import KPICard from '@/app/components/KPICard';
import ActivityList from '@/app/components/ActivityList';
import EditorialLabel from '@/app/components/EditorialLabel';
import ScrollReveal from '@/app/components/ScrollReveal';
import { getProducts } from '@/app/services/products';
import { getOrders } from '@/app/services/orders';
import { getCustomers } from '@/app/services/customers';
import { getInventoryFromProducts } from '@/app/services/inventory';
import { BarChart3, TrendingUp, Users, Package } from 'lucide-react';

function SkeletonCard() {
  return (
    <div className="bg-sisley-white border border-sisley-border p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="h-3 w-20 bg-sisley-border rounded" />
        <div className="h-8 w-8 bg-sisley-border rounded" />
      </div>
      <div className="h-8 w-24 bg-sisley-border rounded mb-2" />
      <div className="h-3 w-16 bg-sisley-border rounded" />
    </div>
  );
}

function SkeletonActivity() {
  return (
    <div className="space-y-0">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-start gap-4 py-3 border-b border-sisley-border last:border-0 animate-pulse">
          <div className="w-8 h-8 bg-sisley-border rounded flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-sisley-border rounded" />
            <div className="h-3 w-1/2 bg-sisley-border rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: { label: 'Ventas', total: 0, change: 0, prefix: '$' },
    orders: { label: 'Pedidos', total: 0, change: 0 },
    customers: { label: 'Clientes', total: 0, change: 0 },
    products: { label: 'Productos', total: 0, change: 0 },
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [stockAlerts, setStockAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [productsRes, ordersRes, customersRes, inventoryRes] = await Promise.all([
          getProducts({ status: 'active', limit: '1' }),
          getOrders({ limit: '5' }),
          getCustomers({ status: 'active', limit: '1' }),
          getInventoryFromProducts({ limit: '100' }),
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

        const inventoryItems = inventoryRes.data || [];
        const alerts = inventoryItems
          .filter((item) => item.stock === 0 || item.stock <= item.minStock)
          .map((item) => ({
            title: item.stock === 0
              ? `${item.name} — Agotado`
              : `${item.name} — Stock bajo (${item.stock})`,
            time: 'Revisar ahora',
          }))
          .slice(0, 5);
        setStockAlerts(alerts);
      } catch (err) {
        console.error('Failed to load dashboard stats:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif display-sm md:display-md text-sisley-text tracking-tighter leading-[0.95]">
          Dashboard
        </h1>
        <p className="text-sm text-sisley-text-secondary mt-2">Vista general del negocio</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-sisley-white border border-sisley-border p-6">
                <div className="h-3 w-32 bg-sisley-border rounded mb-6 animate-pulse" />
                <SkeletonActivity />
              </div>
            </div>
            <div>
              <div className="bg-sisley-white border border-sisley-border p-6">
                <div className="h-3 w-32 bg-sisley-border rounded mb-6 animate-pulse" />
                <SkeletonActivity />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            <KPICard
              label={stats.revenue.label}
              value={stats.revenue.total}
              change={stats.revenue.change}
              prefix={stats.revenue.prefix}
              icon={<TrendingUp className="w-5 h-5" strokeWidth={1.5} />}
            />
            <KPICard
              label={stats.orders.label}
              value={stats.orders.total}
              change={stats.orders.change}
              icon={<Package className="w-5 h-5" strokeWidth={1.5} />}
            />
            <KPICard
              label={stats.customers.label}
              value={stats.customers.total}
              change={stats.customers.change}
              icon={<Users className="w-5 h-5" strokeWidth={1.5} />}
            />
            <KPICard
              label={stats.products.label}
              value={stats.products.total}
              change={stats.products.change}
              icon={<BarChart3 className="w-5 h-5" strokeWidth={1.5} />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <ScrollReveal animation="reveal-up">
                <div className="bg-sisley-white border border-sisley-border p-6">
                  <h2 className="text-meta uppercase tracking-[0.25em] text-sisley-muted mb-6">Actividad reciente</h2>
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
              </ScrollReveal>
            </div>

            <ScrollReveal delay={100} animation="reveal-up">
              <div className="bg-sisley-white border border-sisley-border p-6">
                <h2 className="text-meta uppercase tracking-[0.25em] text-sisley-muted mb-6">Alertas de stock</h2>
                <ActivityList
                  items={stockAlerts.length === 0 ? [{ title: 'Sin alertas de stock', time: 'Todo en orden' }] : stockAlerts}
                />
              </div>
            </ScrollReveal>
          </div>
        </>
      )}
    </div>
  );
}
