import { Link } from 'react-router';

import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/config/routes';

import { useLogout } from '@/features/auth/hooks';
import { useAuthStore } from '@/features/auth/store';

export function UserMenu() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  if (!user) {
    return (
      <Link to={ROUTES.LOGIN} className="text-sm font-medium hover:underline">
        Log in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">{user.name}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => logout.mutate()}
        disabled={logout.isPending}
      >
        Log out
      </Button>
    </div>
  );
}
