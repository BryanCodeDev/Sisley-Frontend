'use client';

import { useEffect, useState } from 'react';
import Badge from '@/app/components/Badge';
import Button from '@/app/components/Button';
import Table from '@/app/components/Table';
import { getProducts } from '@/app/services/products';
import Link from 'next/link';

export default function AdminProductos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts({ status: 'active', limit: '100', search });
        setProducts(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search]);

  const columns = [
    { key: 'name', label: 'Producto', render: (val, row) => (
      <div>
        <p className="text-sm text-sisley-text font-medium">{val}</p>
        <p className="text-xs text-sisley-muted">{row.sku || row.id}</p>
      </div>
    )},
    { key: 'categoryName', label: 'Categoría' },
    { key: 'price', label: 'Precio', render: (val) => `$${Number(val).toLocaleString('es-CO')}` },
    {
      key: 'status',
      label: 'Estado',
      render: (val) => {
        const variant = val === 'active' ? 'success' : val === 'draft' ? 'default' : 'danger';
        return <Badge variant={variant} size="sm" mode="admin">{val}</Badge>;
      },
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <Link href={`/admin/productos/editar/${row.id}`} className="text-xs text-sisley-text-secondary hover:text-sisley-text underline">
            Editar
          </Link>
          <button className="text-xs text-red-600 hover:text-red-700">Eliminar</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-light text-sisley-text">Productos</h1>
          <p className="text-sm text-sisley-text-secondary mt-1">{products.length} productos registrados</p>
        </div>
        <Link href="/admin/productos/nuevo">
          <Button>+ Nuevo producto</Button>
        </Link>
      </div>

      <div className="bg-sisley-white border border-sisley-border mb-6">
        <div className="p-4 border-b border-sisley-border flex items-center gap-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm bg-transparent border border-sisley-border px-3 py-2 focus:outline-none focus:border-sisley-text"
          />
          <Button variant="secondary" size="sm">Filtrar</Button>
        </div>
        <Table columns={columns} data={products} />
      </div>
    </div>
  );
}