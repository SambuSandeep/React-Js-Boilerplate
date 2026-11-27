import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, expect, it, vi } from 'vitest';

import { useAuthStore } from '@/features/auth/store';
import { server } from '@/test/server';
import { renderWithProviders } from '@/test/test-utils';

import { LoginForm } from './LoginForm';

const LOGIN_URL = 'http://localhost:3000/api/auth/login';

describe('LoginForm', () => {
  it('shows validation errors for empty fields', async () => {
    renderWithProviders(<LoginForm />);

    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('stores the session on successful login', async () => {
    server.use(
      http.post(LOGIN_URL, () =>
        HttpResponse.json({
          user: { id: '1', name: 'Ann', email: 'ann@x.com', role: ['user'] },
          accessToken: 'token-123',
        }),
      ),
    );
    renderWithProviders(<LoginForm />);

    await userEvent.type(screen.getByLabelText('Email'), 'ann@x.com');
    await userEvent.type(screen.getByLabelText('Password'), 'secret');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    await vi.waitFor(() => expect(useAuthStore.getState().status).toBe('authenticated'));
    expect(useAuthStore.getState().accessToken).toBe('token-123');
  });

  it('shows the server error on failed login', async () => {
    server.use(
      http.post(LOGIN_URL, () =>
        HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 }),
      ),
    );
    renderWithProviders(<LoginForm />);

    await userEvent.type(screen.getByLabelText('Email'), 'ann@x.com');
    await userEvent.type(screen.getByLabelText('Password'), 'wrong');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(useAuthStore.getState().status).not.toBe('authenticated');
  });
});
