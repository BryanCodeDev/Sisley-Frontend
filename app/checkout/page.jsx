'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { orders } from '@/data/orders';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    department: '',
    zipCode: '',
    shipping: 'estandar',
    payment: 'card',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const subtotal = 810000;
  const shipping = formData.shipping === 'express' ? 45000 : 25000;
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl font-light text-sisley-black mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 flex items-center justify-center text-xs ${
                        step >= s ? 'bg-sisley-black text-white' : 'bg-sisley-gray-200 text-sisley-gray-500'
                      }`}
                    >
                      {s}
                    </div>
                    <span className="text-xs uppercase tracking-widest text-sisley-gray-500 hidden sm:inline">
                      {s === 1 ? 'Envío' : s === 2 ? 'Pago' : 'Confirmación'}
                    </span>
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-light text-sisley-black mb-4">Información de envío</h2>
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
                    <div className="sm:col-span-2">
                      <Input
                        label="Dirección"
                        value={formData.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        required
                      />
                    </div>
                    <Input
                      label="Ciudad"
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      required
                    />
                    <Input
                      label="Departamento"
                      value={formData.department}
                      onChange={(e) => updateField('department', e.target.value)}
                      required
                    />
                    <Input
                      label="Código postal"
                      value={formData.zipCode}
                      onChange={(e) => updateField('zipCode', e.target.value)}
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-3">Método de envío</h3>
                    <div className="space-y-2">
                      {[
                        { id: 'estandar', label: 'Envío estándar (3-5 días hábiles)', price: 25000 },
                        { id: 'express', label: 'Envío express (1-2 días hábiles)', price: 45000 },
                      ].map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                            formData.shipping === option.id
                              ? 'border-sisley-black bg-sisley-gray-50'
                              : 'border-sisley-gray-200 hover:border-sisley-gray-400'
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
                            <span className="text-sm text-sisley-gray-700">{option.label}</span>
                          </div>
                          <span className="text-sm text-sisley-black">
                            ${option.price.toLocaleString('es-CO')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button size="lg" onClick={() => setStep(2)}>
                      Continuar al pago
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-light text-sisley-black mb-4">Método de pago</h2>
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
                            ? 'border-sisley-black bg-sisley-gray-50'
                            : 'border-sisley-gray-200 hover:border-sisley-gray-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.payment === option.id}
                          onChange={() => updateField('payment', option.id)}
                          className="accent-sisley-black"
                        />
                        <span className="text-sm text-sisley-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-sisley-gray-200">
                    <p className="text-xs text-sisley-gray-400 mb-4">
                      Esta es una demostración. No se procesará ningún pago real.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="secondary" onClick={() => setStep(1)}>
                        Volver
                      </Button>
                      <Button onClick={() => setStep(3)}>Confirmar pedido</Button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-sisley-black mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                  </svg>
                  <h2 className="text-2xl font-light text-sisley-black mb-2">¡Pedido confirmado!</h2>
                  <p className="text-sm text-sisley-gray-600 mb-1">
                    Número de pedido: <span className="text-sisley-black">ORD-{Date.now().toString().slice(-6)}</span>
                  </p>
                  <p className="text-sm text-sisley-gray-500 mb-8">
                    Recibirás un correo de confirmación en {formData.email || 'tu correo'}.
                  </p>
                  <div className="flex justify-center gap-4">
                    <a href="/mis-pedidos">
                      <Button>Ver mis pedidos</Button>
                    </a>
                    <a href="/catalogo">
                      <Button variant="secondary">Seguir comprando</Button>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {step < 3 && (
              <div>
                <div className="border border-sisley-gray-200 p-6">
                  <h2 className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-4">Resumen del pedido</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-sisley-gray-600">Subtotal</span>
                      <span className="text-sisley-black">${subtotal.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-sisley-gray-600">Envío</span>
                      <span className="text-sisley-black">
                        {shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString('es-CO')}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-sisley-gray-600">IVA (19%)</span>
                      <span className="text-sisley-black">${tax.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="pt-3 border-t border-sisley-gray-200 flex justify-between">
                      <span className="text-sm font-medium text-sisley-black">Total</span>
                      <span className="text-lg font-light text-sisley-black">${total.toLocaleString('es-CO')}</span>
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
