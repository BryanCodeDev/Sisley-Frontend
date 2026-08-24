'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import Skeleton from '@/app/components/Skeleton';
import Breadcrumb from '@/app/components/Breadcrumb';
import EditorialLabel from '@/app/components/EditorialLabel';
import { useCustomerAuth } from '@/app/contexts/CustomerAuthContext';
import { getCart } from '@/app/services/cart';
import { createCheckout } from '@/app/services/checkout';
import { getAddresses, createAddress } from '@/app/services/addresses';
import { CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const router = useRouter();
  const { customer, loading: authLoading, isAuthenticated } = useCustomerAuth();
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressId: null,
    address: '',
    city: '',
    department: '',
    zipCode: '',
    shipping: 'estandar',
    payment: 'card',
    notes: '',
  });

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ address: '', city: '', department: '', zipCode: '' });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCart();
        const items = data.data?.items || [];
        setCartItems(items);
        if (items.length === 0) {
          router.push('/carrito');
          return;
        }
        if (isAuthenticated && customer) {
          setFormData((prev) => ({
            ...prev,
            firstName: customer.firstName || customer.name?.split(' ')[0] || '',
            lastName: customer.lastName || customer.name?.split(' ').slice(1).join(' ') || '',
            email: customer.email || '',
            phone: customer.phone || '',
          }));
          const addrData = await getAddresses({ customerId: customer.id });
          setAddresses(addrData.data || []);
          if (addrData.data?.length > 0) {
            const main = addrData.data.find((a) => a.isMain) || addrData.data[0];
            setFormData((prev) => ({ ...prev, addressId: main.id, address: main.address, city: main.city, department: main.department, zipCode: main.zipCode || '' }));
          }
        }
      } catch (err) {
        if (err.message?.includes('401') || err.message?.includes('No autorizado')) {
          router.push('/login');
          return;
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [isAuthenticated, customer, router]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.unitPrice) * item.quantity, 0);
  const shipping = formData.shipping === 'express' ? 45000 : 25000;
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + shipping + tax;

  const validateStep = () => {
    if (step === 1) {
      const errors = [];
      if (!formData.firstName?.trim()) errors.push('El nombre es requerido');
      if (!formData.lastName?.trim()) errors.push('El apellido es requerido');
      if (!formData.email?.trim()) {
        errors.push('El correo electrónico es requerido');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Ingresa un correo electrónico válido');
      }
      if (!formData.phone?.trim()) {
        errors.push('El teléfono es requerido');
      } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phone)) {
        errors.push('Ingresa un teléfono válido');
      }
      return errors.length ? errors : null;
    }
    if (step === 2) {
      if (!formData.addressId && (!formData.address || !formData.city || !formData.department)) {
        return ['Selecciona una dirección o completa los datos de envío'];
      }
    }
    return null;
  };

  const handleNext = () => {
    const validationErrors = validateStep();
    if (validationErrors) {
      setError(validationErrors.join('. '));
      return;
    }
    setError(null);
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setError(null);
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      let shippingAddressId = formData.addressId;
      if (!shippingAddressId && newAddress.address) {
        const addrResult = await createAddress({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: newAddress.address,
          city: newAddress.city,
          department: newAddress.department,
          zipCode: newAddress.zipCode,
          customerId: customer?.id,
          isMain: addresses.length === 0,
        });
        shippingAddressId = addrResult.data?.id;
      }

      const result = await createCheckout({
        shippingAddressId,
        shippingMethod: formData.shipping,
        paymentMethod: formData.payment,
        notes: formData.notes,
      });

      if (result.success || result.data) {
        setOrderSuccess({
          orderNumber: result.data?.orderNumber || result.data?.id || `ORD-${Date.now().toString().slice(-6)}`,
          email: formData.email,
        });
        setStep(4);
      } else {
        setError(result.message || 'Error al procesar el pedido');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
            <Skeleton className="h-8 w-48 mb-10" />
            <Skeleton className="h-10 w-full mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-64 w-full" />
              </div>
              <div className="lg:sticky lg:top-24 lg:self-start">
                <Skeleton className="h-80 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error && cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-20 text-center">
            <p className="text-sm text-red-600 mb-4">Error: {error}</p>
            <Link href="/carrito"><Button>Volver al carrito</Button></Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (orderSuccess) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
            <div className="max-w-lg mx-auto text-center py-12">
              <CheckCircle2 className="w-16 h-16 mx-auto text-sisley-black mb-6" strokeWidth={1} />
              <h2 className="font-serif display-sm md:display-md text-sisley-text tracking-tighter leading-[0.95] mb-4">
                Pedido confirmado
              </h2>
              <p className="text-sm text-sisley-text-secondary mb-1">
                Número de pedido: <span className="text-sisley-text font-medium">{orderSuccess.orderNumber}</span>
              </p>
              <p className="text-sm text-sisley-muted mb-10">
                Recibirás un correo de confirmación en {orderSuccess.email || 'tu correo'}.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/mis-pedidos"><Button>Ver mis pedidos</Button></Link>
                <Link href="/catalogo"><Button variant="secondary">Seguir comprando</Button></Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const steps = [
    { num: 1, label: 'Información' },
    { num: 2, label: 'Envío' },
    { num: 3, label: 'Pago' },
    { num: 4, label: 'Confirmación' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <Breadcrumb
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Carrito', href: '/carrito' },
              { label: 'Checkout' },
            ]}
          />
          <div className="mb-10 md:mb-14">
            <EditorialLabel number="01" label="Checkout" />
            <h1 className="font-serif display-sm md:display-md text-sisley-text tracking-tighter leading-[0.95]">
              Finalizar compra
            </h1>
          </div>

          <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-16">
            {steps.map((s) => (
              <div key={s.num} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 flex items-center justify-center text-xs border transition-colors ${
                    step >= s.num
                      ? 'border-sisley-black bg-sisley-black text-white'
                      : 'border-sisley-border text-sisley-muted'
                  }`}
                >
                  {s.num}
                </div>
                <span className={`text-[11px] uppercase tracking-widest hidden sm:inline ${step >= s.num ? 'text-sisley-text' : 'text-sisley-muted'}`}>
                  {s.label}
                </span>
                {s.num < 4 && <div className="w-8 h-px bg-sisley-border hidden sm:block" />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
            <div className="lg:col-span-2">
              {error && (
                <div className="mb-6">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="font-serif title-lg text-sisley-text mb-6">Información personal</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Nombre"
                      value={formData.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      required
                    />
                    <Input
                      label="Apellido"
                      value={formData.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      required
                    />
                    <Input
                      label="Correo electrónico"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      required
                    />
                    <Input
                      label="Teléfono"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      required
                    />
                  </div>
                  <div className="pt-4">
                    <Button size="lg" onClick={handleNext}>Continuar</Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="font-serif title-lg text-sisley-text mb-6">Dirección de envío</h2>

                  {isAuthenticated && addresses.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <p className="text-meta uppercase tracking-[0.25em] text-sisley-muted mb-3">Direcciones guardadas</p>
                      {addresses.map((addr) => (
                        <label
                          key={addr.id}
                          className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                            formData.addressId === addr.id
                              ? 'border-sisley-black bg-sisley-smoke'
                              : 'border-sisley-border hover:border-sisley-border-strong'
                          }`}
                        >
                          <input
                            type="radio"
                            name="address"
                            checked={formData.addressId === addr.id}
                            onChange={() => {
                              updateField('addressId', addr.id);
                              updateField('address', addr.address);
                              updateField('city', addr.city);
                              updateField('department', addr.department);
                              updateField('zipCode', addr.zipCode || '');
                            }}
                            className="accent-sisley-black mt-1"
                          />
                          <div>
                            <p className="text-sm text-sisley-text">{addr.address}</p>
                            <p className="text-xs text-sisley-muted">{addr.city}, {addr.department} {addr.zipCode ? `· ${addr.zipCode}` : ''}</p>
                            {addr.isMain && <span className="text-meta uppercase tracking-[0.2em] text-sisley-black mt-1 inline-block">Principal</span>}
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-sisley-border pt-6">
                    <p className="text-sm text-sisley-text mb-4">O ingresa una nueva dirección</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Input
                          label="Dirección"
                          value={newAddress.address}
                          onChange={(e) => setNewAddress((prev) => ({ ...prev, address: e.target.value }))}
                          required={!formData.addressId}
                        />
                      </div>
                      <Input
                        label="Ciudad"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress((prev) => ({ ...prev, city: e.target.value }))}
                        required={!formData.addressId}
                      />
                      <Input
                        label="Departamento"
                        value={newAddress.department}
                        onChange={(e) => setNewAddress((prev) => ({ ...prev, department: e.target.value }))}
                        required={!formData.addressId}
                      />
                      <Input
                        label="Código postal"
                        value={newAddress.zipCode}
                        onChange={(e) => setNewAddress((prev) => ({ ...prev, zipCode: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <p className="text-meta uppercase tracking-[0.25em] text-sisley-muted mb-3">Método de envío</p>
                    <div className="space-y-2">
                      {[
                        { id: 'estandar', label: 'Envío estándar (3-5 días hábiles)', price: 25000 },
                        { id: 'express', label: 'Envío express (1-2 días hábiles)', price: 45000 },
                      ].map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                            formData.shipping === option.id
                              ? 'border-sisley-black bg-sisley-smoke'
                              : 'border-sisley-border hover:border-sisley-border-strong'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              checked={formData.shipping === option.id}
                              onChange={() => updateField('shipping', option.id)}
                              className="accent-sisley-black"
                            />
                            <span className="text-sm text-sisley-text">{option.label}</span>
                          </div>
                          <span className="text-sm text-sisley-text">
                            ${option.price.toLocaleString('es-CO')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <Button variant="secondary" onClick={handleBack}>Volver</Button>
                    <Button onClick={handleNext}>Continuar al pago</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="font-serif title-lg text-sisley-text mb-6">Método de pago</h2>
                  <div className="space-y-2">
                    {[
                      { id: 'card', label: 'Tarjeta de crédito/débito' },
                      { id: 'pse', label: 'PSE' },
                      { id: 'transfer', label: 'Transferencia bancaria' },
                    ].map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
                          formData.payment === option.id
                            ? 'border-sisley-black bg-sisley-smoke'
                            : 'border-sisley-border hover:border-sisley-border-strong'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.payment === option.id}
                          onChange={() => updateField('payment', option.id)}
                          className="accent-sisley-black"
                        />
                        <span className="text-sm text-sisley-text">{option.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Input
                      label="Notas del pedido (opcional)"
                      value={formData.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      placeholder="Instrucciones especiales de entrega..."
                    />
                  </div>

                  <div className="pt-6 border-t border-sisley-border">
                    <p className="text-xs text-sisley-muted mb-4">
                      Esta es una demostración. No se procesará ningún pago real.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="secondary" onClick={handleBack}>Volver</Button>
                      <Button onClick={handleSubmit} disabled={submitting}>
                        {submitting ? 'Procesando...' : 'Confirmar pedido'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {step < 4 && (
              <div>
                <div className="border border-sisley-border p-6 md:p-8">
                  <h2 className="text-meta uppercase tracking-[0.25em] text-sisley-muted mb-6">Resumen del pedido</h2>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-sisley-text-secondary truncate pr-4">
                          {item.productName} x{item.quantity}
                        </span>
                        <span className="text-sisley-text">${(Number(item.unitPrice) * item.quantity).toLocaleString('es-CO')}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 pt-4 border-t border-sisley-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-sisley-text-secondary">Subtotal</span>
                      <span className="text-sisley-text">${subtotal.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-sisley-text-secondary">Envío</span>
                      <span className="text-sisley-text">
                        {shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString('es-CO')}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-sisley-text-secondary">IVA (19%)</span>
                      <span className="text-sisley-text">${tax.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="pt-3 border-t border-sisley-border flex justify-between">
                      <span className="text-sm font-medium text-sisley-text">Total</span>
                      <span className="text-lg font-light text-sisley-text">${total.toLocaleString('es-CO')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
