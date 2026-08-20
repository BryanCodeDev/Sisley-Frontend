'use client';

import { useEffect, useState } from 'react';
import Badge from '@/app/components/Badge';
import Table from '@/app/components/Table';
import { getOrders } from '@/app/services/orders';

export default function AdminPedidos() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getOrders({ status: '', limit: '100' });
        setOrders(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const columns = [
    { key: 'orderNumber', label: 'Pedido' },
    { key: 'customerEmail', label: 'Cliente' },
    { key: 'createdAt', label: 'Fecha', render: (val) => new Date(val).toLocaleDateString('es-CO') },
    { key: 'total', label: 'Total', render: (val) => `$${Number(val).toLocaleString('es-CO')}` },
    {
      key: 'status',
      label: 'Estado',
      render: (val) => {
        const variant =
          val === 'DELIVERED' ? 'success' :
          val === 'CANCELLED' ? 'danger' :
          val === 'SHIPPED' ? 'info' :
          val === 'PROCESSING' ? 'default' :
          'warning';
        const label = val.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
        return <Badge variant={variant} size="sm" mode="admin">{label}</Badge>;
      },
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: () => (
        <button className="text-xs text-sisley-text-secondary hover:text-sisley-text underline">
          Ver detalle
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-light text-sisley-text">Pedidos</h1>
        <p className="text-sm text-sisley-text-secondary mt-1">{orders.length} pedidos registrados</p>
      </div>

      <div className="bg-sisley-white border border-sisley-border">
        <Table columns={columns} data={orders} />
      </div>
    </div>
  );
}