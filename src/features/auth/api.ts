import { env } from '@/config/env';
import { sessionSchema, type LoginCredentials, type Session } from './types';
import { api } from '@/lib/api/client';

const useMock = import.meta.env.DEV && env.VITE_AUTH_MOCK;

async function mock() {
  return (await import('./mock-api')).mockAuthApi;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<Session> => {
    if (useMock) return (await mock()).login(credentials);
    return api.post('/auth/login', credentials, { schema: sessionSchema, withCredentials: true });
  },

  refresh: async (): Promise<Session> => {
    if (useMock) return (await mock()).refresh();
    return api.post('/auth/refresh', undefined, { schema: sessionSchema, withCredentials: true });
  },

  logout: async (): Promise<void> => {
    if (useMock) return (await mock()).logout();
    api.post('/auth/logout', undefined, { schema: sessionSchema, withCredentials: true });
  },
};
