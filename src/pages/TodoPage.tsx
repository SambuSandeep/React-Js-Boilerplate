import { SectionErrorBoundary } from '@/components/errors/SectionErrorBoundary';
import { TodoList } from '@/components/TodoList';

export function TodosPage() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Todos</h1>
      <SectionErrorBoundary>
        <TodoList />
      </SectionErrorBoundary>
    </section>
  );
}
