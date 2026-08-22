'use client';

import { useEffect, useState } from 'react';
import Badge from '@/app/components/Badge';
import Button from '@/app/components/Button';
import Table from '@/app/components/Table';
import { getOrders, getOrder, updateOrderStatus } from '@/app/services/orders';

function OrderDetailModal({ order, onClose, onStatusChange }) {
  const [status, setStatus] = useState(order?.status || '');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus(order?.status || '');
  }, [order]);

  if (!order) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await updateOrderStatus(order.id, status, notes);
      onStatusChange();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-sisley-white border border-sisley-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-sisley-border flex items-center justify-between">
          <h3 className="text-lg font-light text-sisley-text">Pedido {order.orderNumber || order.id}</h3>
          <button onClick={onClose} className="p-2 text-sisley-text-secondary hover:text-sisley-text transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-1">Cliente</p>
              <p className="text-sm text-sisley-text">{order.customerEmail || order.customerFirstName ? `${order.customerFirstName || ''} ${order.customerLastName || ''}`.trim() || order.customerEmail || 'N/A' : 'N/A'}</p>
              {order.customerPhone && <p className="text-xs text-sisley-muted">{order.customerPhone}</p>}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-1">Fecha</p>
              <p className="text-sm text-sisley-text">{order.createdAt ? new Date(order.createdAt).toLocaleDateString('es-CO') : 'N/A'}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-1">Total</p>
              <p className="text-sm text-sisley-text">${Number(order.total || 0).toLocaleString('es-CO')}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-1">Método de pago</p>
              <p className="text-sm text-sisley-text capitalize">{(order.paymentMethod || '—').replace(/_/g, ' ')}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-1">Dirección de envío</p>
              <p className="text-sm text-sisley-text">
                {[order.shippingAddress, order.shippingCity, order.shippingDepartment].filter(Boolean).join(', ') || '—'}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-1">Estado actual</p>
              <Badge
                variant={
                  order.status === 'DELIVERED' ? 'success' :
                  order.status === 'CANCELLED' ? 'danger' :
                  order.status === 'SHIPPED' ? 'info' :
                  order.status === 'PROCESSING' ? 'default' :
                  'warning'
                }
                size="sm"
                mode="admin"
              >
                {order.status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </Badge>
            </div>
          </div>

          {(order.items || []).length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Productos</p>
              <div className="border border-sisley-border divide-y divide-sisley-border">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 px-3">
                    <p className="text-sm text-sisley-text">{item.productName || item.variantSku || `Item ${idx + 1}`}</p>
                    <p className="text-sm text-sisley-text">x{item.quantity || 1} — ${Number(item.unitPrice || item.total || 0).toLocaleString('es-CO')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(order.statusHistory || []).length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Historial de estados</p>
              <div className="border border-sisley-border divide-y divide-sisley-border">
                {order.statusHistory.slice(0, 10).map((h) => (
                  <div key={h.id} className="flex items-center justify-between py-2 px-3">
                    <div>
                      <p className="text-sm text-sisley-text">{h.status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</p>
                      {h.notes && <p className="text-xs text-sisley-muted">{h.notes}</p>}
                    </div>
                    <p className="text-xs text-sisley-muted">{h.createdAt ? new Date(h.createdAt).toLocaleString('es-CO') : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-sisley-border">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-2">
                Cambiar estado
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-sisley-white border border-sisley-border focus:outline-none focus:border-sisley-black focus:ring-1 focus:ring-sisley-black"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-2">
                Notas
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Notas adicionales..."
                className="w-full px-4 py-3 text-sm bg-sisley-white border border-sisley-border focus:outline-none focus:border-sisley-black focus:ring-1 focus:ring-sisley-black resize-none"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex items-center justify-end gap-3">
              <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
              <Button type="submit" disabled={loading || status === order.status}>
                {loading ? 'Guardando...' : 'Cambiar estado'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function OrderRowSkeleton() {
  return (
    <tr className="border-b border-sisley-gray-100">
      <td className="py-3 px-4"><div className="h-4 w-20 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-4 w-32 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-4 w-20 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-4 w-16 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-6 w-16 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-4 w-16 bg-sisley-border rounded animate-pulse" /></td>
    </tr>
  );
}

export default function AdminPedidos() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getOrders({ status: statusFilter, search, page: String(page), limit: '10' });
        setOrders(data.data || []);
        setPagination({
          page: data.pagination?.page || 1,
          totalPages: data.pagination?.totalPages || 1,
          total: data.pagination?.total || 0,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [statusFilter, search, page, retry]);

  const handleViewDetail = async (order) => {
    setSelectedOrder(order);
    setDetailLoading(true);
    try {
      const data = await getOrder(order.id);
      setOrderDetail(data.data);
    } catch {
      setOrderDetail(order);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleStatusChange = () => {
    setPage(1);
    setOrderDetail(null);
    setSelectedOrder(null);
  };

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
      render: (_, row) => (
        <button
          onClick={() => handleViewDetail(row)}
          className="text-xs text-sisley-text-secondary hover:text-sisley-text underline"
        >
          Ver detalle
        </button>
      ),
    },
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'PROCESSING', label: 'Procesando' },
    { value: 'SHIPPED', label: 'Enviado' },
    { value: 'DELIVERED', label: 'Entregado' },
    { value: 'CANCELLED', label: 'Cancelado' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-light text-sisley-text">Pedidos</h1>
        <p className="text-sm text-sisley-text-secondary mt-1">{pagination.total} pedidos registrados</p>
      </div>

      <div className="bg-sisley-white border border-sisley-border mb-6">
        <div className="p-4 border-b border-sisley-border flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input
            type="text"
            placeholder="Buscar por número o cliente..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="flex-1 w-full sm:w-auto text-sm bg-transparent border border-sisley-border px-3 py-2 focus:outline-none focus:border-sisley-text"
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="w-full sm:w-auto text-sm bg-transparent border border-sisley-border px-3 py-2 focus:outline-none focus:border-sisley-text"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="p-4">
            <div className="space-y-0">
              {[1, 2, 3, 4, 5].map((i) => <OrderRowSkeleton key={i} />)}
            </div>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-sm text-red-600 mb-4">Error: {error}</p>
            <Button variant="secondary" size="sm" onClick={() => setRetry((r) => r + 1)}>Reintentar</Button>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-12 text-center text-sisley-muted">
            <p className="text-sm">No hay pedidos para mostrar</p>
          </div>
        ) : (
          <Table columns={columns} data={orders} />
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-sisley-muted">
            Página {pagination.page} de {pagination.totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      {selectedOrder && (
        <OrderDetailModal
          order={orderDetail || selectedOrder}
          onClose={() => { setSelectedOrder(null); setOrderDetail(null); }}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}