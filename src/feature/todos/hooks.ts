import { useQuery } from '@tanstack/react-query';

import { todoQueries } from './queries';

export function useTodos(limit?: number) {
  return useQuery(todoQueries.list(limit));
}

export function useTodo(id: number) {
  return useQuery(todoQueries.detail(id));
}
