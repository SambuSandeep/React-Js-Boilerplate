import axios, { type AxiosRequestConfig, type Method } from 'axios';
import type { z } from 'zod';

import { env } from '@/config/env';

import { ApiError } from './errors';

type QueryValue = string | number | boolean | null | undefined;

export interface RequestOptions<T> extends Omit<
  AxiosRequestConfig,
  'url' | 'method' | 'data' | 'params'
> {
  query?: Record<string, QueryValue>;
  schema?: z.ZodType<T>;
}

let getAuthToken: () => string | null = () => null;
let onUnauthorized: (() => void) | null = null;

export function configureApiClient(config: {
  getToken?: () => string | null;
  onUnauthorized?: () => void;
}) {
  if (config.getToken) getAuthToken = config.getToken;
  if (config.onUnauthorized) onUnauthorized = config.onUnauthorized;
}

const http = axios.create({
  baseURL: env.VITE_API_URL,
  timeout: 15_000,
  headers: { Accept: 'application/json' },
});

http.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.set('Authorization', `Bearer ${token}`);
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const normalized = toApiError(error);
    if (normalized instanceof ApiError && normalized.isUnauthorized) onUnauthorized?.();
    throw normalized;
  },
);

function extractMessage(data: unknown): string | undefined {
  if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
    return data.message;
  }
  return undefined;
}

function toApiError(error: unknown): unknown {
  if (axios.isCancel(error)) return error;
  if (!axios.isAxiosError(error)) return error;

  if (error.response) {
    const { status, data, statusText } = error.response;
    return new ApiError(extractMessage(data) ?? (statusText || 'Request failed'), status, data);
  }

  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return new ApiError('The request timed out.', 0);
  }

  return new ApiError('Network error. Please check your connection.', 0);
}

async function request<T>(
  method: Method,
  path: string,
  options: RequestOptions<T> & { body?: unknown } = {},
): Promise<T> {
  const { query, body, schema, ...config } = options;

  const response = await http.request<unknown>({
    ...config,
    method,
    url: path,
    params: query,
    data: body,
  });

  const data = response.data === '' ? undefined : response.data;

  return schema ? schema.parse(data) : (data as T);
}

export const api = {
  get: <T>(path: string, options?: RequestOptions<T>) => request<T>('GET', path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions<T>) =>
    request<T>('POST', path, { ...options, body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions<T>) =>
    request<T>('PUT', path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions<T>) =>
    request<T>('PATCH', path, { ...options, body }),
  delete: <T = void>(path: string, options?: RequestOptions<T>) =>
    request<T>('DELETE', path, options),
};
