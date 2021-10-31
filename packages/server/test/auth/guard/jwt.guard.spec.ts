import { JwtGuard } from '@auth/guard/jwt.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

describe('JwtGuard', () => {
  let guard: JwtGuard;

  beforeEach(() => {
    guard = new JwtGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true for `canActivate`', async () => {
    AuthGuard('jwt').prototype.canActivate = jest.fn(() =>
      Promise.resolve(true)
    );
    AuthGuard('jwt').prototype.logIn = jest.fn(() => Promise.resolve());

    const ctxMock: ExecutionContext = {
      getArgByIndex: jest.fn(),
      getArgs: jest.fn(),
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getType: jest.fn(),
      switchToHttp: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn()
    };

    expect(await guard.canActivate(ctxMock)).toBeTruthy();
  });

  describe('HandleRequest', () => {
    it('should return the user if there are no errors', async () => {
      expect(
        await guard.handleRequest(
          undefined,
          { email: 'mock@data.com' },
          undefined
        )
      ).toEqual({ email: 'mock@data.com' });
    });

    it('should return an error if there is one', async () => {
      const error = { name: 'mock', message: 'error' } as Error;

      expect.assertions(1);
      try {
        guard.handleRequest(error, {}, {});
      } catch (e) {
        expect(e).toEqual(error);
      }
    });

    it('should return Unauthorized exception if there is no user nor errors', async () => {
      expect.assertions(2);
      try {
        guard.handleRequest(undefined, undefined, undefined);
      } catch (e) {
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
