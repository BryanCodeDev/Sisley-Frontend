'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Plus, Minus, Trash2, ShoppingBag, ChevronRight } from 'lucide-react';
import { getCart, updateCartItem, removeCartItem } from '@/app/services/cart';
import { useCustomerAuth } from '@/app/contexts/CustomerAuthContext';

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

export default function CartDrawer({ open, onClose }) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const [visible, setVisible] = useState(false);
  const { isAuthenticated } = useCustomerAuth();

  const loadCart = useCallback(async () => {
    try {
      const data = await getCart();
      setItems(data.data?.items || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      loadCart();
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    return undefined;
  }, [open, loadCart]);

  useEffect(() => {
    function handleCartUpdate() {
      if (open) loadCart();
    }
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [open, loadCart]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdating((prev) => ({ ...prev, [itemId]: true }));
    try {
      await updateCartItem(itemId, newQuantity);
      setItems((items) =>
        items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
      );
    } catch {
      // silent
    } finally {
      setUpdating((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemoveItem = async (itemId) => {
    setUpdating((prev) => ({ ...prev, [itemId]: true }));
    try {
      await removeCartItem(itemId);
      setItems((items) => items.filter((item) => item.id !== itemId));
    } catch {
      // silent
    } finally {
      setUpdating((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const subtotal = items.reduce((sum, item) => sum + Number(item.unitPrice) * item.quantity, 0);
  const shipping = subtotal > 500000 ? 0 : 25000;
  const total = subtotal + shipping;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={onClose}
          />
          <div
            className={`absolute inset-y-0 right-0 w-full max-w-md bg-sisley-white shadow-2xl flex flex-col transition-all duration-500 ease-out motion-reduce:transition-none ${
              visible ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between p-6 border-b border-sisley-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                <h2 id="cart-drawer-title" className="text-sm font-medium text-sisley-text">Tu carrito</h2>
                {items.length > 0 && (
                  <span className="text-xs text-sisley-muted">({items.length} {items.length === 1 ? 'producto' : 'productos'})</span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 text-sisley-text-secondary hover:text-sisley-black transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="py-6 flex gap-4 border-b border-sisley-border">
                      <div className="w-20 h-24 bg-sisley-smoke flex-shrink-0 animate-pulse" />
                      <div className="flex-1 space-y-3">
                        <div className="h-4 w-3/4 bg-sisley-smoke animate-pulse" />
                        <div className="h-3 w-1/4 bg-sisley-smoke animate-pulse" />
                        <div className="h-8 w-24 bg-sisley-smoke animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : items.length === 0 ? (
                <div className="py-20 text-center">
                  <ShoppingBag className="w-12 h-12 mx-auto text-sisley-muted mb-4" strokeWidth={1} />
                  <p className="text-sm text-sisley-muted mb-6">Tu carrito está vacío</p>
                  <Button variant="secondary" size="sm" onClick={onClose}>
                    Seguir comprando
                  </Button>
                </div>
              ) : (
                <div className="space-y-0">
                  {items.map((item, index) => (
                    <div key={item.id} className={`py-6 flex gap-4 transition-colors duration-200 ${index !== items.length - 1 ? 'border-b border-sisley-border' : ''}`}>
                      <Link href={`/producto/${item.productSlug || item.productId}`} onClick={onClose} className="w-20 h-24 bg-sisley-smoke flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image || item.productImage || getCartImage(index)}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <Link href={`/producto/${item.productSlug || item.productId}`} onClick={onClose}>
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
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={updating[item.id] || item.quantity <= 1}
                              className="w-8 h-8 flex items-center justify-center border border-sisley-border hover:border-sisley-black transition-colors disabled:opacity-50"
                              aria-label="Reducir cantidad"
                            >
                              <Minus className="w-3 h-3" strokeWidth={1.5} />
                            </button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={updating[item.id]}
                              className="w-8 h-8 flex items-center justify-center border border-sisley-border hover:border-sisley-black transition-colors disabled:opacity-50"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3 h-3" strokeWidth={1.5} />
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
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-sisley-border flex-shrink-0 space-y-4">
                <div className="space-y-2">
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
                  <div className="pt-3 border-t border-sisley-border flex justify-between">
                    <span className="text-sm font-medium text-sisley-text">Total</span>
                    <span className="text-lg font-light text-sisley-text">${total.toLocaleString('es-CO')}</span>
                  </div>
                </div>
                <Button size="lg" onClick={() => { onClose(); router.push('/carrito'); }} className="w-full">
                  <span className="inline-flex items-center justify-center gap-2">
                    Ver carrito
                    <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                </Button>
                <p className="text-xs text-sisley-muted text-center">
                  Envío gratis en compras superiores a $500.000
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
