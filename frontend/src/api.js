/**
 * API client for Django REST backend at localhost.
 * Use relative /api so Vite proxy forwards to Django (localhost:8000).
 */
const API_BASE = '/api';

const BACKEND_UNREACHABLE_MSG =
  'Django backend is not running. In the project root run: python manage.py runserver';

async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  let res;
  try {
    res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
  } catch (networkError) {
    throw { status: 0, data: { detail: BACKEND_UNREACHABLE_MSG }, isNetworkError: true };
  }
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw { status: res.status, data };
  return data;
}

export const customersApi = {
  list: () => request('/customers/'),
  get: (id) => request(`/customers/${id}/`),
  create: (body) => request('/customers/', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/customers/${id}/`, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (id, body) => request(`/customers/${id}/`, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (id) => request(`/customers/${id}/`, { method: 'DELETE' }),
};

export const productsApi = {
  list: () => request('/products/'),
  get: (id) => request(`/products/${id}/`),
  create: (body) => request('/products/', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/products/${id}/`, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (id, body) => request(`/products/${id}/`, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (id) => request(`/products/${id}/`, { method: 'DELETE' }),
};

export const ordersApi = {
  list: () => request('/orders/'),
  get: (id) => request(`/orders/${id}/`),
  create: (body) => request('/orders/', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/orders/${id}/`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => request(`/orders/${id}/`, { method: 'DELETE' }),
};
