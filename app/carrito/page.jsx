'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import { orders } from '@/data/orders';

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <svg className="w-16 h-16 mx-auto text-sisley-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h1 className="text-2xl font-light text-sisley-black mb-4">Tu carrito está vacío</h1>
            <p className="text-sm text-sisley-gray-500 mb-8">Agrega productos para continuar.</p>
            <a href="/catalogo">
              <Button>Ir a la tienda</Button>
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl font-light text-sisley-black mb-8">Carrito de compras</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-0">
              {cartItems.map((item) => (
                <div key={item.id} className="py-6 border-b border-sisley-gray-200 flex gap-6">
                  <div className="w-24 h-32 bg-sisley-gray-100 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-sisley-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-sisley-black mb-1">{item.name}</h3>
                    <p className="text-xs text-sisley-gray-500 mb-3">{item.variant}</p>
                    <p className="text-sm text-sisley-black">${item.price.toLocaleString('es-CO')}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center border border-sisley-gray-300 hover:border-sisley-black transition-colors"
                    >
                      -
                    </button>
                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center border border-sisley-gray-300 hover:border-sisley-black transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-sisley-black mb-2">
                      ${(item.price * item.quantity).toLocaleString('es-CO')}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-sisley-gray-400 hover:text-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="border border-sisley-gray-200 p-6">
                <h2 className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-4">Resumen</h2>
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
                <a href="/checkout">
                  <Button size="lg" className="w-full">Proceder al pago</Button>
                </a>
                <p className="text-xs text-sisley-gray-400 mt-3 text-center">
                  Envío gratis en compras superiores a $500.000
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
