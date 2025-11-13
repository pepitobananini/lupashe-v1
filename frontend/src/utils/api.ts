import axios from 'axios';
import { mockAuthApi, mockClientApi, mockProjectApi, mockUserApi, mockStatsApi } from './mockApi';

// Modo demo: usar mocks cuando no hay backend disponible
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' || !import.meta.env.VITE_API_URL;

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 500, // Timeout corto para fallback rápido a mocks
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data.data;
        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Helper para crear APIs que fallback a mocks si falla la API real
const createApiWithFallback = (mockApi: any, realApi: any) => {
  const wrap = (fn: any, mockFn: any) => {
    return async (...args: any[]) => {
      // Si no hay API_URL configurada, usar mocks directamente
      if (USE_MOCK_API || !import.meta.env.VITE_API_URL) {
        return await mockFn(...args);
      }
      
      try {
        // Intentar API real con timeout corto
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 500)
        );
        return await Promise.race([fn(...args), timeoutPromise]);
      } catch (error) {
        // Si falla la API real o timeout, usar mocks inmediatamente
        return await mockFn(...args);
      }
    };
  };

  return {
    getAll: wrap(realApi.getAll, mockApi.getAll),
    getById: wrap(realApi.getById, mockApi.getById),
    create: wrap(realApi.create, mockApi.create),
    update: wrap(realApi.update, mockApi.update),
    delete: wrap(realApi.delete, mockApi.delete),
    ...(realApi.getByClientId && {
      getByClientId: wrap(realApi.getByClientId, mockApi.getByClientId),
    }),
  };
};

export const authApi = {
  login: async (data: { username: string; password: string }) => {
    try {
      return await api.post('/auth/login', data);
    } catch {
      return await mockAuthApi.login(data);
    }
  },
  register: async (data: any) => {
    try {
      return await api.post('/auth/register', data);
    } catch {
      return await mockAuthApi.register(data);
    }
  },
  refresh: async (data: { refreshToken: string }) => {
    try {
      return await api.post('/auth/refresh', data);
    } catch {
      return await mockAuthApi.refresh(data);
    }
  },
};

export const userApi = createApiWithFallback(mockUserApi, {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
  create: (data: any) => api.post('/users', data),
  update: (id: string, data: any) => api.put(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
});

export const clientApi = createApiWithFallback(mockClientApi, {
  getAll: () => api.get('/clients'),
  getById: (id: string) => api.get(`/clients/${id}`),
  create: (data: any) => api.post('/clients', data),
  update: (id: string, data: any) => api.put(`/clients/${id}`, data),
  delete: (id: string) => api.delete(`/clients/${id}`),
});

export const projectApi = createApiWithFallback(mockProjectApi, {
  getAll: () => api.get('/projects'),
  getById: (id: string) => api.get(`/projects/${id}`),
  getByClientId: (clientId: string) => api.get(`/projects/client/${clientId}`),
  create: (data: any) => api.post('/projects', data),
  update: (id: string, data: any) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
});

export const statsApi = mockStatsApi;

export default api;

