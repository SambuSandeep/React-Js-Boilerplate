import type { ReactNode } from 'react';

import { hasAnyRole } from '@/features/auth/permissions';
import { useAuthStore } from '@/features/auth/store';
import type { Role } from '@/features/auth/types';

interface CanProps {
  roles: readonly Role[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function Can({ roles, children, fallback = null }: CanProps) {
  const user = useAuthStore((state) => state.user);
  return <>{hasAnyRole(user, roles) ? children : fallback}</>;
}
