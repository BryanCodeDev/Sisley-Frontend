'use client';

import { useEffect, useState } from 'react';
import Badge from '@/app/components/Badge';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import Table from '@/app/components/Table';
import { getUsers, getUser, createUser } from '@/app/services/users';
import { getRoles } from '@/app/services/auth';

function UserDetailModal({ user, roles, onClose, onUpdated }) {
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    roleId: user?.roleId || '',
    phone: user?.phone || '',
    status: user?.status || 'active',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState(user?.id ? 'edit' : 'create');

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        roleId: user.roleId || '',
        phone: user.phone || '',
        status: user.status || 'active',
        password: '',
      });
      setMode('edit');
    } else {
      setMode('create');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = { ...form };
      if (mode === 'create' && !payload.password) {
        throw new Error('La contraseña es requerida');
      }
      if (mode === 'create') {
        await createUser(payload);
      } else {
        if (!payload.password) delete payload.password;
        await createUser(payload);
      }
      onUpdated();
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
      <div className="relative bg-sisley-white border border-sisley-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-sisley-border flex items-center justify-between">
          <h3 className="text-lg font-light text-sisley-text">{mode === 'create' ? 'Nuevo usuario' : 'Editar usuario'}</h3>
          <button onClick={onClose} className="p-2 text-sisley-text-secondary hover:text-sisley-text transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-2">Nombre</label>
              <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-2">Apellido</label>
              <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
            </div>
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-2">Correo</label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-2">
              {mode === 'create' ? 'Contraseña' : 'Contraseña (dejar en blanco para mantener)'}
            </label>
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required={mode === 'create'} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-2">Rol</label>
              <select
                value={form.roleId}
                onChange={(e) => setForm({ ...form, roleId: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-sisley-white border border-sisley-border focus:outline-none focus:border-sisley-black focus:ring-1 focus:ring-sisley-black"
              >
                <option value="">Seleccionar</option>
                {roles?.map((role) => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-2">Estado</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-sisley-white border border-sisley-border focus:outline-none focus:border-sisley-black focus:ring-1 focus:ring-sisley-black"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="blocked">Bloqueado</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-sisley-text-secondary mb-2">Teléfono</label>
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function UserRowSkeleton() {
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

export default function AdminUsuarios() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [usersRes, rolesRes] = await Promise.all([
          getUsers({ status: '', limit: '100' }),
          getRoles().catch(() => ({ data: [] })),
        ]);
        setUsers(usersRes.data || []);
        setRoles(rolesRes.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [retry]);

  const handleUpdated = () => {
    getUsers({ status: '', limit: '100' })
      .then((data) => setUsers(data.data || []))
      .catch(() => {});
  };

  const columns = [
    { key: 'firstName', label: 'Nombre', render: (val, row) => `${val} ${row.lastName}` },
    { key: 'email', label: 'Correo' },
    { key: 'roleName', label: 'Rol' },
    {
      key: 'status',
      label: 'Estado',
      render: (val) => {
        const variant = val === 'active' ? 'success' : val === 'blocked' ? 'danger' : 'default';
        return <Badge variant={variant} size="sm" mode="admin">{val}</Badge>;
      },
    },
    {
      key: 'createdAt',
      label: 'Registro',
      render: (val) => (val ? new Date(val).toLocaleDateString('es-CO') : '—'),
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (_, row) => (
        <button
          onClick={() => setSelectedUser(row)}
          className="text-xs text-sisley-text-secondary hover:text-sisley-text underline"
        >
          Editar
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-sisley-text">Usuarios</h1>
          <p className="text-sm text-sisley-text-secondary mt-1">{users.length} usuarios registrados</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setSelectedUser({})}>Nuevo usuario</Button>
      </div>

      {loading ? (
        <div className="bg-sisley-white border border-sisley-border">
          <div className="p-4">
            <div className="space-y-0">
              {[1, 2, 3, 4, 5].map((i) => <UserRowSkeleton key={i} />)}
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-sisley-white border border-sisley-border p-8 text-center">
          <p className="text-sm text-red-600 mb-4">Error: {error}</p>
          <Button variant="secondary" size="sm" onClick={() => setRetry((r) => r + 1)}>Reintentar</Button>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-sisley-white border border-sisley-border py-12 text-center text-sisley-muted">
          <p className="text-sm">No hay usuarios para mostrar</p>
        </div>
      ) : (
        <div className="bg-sisley-white border border-sisley-border">
          <Table columns={columns} data={users} />
        </div>
      )}

      {selectedUser !== null && (
        <UserDetailModal
          user={selectedUser}
          roles={roles}
          onClose={() => setSelectedUser(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}
