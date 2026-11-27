import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.ts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: false,
      clearMocks: true,
      env: {
        VITE_API_URL: 'http://localhost:3000/api',
        VITE_APP_ENV: 'development',
        VITE_AUTH_MOCK: 'false',
      },
    },
  }),
);
