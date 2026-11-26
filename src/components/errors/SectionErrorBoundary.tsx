import type { ReactNode } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

import { Button } from '@/components/ui/Button';
import { captureError } from '@/lib/report-error';

function SectionFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-md border border-border bg-surface p-4"
    >
      <p className="text-sm text-danger">This section failed to load.</p>
      <Button variant="outline" size="sm" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
}

export function SectionErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={SectionFallback}
      onError={(error, info) => captureError(error, { componentStack: info.componentStack })}
    >
      {children}
    </ErrorBoundary>
  );
}
