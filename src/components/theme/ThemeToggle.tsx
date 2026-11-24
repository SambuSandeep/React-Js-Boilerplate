import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';

import type { Theme } from './theme-context';

const NEXT: Record<Theme, Theme> = { system: 'light', light: 'dark', dark: 'system' };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button variant="outline" size="sm" onClick={() => setTheme(NEXT[theme])}>
      Theme: {theme}
    </Button>
  );
}
