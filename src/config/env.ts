import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  VITE_AUTH_MOCK: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
});

const result = envSchema.safeParse(import.meta.env);

if (!result.success) {
  const details = result.error.issues
    .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  console.error(`Invalid environment variables:\n${details}`);
  throw new Error('Invalid environment variables. Check the console and .env.example.');
}

export const env = result.data;
