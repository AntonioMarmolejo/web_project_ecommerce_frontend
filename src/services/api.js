import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
});

// ─── Interceptor de request ─────────────────────────────────
// Adjunta el token JWT a cada petición automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Interceptor de response ────────────────────────────────
// Si el servidor devuelve 401 → limpiar sesión y redirigir al login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

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
