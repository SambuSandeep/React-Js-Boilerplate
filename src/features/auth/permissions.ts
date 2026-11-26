import type { Role, User } from './types';

export function hasAnyRole(user: User | null, roles: readonly Role[]) {
  return user !== null && roles.some((role) => user.role.includes(role));
}
