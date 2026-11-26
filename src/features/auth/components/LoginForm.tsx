import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { env } from '@/config/env';
import { getErrorMessage } from '@/lib/notify';

import { useLogin } from '../hooks';
import { type LoginCredentials, loginSchema } from '../types';

export function LoginForm() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login.mutateAsync(values);
    } catch (error) {
      setError('root.server', { message: getErrorMessage(error, 'Login failed.') });
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <FormField label="Email" error={errors.email?.message}>
        {(control) => (
          <Input type="email" autoComplete="username" {...control} {...register('email')} />
        )}
      </FormField>

      <FormField label="Password" error={errors.password?.message}>
        {(control) => (
          <Input
            type="password"
            autoComplete="current-password"
            {...control}
            {...register('password')}
          />
        )}
      </FormField>

      {errors.root?.server && (
        <p role="alert" className="text-sm text-danger">
          {errors.root.server.message}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </Button>

      {import.meta.env.DEV && env.VITE_AUTH_MOCK && (
        <p className="text-xs text-muted-foreground">
          Mock accounts: admin@example.com / admin123, user@example.com / user123
        </p>
      )}
    </form>
  );
}
