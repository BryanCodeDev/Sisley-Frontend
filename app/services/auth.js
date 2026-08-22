import { api } from './api';

export async function getRoles() {
  return api.get('/api/roles');
}
