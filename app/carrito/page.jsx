'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Skeleton from '@/app/components/Skeleton';
import Breadcrumb from '@/app/components/Breadcrumb';
import EmptyState from '@/app/components/EmptyState';
import EditorialLabel from '@/app/components/EditorialLabel';
import ScrollReveal from '@/app/components/ScrollReveal';
import Link from 'next/link';
import { getCart, updateCartItem, removeCartItem } from '@/app/services/cart';
import { Trash2 } from 'lucide-react';

const CART_IMAGES = [
  '/assets/catalog/1.webp',
  '/assets/catalog/2.webp',
  '/assets/catalog/3.webp',
  '/assets/catalog/4.webp',
  '/assets/catalog/5.webp',
  '/assets/catalog/6.webp',
  '/assets/catalog/7.webp',
  '/assets/catalog/8.webp',
  '/assets/catalog/9.webp',
];

function getCartImage(index) {
  return CART_IMAGES[index % CART_IMAGES.length];
}

export default function Carrito() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCart();
        const items = data.data?.items || [];
        setCartItems(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdating((prev) => ({ ...prev, [itemId]: true }));
    try {
      await updateCartItem(itemId, newQuantity);
      setCartItems((items) =>
        items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
      );
    } catch (err) {
      console.error('Error updating quantity:', err.message);
    } finally {
      setUpdating((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemoveItem = async (itemId) => {
    setUpdating((prev) => ({ ...prev, [itemId]: true }));
    try {
      await removeCartItem(itemId);
      setCartItems((items) => items.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error('Error removing item:', err.message);
      setUpdating((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.unitPrice) * item.quantity, 0);
  const shipping = subtotal > 500000 ? 0 : 25000;
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + shipping + tax;

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
            <Skeleton className="h-8 w-48 mb-10" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="py-8 flex gap-6 border-b border-sisley-border">
                    <Skeleton className="w-24 h-32 flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-8 w-32" />
                    </div>
                  </div>
                ))}
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

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-20 text-center">
            <p className="text-sm text-red-600 mb-4">Error: {error}</p>
            <Button onClick={() => window.location.reload()}>Reintentar</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-sisley-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 md:py-16">
            <Breadcrumb
              items={[
                { label: 'Inicio', href: '/' },
                { label: 'Carrito' },
              ]}
            />
            <EmptyState
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
              title="Tu carrito está vacío"
              description="Agrega productos para continuar con tu compra."
              actionLabel="Ir a la tienda"
              actionHref="/catalogo"
            />
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
          <Breadcrumb
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Carrito' },
            ]}
          />
          <div className="mb-10 md:mb-14">
            <EditorialLabel number="01" label="Tu carrito" />
            <h1 className="font-serif display-sm md:display-md text-sisley-text tracking-tighter leading-[0.95]">
              {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
            <div className="lg:col-span-2">
              <div className="border-b border-sisley-border">
                {cartItems.map((item, index) => (
                  <div key={item.id} className={`py-8 flex gap-6 transition-colors duration-200 hover:bg-sisley-smoke/50 ${index !== cartItems.length - 1 ? 'border-b border-sisley-border' : ''}`}>
                    <Link href={`/producto/${item.productSlug || item.productId}`} className="w-24 h-32 bg-sisley-smoke flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image || item.productImage || getCartImage(index)}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <Link href={`/producto/${item.productSlug || item.productId}`}>
                          <h3 className="text-sm font-medium text-sisley-text hover:text-sisley-black transition-colors truncate pr-4">{item.productName}</h3>
                        </Link>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={updating[item.id]}
                          className="text-sisley-muted hover:text-sisley-black transition-colors flex-shrink-0 disabled:opacity-50"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="text-xs text-sisley-muted mb-4">{item.color && item.size ? `${item.color} / ${item.size}` : ''}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={updating[item.id] || item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center border border-sisley-border hover:border-sisley-black transition-colors disabled:opacity-50"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                            </svg>
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={updating[item.id]}
                            className="w-8 h-8 flex items-center justify-center border border-sisley-border hover:border-sisley-black transition-colors disabled:opacity-50"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-sisley-text">
                          ${(Number(item.unitPrice) * item.quantity).toLocaleString('es-CO')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="border border-sisley-border p-6 md:p-8">
                <h2 className="text-meta uppercase tracking-[0.25em] text-sisley-muted mb-6">Resumen</h2>
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
              <p className="text-meta uppercase tracking-[0.25em] text-sisley-muted">Total</p>
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
