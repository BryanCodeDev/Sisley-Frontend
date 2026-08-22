import { api } from './api';

export async function getUsers(params = {}) {
  const query = new URLSearchParams();
  if (params.status) query.set('status', params.status);
  if (params.search) query.set('search', params.search);
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);

  const qs = query.toString();
  return api.get(`/api/users${qs ? `?${qs}` : ''}`);
}

export async function getUser(id) {
  return api.get(`/api/users/${id}`);
}

export async function createUser(payload) {
  return api.post('/api/users', payload);
}
