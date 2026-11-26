import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from './api';
import { useAuthStore } from './store';

export function useAuth() {
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);
  return { status, user, isAuthenticated: status === 'authenticated' };
}

export function useLogin() {
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (session) => useAuthStore.getState().setSession(session),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      useAuthStore.getState().clearSession();
      // Drop all cached data so the next user never sees the previous user's data
      queryClient.clear();
    },
  });
}
