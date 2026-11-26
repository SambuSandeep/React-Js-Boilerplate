import { Navigate, Outlet, useLocation } from 'react-router';

import { ROUTES } from '@/config/routes';

import { useAuth } from '@/features/auth/hooks';
import { hasAnyRole } from '@/features/auth/permissions';
import type { Role } from '@/features/auth/types';

function Forbidden() {
  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Access denied</h1>
      <p className="text-muted-foreground">You don't have permission to view this page.</p>
    </section>
  );
}

export function RequireAuth({ roles }: { roles?: readonly Role[] }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }
  if (roles && !hasAnyRole(user, roles)) return <Forbidden />;

  return <Outlet />;
}
