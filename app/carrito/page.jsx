'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Link from 'next/link';

export default function Carrito() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Crema Hidratante Velours', variant: '100ml', price: 420000, quantity: 1 },
    { id: 3, name: 'Protector Solar Matifiante', variant: '50ml', price: 195000, quantity: 2 },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500000 ? 0 : 25000;
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-20 text-center">
            <svg className="w-16 h-16 mx-auto text-sisley-border-strong mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h1 className="font-serif text-2xl font-light text-sisley-text mb-4">Tu carrito está vacío</h1>
            <p className="text-sm text-sisley-muted mb-8">Agrega productos para continuar.</p>
            <Link href="/catalogo">
              <Button>Ir a la tienda</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white pb-24 md:pb-0">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-2">Carrito</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight">
              Tu carrito de compras
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
            <div className="lg:col-span-2">
              <div className="border-b border-sisley-border">
                {cartItems.map((item, index) => (
                  <div key={item.id} className={`py-8 flex gap-6 ${index !== cartItems.length - 1 ? 'border-b border-sisley-border' : ''}`}>
                    <div className="w-24 h-32 bg-sisley-bg flex-shrink-0 flex items-center justify-center">
                      <svg className="w-8 h-8 text-sisley-border-strong" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-medium text-sisley-text truncate pr-4">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sisley-muted hover:text-sisley-black transition-colors flex-shrink-0"
                          aria-label="Eliminar"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-sisley-muted mb-4">{item.variant}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center border border-sisley-border hover:border-sisley-black transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                            </svg>
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center border border-sisley-border hover:border-sisley-black transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-sisley-text">
                          ${(item.price * item.quantity).toLocaleString('es-CO')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="border border-sisley-border p-6 md:p-8">
                <h2 className="text-[11px] uppercase tracking-widest text-sisley-muted mb-6">Resumen</h2>
                <div className="space-y-3 mb-6">
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
                <Link href="/checkout">
                  <Button size="lg" className="w-full">Finalizar compra</Button>
                </Link>
                <p className="text-xs text-sisley-muted mt-4 text-center">
                  Envío gratis en compras superiores a $500.000
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-sisley-white border-t border-sisley-border p-4 z-40">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-sisley-muted">Total</p>
              <p className="text-lg font-light text-sisley-text">${total.toLocaleString('es-CO')}</p>
            </div>
            <Link href="/checkout">
              <Button size="lg">Finalizar compra</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}