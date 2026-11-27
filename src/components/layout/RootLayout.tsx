import { NavLink, Outlet } from 'react-router';

import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/utils';
import { useUiStore } from '@/stores/ui-stores';
import { Can } from '@/components/Can';
import { UserMenu } from '@/components/UserMenu';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
    isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
  );

export function RootLayout() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card">
        <div className="flex h-14 items-center justify-between px-4">
          <Button variant="outline" size="sm" onClick={toggleSidebar} aria-expanded={sidebarOpen}>
            {sidebarOpen ? 'Hide menu' : 'Show menu'}
          </Button>
          <div className="flex items-center gap-3">
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="w-52 shrink-0 border-r border-border bg-card p-3">
            <nav className="flex flex-col gap-1">
              <NavLink to={ROUTES.HOME} end className={linkClass}>
                Home
              </NavLink>
              <NavLink to={ROUTES.ABOUT} className={linkClass}>
                About
              </NavLink>
              <NavLink to={ROUTES.TODOS} className={linkClass}>
                Todos
              </NavLink>
              <Can roles={['admin']}>
                <NavLink to={ROUTES.ADMIN} className={linkClass}>
                  Admin
                </NavLink>
              </Can>
            </nav>
          </aside>
        )}
        <main className="mx-auto w-full max-w-5xl px-4 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
