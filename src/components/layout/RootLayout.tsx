import { NavLink, Outlet } from 'react-router';

import { ROUTES } from '@/config/routes';

export function RootLayout() {
  return (
    <div>
      <header>
        <nav>
          <NavLink to={ROUTES.HOME} end>
            Home
          </NavLink>{' '}
          <NavLink to={ROUTES.ABOUT}>About</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
