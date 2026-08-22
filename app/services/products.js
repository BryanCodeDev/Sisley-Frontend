import { api } from './api';

const SLUG_IMAGE_MAP = {
  'blusa-satinada-elegante': '/assets/catalog/blusa-satinada.webp',
  'pantalon-wide-leg': '/assets/catalog/pantalon-wide-leg.webp',
  'vestido-midi-plisado': '/assets/catalog/vestido-midi-plisado.webp',
};

const FALLBACK_IMAGES = [
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

function cleanApiImages(images) {
  if (!images || !Array.isArray(images)) return [];
  return images.filter((img) => {
    const url = typeof img === 'string' ? img : img?.url;
    if (!url || typeof url !== 'string') return false;
    if (url.startsWith('/assets/')) return true;
    if (url.startsWith('http')) return false;
    return true;
  });
}

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
    let fallbackIndex = 0;
    data.data = data.data.map((product) => {
      const slug = product.slug || '';
      const apiImages = cleanApiImages(product.images || []);
      const mappedImage = SLUG_IMAGE_MAP[slug];

      if (mappedImage) {
        return {
          ...product,
          images: [
            { id: 0, url: mappedImage, altText: product.name, position: 1, variantId: null },
            ...apiImages,
          ],
        };
      }

      if (apiImages.length === 0) {
        const fallback = FALLBACK_IMAGES[fallbackIndex % FALLBACK_IMAGES.length];
        fallbackIndex += 1;
        return {
          ...product,
          images: [
            { id: 0, url: fallback, altText: product.name, position: 1, variantId: null },
          ],
        };
      }

      return {
        ...product,
        images: apiImages,
      };
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
