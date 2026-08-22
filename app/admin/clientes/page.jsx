'use client';

import { useEffect, useState } from 'react';
import Badge from '@/app/components/Badge';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import Table from '@/app/components/Table';
import TableSkeleton from '@/app/components/TableSkeleton';
import { getCustomers, getCustomer, updateCustomer } from '@/app/services/customers';
import { getOrders } from '@/app/services/orders';

function CustomerDetailModal({ customer, onClose, onUpdated }) {
  const [form, setForm] = useState({ status: customer?.status || 'active', notes: customer?.notes || '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (customer) {
      setForm({ status: customer.status || 'active', notes: customer.notes || '' });
      setOrdersLoading(true);
      getOrders({ customerId: customer.id, limit: '10' })
        .then((data) => setOrders(data.data || []))
        .catch(() => setOrders([]))
        .finally(() => setOrdersLoading(false));
    }
  }, [customer]);

  if (!customer) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await updateCustomer(customer.id, form);
      onUpdated();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const orderColumns = [
    { key: 'orderNumber', label: 'Pedido' },
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
        return <Badge variant={variant} size="sm" mode="admin">{val.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</Badge>;
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-sisley-white border border-sisley-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-sisley-border flex items-center justify-between">
          <h3 className="text-lg font-light text-sisley-text">Detalle del cliente</h3>
          <button onClick={onClose} className="p-2 text-sisley-text-secondary hover:text-sisley-text transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-1">Nombre</p>
              <p className="text-sm text-sisley-text">{customer.firstName} {customer.lastName}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-1">Correo</p>
              <p className="text-sm text-sisley-text">{customer.email}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-1">Teléfono</p>
              <p className="text-sm text-sisley-text">{customer.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-1">Registro</p>
              <p className="text-sm text-sisley-text">{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString('es-CO') : 'N/A'}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-sisley-border">
            <h4 className="text-[11px] uppercase tracking-widest text-sisley-muted">Editar información</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-2">
                  Estado
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-4 py-3 text-sm bg-sisley-white border border-sisley-border focus:outline-none focus:border-sisley-black focus:ring-1 focus:ring-sisley-black"
                >
                  <option value="active">Activo</option>
                  <option value="blocked">Bloqueado</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-2">
                  Notas
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  placeholder="Notas adicionales..."
                  className="w-full px-4 py-3 text-sm bg-sisley-white border border-sisley-border focus:outline-none focus:border-sisley-black focus:ring-1 focus:ring-sisley-black resize-none"
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex items-center justify-end gap-3">
              <Button variant="secondary" type="button" onClick={onClose}>Cerrar</Button>
              <Button type="submit" disabled={loading}>Guardar cambios</Button>
            </div>
          </form>

          <div className="pt-4 border-t border-sisley-border">
            <h4 className="text-[11px] uppercase tracking-widest text-sisley-muted mb-4">Pedidos recientes</h4>
            {ordersLoading ? (
              <p className="text-sm text-sisley-muted">Cargando pedidos...</p>
            ) : orders.length === 0 ? (
              <p className="text-sm text-sisley-muted">Sin pedidos registrados</p>
            ) : (
              <Table columns={orderColumns} data={orders} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerRowSkeleton() {
  return (
    <tr className="border-b border-sisley-gray-100">
      <td className="py-3 px-4"><div className="h-4 w-32 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-4 w-40 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-4 w-24 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-6 w-16 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-4 w-16 bg-sisley-border rounded animate-pulse" /></td>
    </tr>
  );
}

export default function AdminClientes() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCustomers({ status: '', limit: '100' });
        setCustomers(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [retry]);

  const handleUpdated = () => {
    getCustomers({ status: '', limit: '100' })
      .then((data) => setCustomers(data.data || []))
      .catch(() => {});
  };

  const columns = [
    { key: 'firstName', label: 'Nombre', render: (val, row) => `${val} ${row.lastName}` },
    { key: 'email', label: 'Correo' },
    { key: 'phone', label: 'Teléfono' },
    {
      key: 'status',
      label: 'Estado',
      render: (val) => {
        const variant = val === 'active' ? 'success' : val === 'blocked' ? 'danger' : 'default';
        return <Badge variant={variant} size="sm" mode="admin">{val}</Badge>;
      },
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (_, row) => (
        <button
          onClick={() => setSelectedCustomer(row)}
          className="text-xs text-sisley-text-secondary hover:text-sisley-text underline"
        >
          Ver detalle
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-light text-sisley-text">Clientes</h1>
        <p className="text-sm text-sisley-text-secondary mt-1">{customers.length} clientes registrados</p>
      </div>

      {loading ? (
        <TableSkeleton columns={5} rows={5} />
      ) : error ? (
        <div className="bg-sisley-white border border-sisley-border p-8 text-center">
          <p className="text-sm text-red-600 mb-4">Error: {error}</p>
          <Button variant="secondary" size="sm" onClick={() => setRetry((r) => r + 1)}>Reintentar</Button>
        </div>
      ) : customers.length === 0 ? (
        <div className="bg-sisley-white border border-sisley-border py-12 text-center text-sisley-muted">
          <p className="text-sm">No hay clientes para mostrar</p>
        </div>
      ) : (
        <div className="bg-sisley-white border border-sisley-border">
          <Table columns={columns} data={customers} />
        </div>
      )}

      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}