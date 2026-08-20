'use client';

import Badge from '@/app/components/Badge';
import Table from '@/app/components/Table';
import { invoices } from '@/data/invoices';

export default function AdminFacturacion() {
  const columns = [
    { key: 'id', label: 'Factura' },
    { key: 'orderId', label: 'Pedido' },
    { key: 'customer', label: 'Cliente' },
    { key: 'date', label: 'Fecha' },
    { key: 'subtotal', label: 'Subtotal', render: (val) => `$${val.toLocaleString('es-CO')}` },
    { key: 'tax', label: 'IVA', render: (val) => `$${val.toLocaleString('es-CO')}` },
    { key: 'total', label: 'Total', render: (val) => `$${val.toLocaleString('es-CO')}` },
    {
      key: 'status',
      label: 'Estado',
      render: (val) => {
        const variant = val === 'Pagada' ? 'success' : val === 'Reembolsada' ? 'danger' : 'warning';
        return <Badge variant={variant} size="sm">{val}</Badge>;
      },
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: () => (
        <button className="text-xs text-sisley-gray-600 hover:text-sisley-black underline">
          Descargar PDF
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-light text-sisley-black">Facturación</h1>
        <p className="text-sm text-sisley-gray-500 mt-1">{invoices.length} facturas generadas</p>
      </div>

      <div className="bg-sisley-white border border-sisley-gray-200">
        <Table columns={columns} data={invoices} />
      </div>
    </div>
  );
}
