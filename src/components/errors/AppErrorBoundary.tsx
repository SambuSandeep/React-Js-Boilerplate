import type { ReactNode } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

import { Button } from '@/components/ui/button';
import { captureError } from '@/lib/report-error';

function AppFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center"
    >
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">
        An unexpected error occurred. You can try again, or reload the page.
      </p>
      {import.meta.env.DEV && error instanceof Error && (
        <pre className="max-w-full overflow-auto rounded-md border border-border bg-muted p-3 text-left text-xs">
          {error.message}
        </pre>
      )}
      <div className="flex gap-2">
        <Button onClick={resetErrorBoundary}>Try again</Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reload page
        </Button>
      </div>
    </div>
  );
}

export function AppErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={AppFallback}
      onError={(error, info) => captureError(error, { componentStack: info.componentStack })}
    >
      {children}
    </ErrorBoundary>
  );
}
