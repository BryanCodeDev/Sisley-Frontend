import { api } from './api';

export async function getCustomers(params = {}) {
  const query = new URLSearchParams();
  if (params.status) query.set('status', params.status);
  if (params.search) query.set('search', params.search);
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);

  const qs = query.toString();
  return api.get(`/api/customers${qs ? `?${qs}` : ''}`);
}

export async function getCustomer(id) {
  return api.get(`/api/customers/${id}`);
}

export async function createCustomer(payload) {
  return api.post('/api/customers', payload);
}

export async function updateCustomer(id, payload) {
  return api.put(`/api/customers/${id}`, payload);
}
