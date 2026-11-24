import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { api } from '@/lib/api/client';
import { ApiError } from '@/lib/api/errors';
import { useEffect } from 'react';

export function HomePage() {
  useEffect(() => {
    api
      .get('/todos/1')
      .then((data) => console.warn('OK', data))
      .catch((error) => console.warn('FAIL', error instanceof ApiError ? error.status : error));
    api
      .get('/does-not-exist')
      .catch((error) => console.warn('404 test', error instanceof ApiError && error.isNotFound));
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">React Boilerplate</h1>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Component preview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input placeholder="Type something..." />
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <Spinner />
        </CardContent>
      </Card>
    </section>
  );
}
