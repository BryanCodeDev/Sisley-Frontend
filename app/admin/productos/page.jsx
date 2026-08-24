'use client';

import { useEffect, useState } from 'react';
import Badge from '@/app/components/Badge';
import Button from '@/app/components/Button';
import Table from '@/app/components/Table';
import TableSkeleton from '@/app/components/TableSkeleton';
import { getProducts, deleteProduct } from '@/app/services/products';
import { getCategories } from '@/app/services/categories';
import Link from 'next/link';

function ProductRowSkeleton() {
  return (
    <tr className="border-b border-sisley-gray-100">
      <td className="py-3 px-4">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-sisley-border rounded animate-pulse" />
          <div className="h-3 w-16 bg-sisley-border rounded animate-pulse" />
        </div>
      </td>
      <td className="py-3 px-4"><div className="h-4 w-20 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-4 w-16 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-6 w-16 bg-sisley-border rounded animate-pulse" /></td>
      <td className="py-3 px-4"><div className="h-4 w-12 bg-sisley-border rounded animate-pulse" /></td>
    </tr>
  );
}

export default function AdminProductos() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories({ status: 'all', limit: '100' });
        setCategories(data.data || []);
      } catch {
        setCategories([]);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const params = { limit: '100', search };
        if (statusFilter) params.status = statusFilter;
        if (categoryFilter) params.category = categoryFilter;
        const data = await getProducts(params);
        setProducts(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search, statusFilter, categoryFilter, retry]);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setDeleteConfirm(null);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Producto',
      render: (val, row) => (
        <div>
          <p className="text-sm text-sisley-text font-medium">{val}</p>
          <p className="text-xs text-sisley-muted">{row.sku || row.id}</p>
        </div>
      ),
    },
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
          <button
            onClick={() => setDeleteConfirm(row)}
            className="text-xs text-red-600 hover:text-red-700"
          >
            Eliminar
          </button>
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
        <div className="p-4 border-b border-sisley-border flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 w-full sm:w-auto text-sm bg-transparent border border-sisley-border px-3 py-2 focus:outline-none focus:border-sisley-text"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto text-sm bg-transparent border border-sisley-border px-3 py-2 focus:outline-none focus:border-sisley-text"
          >
            <option value="">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
            <option value="draft">Borradores</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto text-sm bg-transparent border border-sisley-border px-3 py-2 focus:outline-none focus:border-sisley-text"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <TableSkeleton columns={columns.length} rows={5} />
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-sm text-red-600 mb-4">Error: {error}</p>
            <Button variant="secondary" size="sm" onClick={() => setRetry((r) => r + 1)}>Reintentar</Button>
          </div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center text-sisley-muted">
            <p className="text-sm">No hay productos para mostrar</p>
          </div>
        ) : (
          <Table columns={columns} data={products} />
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-sisley-white border border-sisley-border w-full max-w-sm p-6">
            <h3 className="text-lg font-light text-sisley-text mb-2">Eliminar producto</h3>
            <p className="text-sm text-sisley-text-secondary mb-6">
              ¿Estás seguro de eliminar <span className="font-medium">{deleteConfirm.name}</span>? Esta acción marcará el producto como inactivo.
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button variant="secondary" type="button" onClick={() => setDeleteConfirm(null)}>Cancelar</Button>
              <Button variant="ghost" type="button" onClick={() => handleDelete(deleteConfirm.id)} className="!text-red-600 hover:!text-red-700">
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}