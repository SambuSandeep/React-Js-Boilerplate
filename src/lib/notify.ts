import { toast } from 'sonner';

import { ApiError } from '@/lib/api/errors';

interface NotifyOptions {
  id?: string | number;
}

export function getErrorMessage(error: unknown, fallback = 'Something went wrong.') {
  if (error instanceof ApiError) return error.message;
  return fallback;
}

export const notify = {
  success: (message: string, options?: NotifyOptions) => toast.success(message, options),
  info: (message: string, options?: NotifyOptions) => toast.info(message, options),
  error: (error: unknown, fallback?: string, options?: NotifyOptions) =>
    toast.error(typeof error === 'string' ? error : getErrorMessage(error, fallback), options),
};
