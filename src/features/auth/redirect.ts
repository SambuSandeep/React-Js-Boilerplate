import { ROUTES } from '@/config/routes';

/** Reads the "where the user wanted to go" path from router state, accepting internal paths only. */
export function getRedirectTarget(state: unknown): string {
  const from = (state as { from?: { pathname?: unknown } } | null)?.from?.pathname;
  if (typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')) return from;
  return ROUTES.HOME;
}
