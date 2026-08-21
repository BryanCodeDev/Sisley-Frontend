import { api } from './api';
import { getProducts } from './products';

export async function getInventoryAlerts() {
  return api.get('/api/inventory?lowStock=true');
}

export async function getInventory(params = {}) {
  return api.get(`/api/inventory?${new URLSearchParams(params).toString()}`);
}

export async function adjustInventory(variantId, payload) {
  return api.post('/api/inventory/adjust', { variantId, ...payload });
}

export async function getInventoryFromProducts(params = {}) {
  const data = await getProducts({ status: 'active', limit: params.limit || '100' });
  const items = (data.data || []).flatMap((product) =>
    (product.variants || []).map((variant) => ({
      id: variant.id,
      sku: variant.sku,
      name: product.name,
      color: variant.color,
      size: variant.size,
      stock: variant.stock || 0,
      minStock: 10,
      status: variant.status || 'active',
    }))
  );
  return { data: items, pagination: data.pagination };
}
