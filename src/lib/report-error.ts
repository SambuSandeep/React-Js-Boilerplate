export function captureError(error: unknown, context?: Record<string, unknown>) {
  console.error('[captureError]', error, context);
}
