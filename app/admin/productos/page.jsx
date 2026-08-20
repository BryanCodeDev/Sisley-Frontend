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

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts({ status: 'active', limit: '100' });
        setProducts(data.data || []);
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
    { key: 'name', label: 'Producto' },
    { key: 'sku', label: 'SKU' },
    { key: 'categoryName', label: 'Categoría' },
    { key: 'price', label: 'Precio', render: (val) => `$${Number(val).toLocaleString('es-CO')}` },
    {
      key: 'status',
      label: 'Estado',
      render: (val) => {
        const variant = val === 'active' ? 'success' : val === 'draft' ? 'default' : 'danger';
        return <Badge variant={variant} size="sm">{val}</Badge>;
      },
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (_, row) => (
        <div className="flex gap-2">
          <Link href={`/admin/productos/editar/${row.id}`} className="text-xs text-sisley-gray-600 hover:text-sisley-black underline">
            Editar
          </Link>
          <button className="text-xs text-red-600 hover:text-red-700">Eliminar</button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-light text-sisley-black">Productos</h1>
          <p className="text-sm text-sisley-gray-500 mt-1">{products.length} productos registrados</p>
        </div>
        <Link href="/admin/productos/nuevo">
          <Button>Nuevo producto</Button>
        </Link>
      </div>

      {loading && <p className="text-sm text-sisley-gray-500">Cargando productos...</p>}
      {error && <p className="text-sm text-red-600">Error: {error}</p>}
      {!loading && !error && (
        <div className="bg-sisley-white border border-sisley-gray-200">
          <Table columns={columns} data={products} />
        </div>
      )}
    </div>
  );
}
