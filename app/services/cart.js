import { api } from './api';

export function getSessionId() {
  if (typeof window === 'undefined') return 'default-session';
  let sessionId = localStorage.getItem('sisley_session_id');
  if (!sessionId) {
    sessionId = 'sess-' + Math.random().toString(36).slice(2) + '-' + Date.now().toString(36);
    localStorage.setItem('sisley_session_id', sessionId);
  }
  return sessionId;
}

export async function getCart() {
  return api.get('/api/cart', {
    headers: { 'x-session-id': getSessionId() },
  });
}

async function notifyCartUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }
}

export async function addToCart({ variantId, quantity = 1 }) {
  const result = await api.post('/api/cart', { variantId, quantity }, {
    headers: { 'x-session-id': getSessionId() },
  });
  notifyCartUpdate();
  return result;
}

export async function updateCartItem(itemId, quantity) {
  const result = await api.put(`/api/cart/items/${itemId}`, { quantity }, {
    headers: { 'x-session-id': getSessionId() },
  });
  notifyCartUpdate();
  return result;
}

export async function removeCartItem(itemId) {
  const result = await api.delete(`/api/cart/items/${itemId}`, {
    headers: { 'x-session-id': getSessionId() },
  });
  notifyCartUpdate();
  return result;
}

export async function clearCart() {
  const result = await api.post('/api/cart/clear', {}, {
    headers: { 'x-session-id': getSessionId() },
  });
  notifyCartUpdate();
  return result;
}
