import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { ApiError } from '@/lib/api/errors';
import { cn } from '@/lib/utils';

import { useTodos } from '@/feature/todos/hooks';

export function TodoList() {
  const { data, error, isPending, isError, isFetching, refetch } = useTodos(10);

  if (isPending) return <Spinner />;

  if (isError) {
    return (
      <div role="alert" className="flex flex-col items-start gap-3">
        <p className="text-danger">
          {error instanceof ApiError ? error.message : 'Something went wrong.'}
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {isFetching && <p className="text-xs text-muted-foreground">Refreshing...</p>}
      <ul className="flex flex-col gap-2">
        {data.map((todo) => (
          <li
            key={todo.id}
            className={cn(
              'rounded-md border border-border bg-surface px-3 py-2 text-sm',
              todo.completed && 'text-muted-foreground line-through',
            )}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
