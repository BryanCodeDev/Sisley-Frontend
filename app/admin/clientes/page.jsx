'use client';

import { useEffect, useState } from 'react';
import Badge from '@/app/components/Badge';
import Table from '@/app/components/Table';
import { getCustomers } from '@/app/services/customers';

export default function AdminClientes() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCustomers({ status: 'active', limit: '100' });
        setCustomers(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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
        <h1 className="text-2xl font-light text-sisley-text">Clientes</h1>
        <p className="text-sm text-sisley-text-secondary mt-1">{customers.length} clientes registrados</p>
      </div>

      {loading && <p className="text-sm text-sisley-muted">Cargando clientes...</p>}
      {error && <p className="text-sm text-red-600">Error: {error}</p>}
      {!loading && !error && (
        <div className="bg-sisley-white border border-sisley-border">
          <Table columns={columns} data={customers} />
        </div>
      )}
    </div>
  );
}