'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import Badge from '@/app/components/Badge';
import Skeleton from '@/app/components/Skeleton';
import EditorialLabel from '@/app/components/EditorialLabel';
import ScrollReveal from '@/app/components/ScrollReveal';
import { useCustomerAuth } from '@/app/contexts/CustomerAuthContext';
import { getOrders } from '@/app/services/orders';
import { getAddresses } from '@/app/services/addresses';
import { updateCustomer } from '@/app/services/customers';
import { User, MapPin, ClipboardList, Heart, LogOut, ChevronRight } from 'lucide-react';

export default function MiCuenta() {
  const router = useRouter();
  const { customer, loading: authLoading, isAuthenticated, logout } = useCustomerAuth();
  const [activeTab, setActiveTab] = useState('perfil');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [saving, setSaving] = useState(false);

  const [profileData, setProfileData] = useState({ firstName: '', lastName: '', email: '', phone: '' });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }
    if (customer) {
      setProfileData({
        firstName: customer.firstName || customer.name?.split(' ')[0] || '',
        lastName: customer.lastName || customer.name?.split(' ').slice(1).join(' ') || '',
        email: customer.email || '',
        phone: customer.phone || '',
      });
    }
  }, [isAuthenticated, authLoading, customer, router]);

  useEffect(() => {
    async function loadData() {
      if (!customer?.id) return;
      try {
        setLoading(true);
        setError(null);
        const [ordersData, addressesData] = await Promise.all([
          getOrders({ customerId: customer.id }),
          getAddresses({ customerId: customer.id }),
        ]);
        setOrders(ordersData.data || []);
        setAddresses(addressesData.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [customer?.id]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateCustomer(customer.id, profileData);
      alert('Perfil actualizado correctamente');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (authLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
            <Skeleton className="h-8 w-48 mb-10" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'direcciones', label: 'Direcciones', icon: MapPin },
    { id: 'pedidos', label: 'Pedidos', icon: ClipboardList },
    { id: 'favoritos', label: 'Favoritos', icon: Heart },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="mb-10 md:mb-14">
            <EditorialLabel number="01" label="Cuenta" />
            <h1 className="font-serif display-sm md:display-md text-sisley-text tracking-tighter leading-[0.95]">
              Mi cuenta
            </h1>
          </div>

          {error && (
            <div className="mb-6">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="lg:col-span-1">
              <div className="border border-sisley-border p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-sisley-smoke flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-sisley-text" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-sisley-text">{customer?.name || profileData.firstName + ' ' + profileData.lastName}</p>
                    <p className="text-xs text-sisley-muted mt-1">{customer?.email || profileData.email}</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="w-full" onClick={handleLogout}>
                  <span className="inline-flex items-center justify-center gap-2">
                    <LogOut className="w-4 h-4" strokeWidth={1.5} />
                    Cerrar sesión
                  </span>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex border-b border-sisley-border mb-8 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-b-2 border-sisley-black text-sisley-text'
                          : 'text-sisley-muted hover:text-sisley-text'
                      }`}
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-64 w-full" />
                </div>
              ) : (
                <>
                  {activeTab === 'perfil' && (
                    <ScrollReveal animation="reveal-up">
                      <div className="max-w-2xl">
                        <h2 className="font-serif title-lg text-sisley-text mb-6">Información personal</h2>
                        <form className="space-y-5" onSubmit={handleSaveProfile}>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                              label="Nombre"
                              value={profileData.firstName}
                              onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                            />
                            <Input
                              label="Apellido"
                              value={profileData.lastName}
                              onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                            />
                          </div>
                          <Input
                            label="Correo electrónico"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                          />
                          <Input
                            label="Teléfono"
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                          />
                          <div className="pt-4">
                            <Button type="submit" disabled={saving}>
                              {saving ? 'Guardando...' : 'Guardar cambios'}
                            </Button>
                          </div>
                        </form>
                      </div>
                    </ScrollReveal>
                  )}

                  {activeTab === 'direcciones' && (
                    <ScrollReveal animation="reveal-up">
                      <div>
                        <h2 className="font-serif title-lg text-sisley-text mb-6">Direcciones</h2>
                        {addresses.length === 0 ? (
                          <p className="text-sm text-sisley-muted">No tienes direcciones guardadas.</p>
                        ) : (
                          <div className="border border-sisley-border divide-y divide-sisley-border">
                            {addresses.map((addr) => (
                              <div key={addr.id} className="p-6 hover:bg-sisley-smoke transition-colors">
                                <p className="text-sm font-medium text-sisley-text">{addr.address}</p>
                                <p className="text-sm text-sisley-text-secondary">{addr.city}, {addr.department}</p>
                                <p className="text-xs text-sisley-muted">{addr.zipCode || ''}</p>
                                {addr.isMain && <Badge variant="success" size="sm" className="mt-2">Principal</Badge>}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </ScrollReveal>
                  )}

                  {activeTab === 'pedidos' && (
                    <ScrollReveal animation="reveal-up">
                      <div>
                        <h2 className="font-serif title-lg text-sisley-text mb-6">Mis pedidos</h2>
                        {orders.length === 0 ? (
                          <p className="text-sm text-sisley-muted">Aún no tienes pedidos.</p>
                        ) : (
                          <div className="border border-sisley-border divide-y divide-sisley-border">
                            {orders.map((order) => (
                              <div key={order.id} className="p-6 hover:bg-sisley-smoke transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <p className="text-sm font-medium text-sisley-text">{order.id}</p>
                                    <p className="text-xs text-sisley-muted">{order.date}</p>
                                  </div>
                                  <Badge
                                    variant={
                                      order.status === 'Entregado'
                                        ? 'success'
                                        : order.status === 'Cancelado'
                                        ? 'danger'
                                        : 'info'
                                    }
                                    size="sm"
                                  >
                                    {order.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-sisley-text-secondary mb-1">
                                  {order.items?.map((i) => i.name).join(', ') || ''}
                                </p>
                                <p className="text-sm text-sisley-text">${Number(order.total).toLocaleString('es-CO')}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </ScrollReveal>
                  )}

                  {activeTab === 'favoritos' && (
                    <ScrollReveal animation="reveal-up">
                      <div>
                        <h2 className="font-serif title-lg text-sisley-text mb-6">Favoritos</h2>
                        <p className="text-sm text-sisley-muted">Aún no has agregado productos a favoritos.</p>
                      </div>
                    </ScrollReveal>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
