import { api } from './api';

export async function getCategories(params = {}) {
  const query = new URLSearchParams();
  if (params.status) query.set('status', params.status);
  if (params.search) query.set('search', params.search);
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);

  const qs = query.toString();
  return api.get(`/api/categories${qs ? `?${qs}` : ''}`);
}

export async function getCategory(id) {
  return api.get(`/api/categories/${id}`);
}

export async function getCategoryBySlug(slug) {
  const data = await api.get(`/api/categories?slug=${encodeURIComponent(slug)}`);
  if (data.data) return data.data;
  return api.get(`/api/categories/${slug}`);
}

export async function createCategory(payload) {
  return api.post('/api/categories', payload);
}

export async function updateCategory(id, payload) {
  return api.put(`/api/categories/${id}`, payload);
}

export async function deleteCategory(id) {
  return api.delete(`/api/categories/${id}`);
}
