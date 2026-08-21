import { api } from './api';

export async function getAddresses(params = {}) {
  const query = new URLSearchParams();
  if (params.customerId) query.set('customerId', params.customerId);

  const qs = query.toString();
  return api.get(`/api/addresses${qs ? `?${qs}` : ''}`);
}

export async function createAddress(payload) {
  return api.post('/api/addresses', payload);
}

export async function updateAddress(id, payload) {
  return api.put(`/api/addresses/${id}`, payload);
}

export async function deleteAddress(id) {
  return api.delete(`/api/addresses/${id}`);
}
