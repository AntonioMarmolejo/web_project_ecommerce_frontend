import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
});

// ─── Productos ───────────────────────────────────────────────
export const getProducts = (params = {}) =>
  api.get('/products', { params }).then((r) => r.data);

export const getProductById = (id) =>
  api.get(`/products/${id}`).then((r) => r.data);

export const getRelatedProducts = (id) =>
  api.get(`/products/${id}/related`).then((r) => r.data);

// ─── Categorías ──────────────────────────────────────────────
export const getCategories = () =>
  api.get('/categories').then((r) => r.data);

export default api;
