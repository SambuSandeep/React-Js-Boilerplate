import z from 'zod';

export const roleSchema = z.enum(['admin', 'user']);

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

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
export type LoginCredentials = z.infer<typeof loginSchema>;
