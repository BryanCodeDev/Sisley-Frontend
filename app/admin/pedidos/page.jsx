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
    { key: 'id', label: 'ID' },
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
        return <Badge variant={variant} size="sm">{label}</Badge>;
      },
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: () => (
        <button className="text-xs text-sisley-gray-600 hover:text-sisley-black underline">
          Ver detalle
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-light text-sisley-black">Pedidos</h1>
        <p className="text-sm text-sisley-gray-500 mt-1">{orders.length} pedidos registrados</p>
      </div>

      {loading && <p className="text-sm text-sisley-gray-500">Cargando pedidos...</p>}
      {error && <p className="text-sm text-red-600">Error: {error}</p>}
      {!loading && !error && (
        <div className="bg-sisley-white border border-sisley-gray-200">
          <Table columns={columns} data={orders} />
        </div>
      )}
    </div>
  );
}
