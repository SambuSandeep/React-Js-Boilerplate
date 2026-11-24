import { createBrowserRouter } from 'react-router';

import { RootLayout } from '@/components/layout/RootLayout';
import { ROUTES } from '@/config/routes';
import { ErrorPage } from '@/pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('@/pages/HomePage')).HomePage,
        }),
      },
      {
        path: ROUTES.ABOUT,
        lazy: async () => ({
          Component: (await import('@/pages/AboutPage')).AboutPage,
        }),
      },
      {
        path: '*',
        lazy: async () => ({
          Component: (await import('@/pages/NotFoundPage')).NotFoundPage,
        }),
      },
    ],
  },
]);
