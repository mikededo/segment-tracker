import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LocalGuard } from './local.guard';

describe('LocalGuard', () => {
  let guard: LocalGuard;

  beforeEach(() => {
    guard = new LocalGuard();
  });

  it('should be defined', () => {
    expect(new LocalGuard()).toBeDefined();
  });

  it('should return true for `canActivate`', async () => {
    AuthGuard('local').prototype.canActivate = jest.fn(() =>
      Promise.resolve(true),
    );
    AuthGuard('local').prototype.logIn = jest.fn(() => Promise.resolve());

    expect(await guard.canActivate({} as ExecutionContext)).toBe(true);
  });
});
