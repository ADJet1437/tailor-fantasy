import axios from 'axios';

// Base URL of our FastAPI backend. Configure via frontend/.env (VITE_API_BASE_URL).
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** Prefix a relative /media path with the backend origin. */
export const mediaUrl = (path: string) => `${API_BASE_URL}${path}`;

// TypeScript Interfaces
export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  /** "press-on" | "handcraft" | "diy" */
  category: string;
  price: number;
  image_url: string;
  thumb_url: string;
  detail_url: string | null;
}

export interface PagedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

// Product API -- served by the local FastAPI backend, read-only.
export const productApi = {
  list: async (
    limit = 100,
    offset = 0,
    category?: string,
  ): Promise<PagedResponse<Product>> => {
    const response = await api.get('/products', {
      params: { limit, offset, ...(category ? { category } : {}) },
    });
    return response.data;
  },

  get: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};

export interface ContactPayload {
  email: string;
  message: string;
}

export const contactApi = {
  send: async (data: ContactPayload): Promise<{ id: string; forwarded: boolean }> => {
    const response = await api.post('/contact', data);
    return response.data;
  },
};

export default api;
