import { type FormEvent, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { env } from '@/config/env';
import { useLogin } from '@/features/auth/hooks';
import { ApiError } from '@/lib/api/errors';

export function LoginPage() {
  const login = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login.mutate({ email, password });
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {login.isError && (
              <p role="alert" className="text-sm text-danger">
                {login.error instanceof ApiError ? login.error.message : 'Login failed.'}
              </p>
            )}

            <Button type="submit" disabled={login.isPending}>
              {login.isPending ? 'Logging in...' : 'Log in'}
            </Button>

            {import.meta.env.DEV && env.VITE_AUTH_MOCK && (
              <p className="text-xs text-muted-foreground">
                Mock accounts: admin@example.com / admin123, user@example.com / user123
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
