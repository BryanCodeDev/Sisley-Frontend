import { api } from './api';

function getSessionId() {
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

export async function addToCart({ variantId, quantity = 1 }) {
  return api.post('/api/cart', { variantId, quantity }, {
    headers: { 'x-session-id': getSessionId() },
  });
}

export async function updateCartItem(itemId, quantity) {
  return api.put(`/api/cart/items/${itemId}`, { quantity }, {
    headers: { 'x-session-id': getSessionId() },
  });
}

export async function removeCartItem(itemId) {
  return api.delete(`/api/cart/items/${itemId}`, {
    headers: { 'x-session-id': getSessionId() },
  });
}

export async function clearCart() {
  return api.post('/api/cart/clear', {}, {
    headers: { 'x-session-id': getSessionId() },
  });
}
