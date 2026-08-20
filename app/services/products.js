import { api } from './api';

export async function getProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.status) query.set('status', params.status);
  if (params.category) query.set('category', params.category);
  if (params.search) query.set('search', params.search);
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);
  if (params.orderBy) query.set('orderBy', params.orderBy);

  const qs = query.toString();
  return api.get(`/api/products${qs ? `?${qs}` : ''}`);
}

export async function getProduct(id) {
  return api.get(`/api/products/${id}`);
}

export async function getProductBySlug(slug) {
  const data = await api.get(`/api/products?search=${encodeURIComponent(slug)}`);
  const item = data.data?.find((p) => p.slug === slug);
  if (item) return item;
  return api.get(`/api/products/${slug}`);
}

export async function createProduct(payload) {
  return api.post('/api/products', payload);
}

export async function updateProduct(id, payload) {
  return api.put(`/api/products/${id}`, payload);
}

export async function deleteProduct(id) {
  return api.delete(`/api/products/${id}`);
}
