import { api } from '@/lib/api/client';
import { todoSchema, todosSchema } from './types';

export const todosApi = {
  list: (params: { limit: number }, signal: AbortSignal) =>
    api.get('/todos', { query: { _limit: params.limit }, schema: todosSchema, signal }),

  get: (id: number, signal?: AbortSignal) =>
    api.get(`/todos/${id}`, { schema: todoSchema, signal }),
};
