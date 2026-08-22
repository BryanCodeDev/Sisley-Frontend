import { api } from './api';

const LOCAL_IMAGES = {
  blusa: '/assets/catalog/1.webp',
  pantalon: '/assets/catalog/2.webp',
  vestido: '/assets/catalog/3.webp',
};

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
    data.data = data.data.map((product) => {
      let localImage = null;
      const slug = product.slug || '';
      if (slug.includes('blusa')) localImage = LOCAL_IMAGES.blusa;
      else if (slug.includes('pantalon')) localImage = LOCAL_IMAGES.pantalon;
      else if (slug.includes('vestido')) localImage = LOCAL_IMAGES.vestido;
      
      const hasLocalImage = localImage && (!product.images || product.images.length === 0);
      const hasRemoteImage = product.images && product.images.length > 0 && product.images[0].url && !product.images[0].url.startsWith('/assets/');
      
      if (hasLocalImage) {
        return {
          ...product,
          images: [{ id: 0, url: localImage, altText: product.name, position: 1, variantId: null }],
        };
      }
      
      if (hasRemoteImage && localImage) {
        return {
          ...product,
          images: [
            { id: 0, url: localImage, altText: product.name, position: 1, variantId: null },
            ...product.images,
          ],
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
