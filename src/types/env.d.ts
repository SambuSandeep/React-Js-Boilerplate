interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_ENV: 'development' | 'staging' | 'production';
  readonly VITE_AUTH_MOCK: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
