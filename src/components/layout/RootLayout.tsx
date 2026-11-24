import { NavLink, Outlet } from 'react-router';

import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme/ThemeToggle';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
    isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
  );

export function RootLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-surface">
        <nav className="flex gap-1">
          <NavLink to={ROUTES.HOME} end className={linkClass}>
            Home
          </NavLink>{' '}
          <NavLink to={ROUTES.ABOUT} className={linkClass}>
            About
          </NavLink>{' '}
        </nav>
        <ThemeToggle />
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
