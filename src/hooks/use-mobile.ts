import { useMediaQuery } from './useMediaQuery';

const MOBILE_BREAKPOINT = 768;

// Used by shadcn's sidebar. Built on our own useMediaQuery (useSyncExternalStore)
// instead of the generated setState-in-effect version, which fails our lint rules.
export function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
}
