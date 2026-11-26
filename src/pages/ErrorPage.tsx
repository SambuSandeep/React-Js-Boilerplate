import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

import { ROUTES } from '@/config/routes';
import { useEffect } from 'react';
import { captureError } from '@/lib/report-error';

export function ErrorPage() {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Unknown error';

  useEffect(() => {
    captureError(error, { source: 'route' });
  }, [error]);

  return (
    <section>
      <h1>Something went wrong</h1>
      <p>{message}</p>
      <Link to={ROUTES.HOME}>Back to home</Link>
    </section>
  );
}
