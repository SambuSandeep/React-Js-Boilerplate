import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuth } from '@/features/auth/hooks';
import { getRedirectTarget } from '@/features/auth/redirect';

export function GuestOnly() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) return <Navigate to={getRedirectTarget(location.state)} replace />;
  return <Outlet />;
}
