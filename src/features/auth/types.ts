import z from 'zod';

export const roleSchema = z.enum(['admin', 'user']);

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.array(roleSchema),
});

export const sessionSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
});

export type Role = z.infer<typeof roleSchema>;
export type User = z.infer<typeof userSchema>;
export type Session = z.infer<typeof sessionSchema>;

export interface LoginCredentials {
  email: string;
  password: string;
}
