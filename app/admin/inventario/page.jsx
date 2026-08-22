'use client';

import { useEffect, useState } from 'react';
import Badge from '@/app/components/Badge';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import Table from '@/app/components/Table';
import TableSkeleton from '@/app/components/TableSkeleton';
import { getInventoryFromProducts, adjustInventory } from '@/app/services/inventory';

function AdjustStockModal({ item, onClose, onAdjusted }) {
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('adjustment');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!item) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await adjustInventory(item.id, {
        quantity: Number(quantity),
        type,
        reason,
      });
      onAdjusted();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-sisley-white border border-sisley-border w-full max-w-md">
        <div className="p-6 border-b border-sisley-border flex items-center justify-between">
          <h3 className="text-lg font-light text-sisley-text">Ajustar stock</h3>
          <button onClick={onClose} className="p-2 text-sisley-text-secondary hover:text-sisley-text transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-sisley-bg border border-sisley-border p-3">
            <p className="text-sm font-medium text-sisley-text">{item.name}</p>
            <p className="text-xs text-sisley-muted">SKU: {item.sku} | Stock actual: {item.stock}</p>
          </div>

          <Input
            label="Cantidad"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Ingrese cantidad (+ o -)"
            required
          />

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-2">
              Tipo de movimiento
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-sisley-white border border-sisley-border focus:outline-none focus:border-sisley-black focus:ring-1 focus:ring-sisley-black"
            >
              <option value="in">Entrada (in)</option>
              <option value="out">Salida (out)</option>
              <option value="adjustment">Ajuste (adjustment)</option>
            </select>
          </div>

          <Input
            label="Motivo"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Motivo del ajuste"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={loading || !quantity}>
              {loading ? 'Guardando...' : 'Guardar ajuste'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InventoryRowSkeleton() {
  return (
    <tr className="border-b border-sisley-gray-100">
      <td className="py-3 px-4"><div className="h-4 w-20 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-4 w-32 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-4 w-16 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-4 w-12 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-4 w-10 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-4 w-10 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-6 w-16 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-6 w-20 bg-sisley-border rounded animate-pulse" /></td>
    </tr>
  );
}

export default function AdminInventario() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [lowStock, setLowStock] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);

  const loadInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getInventoryFromProducts({ limit: '100' });
      const items = (data.data || []).map((item) => ({
        ...item,
        minStock: item.minStock || 10,
      }));
      setInventory(items);
      setLowStock(items.filter((item) => item.stock > 0 && item.stock <= item.minStock).length);
      setOutOfStock(items.filter((item) => item.stock === 0).length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const columns = [
    { key: 'sku', label: 'SKU' },
    { key: 'name', label: 'Producto' },
    { key: 'color', label: 'Color', render: (val) => val || '—' },
    { key: 'size', label: 'Talla', render: (val) => val || '—' },
    {
      key: 'stock',
      label: 'Stock',
      render: (val, row) => (
        <span className={val === 0 ? 'text-red-600 font-medium' : val <= row.minStock ? 'text-yellow-600 font-medium' : ''}>
          {val}
        </span>
      ),
    },
    { key: 'minStock', label: 'Mínimo' },
    {
      key: 'status',
      label: 'Estado',
      render: (val, row) => {
        if (row.stock === 0) return <Badge variant="danger" size="sm" mode="admin">Agotado</Badge>;
        if (row.stock <= row.minStock) return <Badge variant="warning" size="sm" mode="admin">Bajo</Badge>;
        return <Badge variant="success" size="sm" mode="admin">Normal</Badge>;
      },
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (_, row) => (
        <Button variant="ghost" size="sm" onClick={() => setSelectedItem(row)}>
          Ajustar stock
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-light text-sisley-text">Inventario</h1>
          <p className="text-sm text-sisley-text-secondary mt-1">{inventory.length} variantes en bodega</p>
        </div>
        <div className="flex gap-3">
          <Badge variant="danger" size="md" mode="admin">{outOfStock} agotados</Badge>
          <Badge variant="warning" size="md" mode="admin">{lowStock} stock bajo</Badge>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <TableSkeleton columns={8} rows={8} />
      ) : inventory.length === 0 ? (
        <div className="bg-sisley-white border border-sisley-border py-12 text-center text-sisley-muted">
          <p className="text-sm">No hay variantes de inventario para mostrar</p>
        </div>
      ) : (
        <div className="bg-sisley-white border border-sisley-border">
          <Table columns={columns} data={inventory} />
        </div>
      )}

      {selectedItem && (
        <AdjustStockModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAdjusted={loadInventory}
        />
      )}
    </div>
  );
}