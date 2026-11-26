import { type ReactNode, useEffect } from 'react';

import { Spinner } from '@/components/ui/Spinner';

import { initAuth } from '@/features/auth/bootstrap';
import { useAuthStore } from '@/features/auth/store';

export function AuthProvider({ children }: { children: ReactNode }) {
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    void initAuth();
  }, []);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}
