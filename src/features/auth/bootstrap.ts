import { configureApiClient } from '@/lib/api/client';

import { authApi } from './api';
import { useAuthStore } from './store';

configureApiClient({
  getToken: () => useAuthStore.getState().accessToken,
  onUnauthorized: () => useAuthStore.getState().clearSession(),
});

let initPromise: Promise<void> | null = null;

/** Restores the session once on app start. Safe to call twice (React StrictMode). */
export function initAuth() {
  initPromise ??= (async () => {
    try {
      useAuthStore.getState().setSession(await authApi.refresh());
    } catch {
      useAuthStore.getState().clearSession();
    }
  })();
  return initPromise;
}
