import { api } from './api';

export async function createCheckout({ shippingAddressId, shippingMethod, paymentMethod, notes }) {
  return api.post('/api/checkout', { shippingAddressId, shippingMethod, paymentMethod, notes });
}
