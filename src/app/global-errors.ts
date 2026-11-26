import { captureError } from '@/lib/report-error';

export function registerGlobalErrorHandlers() {
  window.addEventListener('unhandledrejection', (event) => {
    captureError(event.reason, { type: 'unhandledrejection' });
  });

  window.addEventListener('error', (event) => {
    captureError(event.error ?? event.message, { type: 'window.error' });
  });
}
