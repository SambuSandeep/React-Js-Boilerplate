import { createBrowserRouter } from 'react-router';

import { RootLayout } from '@/components/layout/RootLayout';
import { ROUTES } from '@/config/routes';
import { GuestOnly } from '@/components/GuestOnly';
import { RequireAuth } from '@/components/RequireAuth';
import { ErrorPage } from '@/pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import('@/pages/HomePage')).HomePage }),
      },
      {
        path: ROUTES.ABOUT,
        lazy: async () => ({ Component: (await import('@/pages/AboutPage')).AboutPage }),
      },
      {
        // Any logged-in user
        element: <RequireAuth />,
        children: [
          {
            path: ROUTES.TODOS,
            lazy: async () => ({ Component: (await import('@/pages/TodoPage')).TodosPage }),
          },
        ],
      },
      {
        // Admins only
        element: <RequireAuth roles={['admin']} />,
        children: [
          {
            path: ROUTES.ADMIN,
            lazy: async () => ({ Component: (await import('@/pages/AdminPage')).AdminPage }),
          },
        ],
      },
      {
        path: '*',
        lazy: async () => ({ Component: (await import('@/pages/NotFoundPage')).NotFoundPage }),
      },
    ],
  },
  {
    // Login lives outside the main layout (no sidebar), and logged-in users are bounced away
    element: <GuestOnly />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.LOGIN,
        lazy: async () => ({ Component: (await import('@/pages/LoginPage')).LoginPage }),
      },
    ],
  },
]);
