'use client';

import { useEffect, useState } from 'react';
import StatCard from '@/app/components/StatCard';
import Badge from '@/app/components/Badge';
import { getProducts } from '@/app/services/products';
import { getOrders } from '@/app/services/orders';
import { getCustomers } from '@/app/services/customers';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: { label: 'Ventas', total: '$ 0', change: '+0%' },
    orders: { label: 'Pedidos', total: 0, change: '+0%' },
    customers: { label: 'Clientes', total: 0, change: '+0%' },
    products: { label: 'Productos', total: 0, change: '+0%' },
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
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
          revenue: { label: 'Ventas', total: `$ ${totalRevenue.toLocaleString('es-CO')}`, change: '+0%' },
          orders: { label: 'Pedidos', total: ordersCount, change: '+0%' },
          customers: { label: 'Clientes', total: customersCount, change: '+0%' },
          products: { label: 'Productos', total: productsCount, change: '+0%' },
        });

        const mappedOrders = ordersList.map((order) => ({
          id: order.orderNumber,
          customer: `${order.customerFirstName || ''} ${order.customerLastName || ''}`.trim() || order.customerEmail,
          total: order.total,
          status: order.status,
        }));
        setRecentOrders(mappedOrders);

        const lowStock = (productsRes.data || [])
          .flatMap((p) => (p.variants || []).filter((v) => v.stock <= 2))
          .slice(0, 5);
        setLowStockAlerts(lowStock);
      } catch (err) {
        console.error('Failed to load dashboard stats:', err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-light text-sisley-black">Dashboard</h1>
        <p className="text-sm text-sisley-gray-500 mt-1">Vista general de tu negocio</p>
      </div>

      {loading ? (
        <p className="text-sm text-sisley-gray-500">Cargando...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            <StatCard label={stats.revenue.label} value={stats.revenue.total} change={stats.revenue.change} prefix="" />
            <StatCard label={stats.orders.label} value={stats.orders.total} change={stats.orders.change} />
            <StatCard label={stats.customers.label} value={stats.customers.total} change={stats.customers.change} />
            <StatCard label={stats.products.label} value={stats.products.total} change={stats.products.change} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-sisley-white border border-sisley-gray-200 p-6">
                <h2 className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-6">Actividad reciente</h2>
                <div className="space-y-4">
                  {recentOrders.length === 0 ? (
                    <p className="text-sm text-sisley-gray-500">Sin pedidos recientes.</p>
                  ) : (
                    recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between py-2 border-b border-sisley-gray-100 last:border-0">
                        <div>
                          <p className="text-sm text-sisley-gray-700">{order.id}</p>
                          <p className="text-xs text-sisley-gray-400">{order.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-sisley-black">$ {Number(order.total).toLocaleString('es-CO')}</p>
                          <Badge variant="default" size="sm">{order.status}</Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-sisley-white border border-sisley-gray-200 p-6 mb-6">
                <h2 className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-4">Alertas de stock</h2>
                <div className="space-y-3">
                  {lowStockAlerts.length === 0 ? (
                    <p className="text-sm text-sisley-gray-500">Sin alertas.</p>
                  ) : (
                    lowStockAlerts.map((alert, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-sisley-gray-100 last:border-0">
                        <div>
                          <p className="text-sm text-sisley-gray-700">{alert.name} - {alert.color} {alert.size}</p>
                          <p className="text-xs text-sisley-gray-400">Stock: {alert.stock}</p>
                        </div>
                        <Badge variant={alert.stock === 0 ? 'danger' : 'warning'} size="sm">
                          {alert.stock === 0 ? 'Agotado' : 'Bajo'}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
