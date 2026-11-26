import '../src/styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App.tsx';
import { AppProviders } from './app/providers.tsx';
import { AppErrorBoundary } from './components/errors/AppErrorBoundary.tsx';
import { registerGlobalErrorHandlers } from './app/global-errors.ts';

registerGlobalErrorHandlers();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <AppProviders>
        <App />
      </AppProviders>
    </AppErrorBoundary>
  </StrictMode>,
);
