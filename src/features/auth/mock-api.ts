import { ApiError } from '@/lib/api/errors';

import type { LoginCredentials, Session, User } from './types';

// DEV ONLY. Simulates a backend with a "session cookie" kept in localStorage.
const STORAGE_KEY = 'mock-auth-user';

const accounts: { password: string; user: User }[] = [
  {
    password: 'admin123',
    user: { id: '1', name: 'Ada Admin', email: 'admin@example.com', role: ['admin'] },
  },
  {
    password: 'user123',
    user: { id: '2', name: 'Uma User', email: 'user@example.com', role: ['user'] },
  },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const makeSession = (user: User): Session => ({ user, accessToken: `mock-${crypto.randomUUID()}` });

export const mockAuthApi = {
  async login({ email, password }: LoginCredentials): Promise<Session> {
    await wait(400);
    const account = accounts.find((a) => a.user.email === email && a.password === password);
    if (!account) throw new ApiError('Invalid email or password.', 401);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account.user));
    return makeSession(account.user);
  },

  async refresh(): Promise<Session> {
    await wait(200);
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) throw new ApiError('No active session.', 401);
    return makeSession(JSON.parse(raw) as User);
  },

  async logout(): Promise<void> {
    await wait(100);
    localStorage.removeItem(STORAGE_KEY);
  },
};
