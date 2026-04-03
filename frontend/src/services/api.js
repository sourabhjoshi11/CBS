import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getProducts = (params = {}) => API.get('/products', { params });
export const getProduct = (id) => API.get(`/products/${id}`);

export const createOrder = (data) => API.post('/orders', data);
export const getOrders = () => API.get('/orders');
export const updateOrderStatus = (id, status) => API.patch(`/orders/${id}/status`, { status });

export const adminLogin = (credentials) => API.post('/admin/login', credentials);
export const getDashboard = (token) => API.get('/admin/dashboard', { params: { token } });

export default API;
