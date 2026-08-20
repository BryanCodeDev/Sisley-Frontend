'use client';

import { useEffect, useState } from 'react';
import Badge from '@/app/components/Badge';
import Button from '@/app/components/Button';
import Table from '@/app/components/Table';
import { getProducts } from '@/app/services/products';

export default function AdminInventario() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts({ status: 'active', limit: '100' });
        const items = (data.data || []).flatMap((product) =>
          (product.variants || []).map((variant) => ({
            id: variant.id,
            sku: variant.sku,
            name: product.name,
            stock: variant.stock,
            minStock: 1,
            maxStock: 100,
            status: variant.status,
          }))
        );
        setInventory(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const lowStock = inventory.filter((item) => item.stock > 0 && item.stock <= item.minStock).length;
  const outOfStock = inventory.filter((item) => item.stock === 0).length;

  const columns = [
    { key: 'sku', label: 'SKU' },
    { key: 'name', label: 'Producto' },
    { key: 'stock', label: 'Stock', render: (val, row) => (
      <span className={val === 0 ? 'text-red-600 font-medium' : val <= row.minStock ? 'text-yellow-600 font-medium' : ''}>
        {val}
      </span>
    )},
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
      render: () => (
        <Button variant="ghost" size="sm">Actualizar</Button>
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

      {loading && <p className="text-sm text-sisley-muted">Cargando inventario...</p>}
      {error && <p className="text-sm text-red-600">Error: {error}</p>}
      {!loading && !error && (
        <div className="bg-sisley-white border border-sisley-border">
          <Table columns={columns} data={inventory} />
        </div>
      )}
    </div>
  );
}