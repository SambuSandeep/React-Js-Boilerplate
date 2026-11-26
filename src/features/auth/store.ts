import { create } from 'zustand';
import type { Session, User } from './types';
import { devtools } from 'zustand/middleware';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: AuthStatus;
  user: User | null;
  accessToken: string | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      status: 'loading',
      accessToken: null,
      user: null,
      setSession: ({ user, accessToken }) => set({ status: 'authenticated', user, accessToken }),
      clearSession: () => set({ status: 'unauthenticated', user: null, accessToken: null }),
    }),
    { name: 'auth-store', enabled: import.meta.env.DEV },
  ),
);
