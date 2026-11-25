import { queryOptions } from '@tanstack/react-query';

import { todosApi } from './api';

export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (limit: number) => [...todoKeys.lists(), { limit }] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
};

export const todoQueries = {
  list: (limit = 10) =>
    queryOptions({
      queryKey: todoKeys.list(limit),
      queryFn: ({ signal }) => todosApi.list({ limit }, signal),
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: todoKeys.detail(id),
      queryFn: ({ signal }) => todosApi.get(id, signal),
    }),
};
