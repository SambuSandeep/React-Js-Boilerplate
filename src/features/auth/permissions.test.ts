import { describe, expect, it } from 'vitest';

import { hasAnyRole } from './permissions';
import type { User } from './types';

const user: User = { id: '1', name: 'Ann', email: 'a@x.com', role: ['user'] };

describe('hasAnyRole', () => {
  it('returns true when the user has one of the roles', () => {
    expect(hasAnyRole(user, ['admin', 'user'])).toBe(true);
  });

  it('returns false when the user lacks the roles', () => {
    expect(hasAnyRole(user, ['admin'])).toBe(false);
  });

  it('returns false when there is no user', () => {
    expect(hasAnyRole(null, ['admin'])).toBe(false);
  });
});
