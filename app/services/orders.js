import { api } from './api';

export async function getOrders(params = {}) {
  const query = new URLSearchParams();
  if (params.status) query.set('status', params.status);
  if (params.search) query.set('search', params.search);
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);
  if (params.customerId) query.set('customerId', params.customerId);

  const qs = query.toString();
  return api.get(`/api/orders${qs ? `?${qs}` : ''}`);
}

export async function getOrder(id) {
  return api.get(`/api/orders/${id}`);
}

export async function createOrder(payload) {
  return api.post('/api/orders', payload);
}

export async function updateOrderStatus(id, status, notes) {
  return api.put(`/api/orders/${id}`, { status, notes });
}
