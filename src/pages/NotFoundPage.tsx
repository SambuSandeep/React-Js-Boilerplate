import { Link } from 'react-router';

import { ROUTES } from '@/config/routes';

export function NotFoundPage() {
  return (
    <section>
      <h1>404 - Page not found</h1>
      <Link to={ROUTES.HOME}>Back to home</Link>
    </section>
  );
}
