import { QueryCache, QueryClient } from '@tanstack/react-query';

import { ApiError } from '@/lib/api/errors';
import { notify } from '@/lib/notify';

export function createQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (query.state.data === undefined) return;
        if (error instanceof ApiError && error.isUnauthorized) return;
        notify.error(error, 'Could not refresh data.', { id: 'query-refresh-error' });
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: (failureCount, error) => {
          if (error instanceof ApiError && error.status >= 400 && error.status < 500) return false;
          return failureCount < 2;
        },
      },
      mutations: {
        retry: false,
      },
    },
  });
}
