import { api } from './api';

const LOCAL_IMAGES = [
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

export async function getProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.status) query.set('status', params.status);
  if (params.category) query.set('category', params.category);
  if (params.search) query.set('search', params.search);
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);
  if (params.orderBy) query.set('orderBy', params.orderBy);

  const qs = query.toString();
  const data = await api.get(`/api/products${qs ? `?${qs}` : ''}`);

  if (data.data) {
    data.data = data.data.map((product, index) => {
      const localImage = LOCAL_IMAGES[index % LOCAL_IMAGES.length];
      const currentImages = product.images || [];
      const hasLocalImage = currentImages.some((img) => img.url && img.url.startsWith('/assets/'));
      
      if (!hasLocalImage) {
        return {
          ...product,
          images: [{ id: 0, url: localImage, altText: product.name, position: 1, variantId: null }, ...currentImages],
        };
      }
      return product;
    });
  }

  return data;
}

export async function getProduct(id) {
  return api.get(`/api/products/${id}`);
}

export async function getProductBySlug(slug) {
  const data = await api.get(`/api/products?search=${encodeURIComponent(slug)}&limit=1`);
  const item = data.data?.find((p) => p.slug === slug);
  if (item) return item;
  return null;
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
