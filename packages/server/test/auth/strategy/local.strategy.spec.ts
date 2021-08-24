import { of } from 'rxjs';

import { AuthService } from '@auth/auth.service';
import { LocalStrategy } from '@auth/strategy/local.strategy';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserFromClaims } from '@shared/interfaces';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            constructor: jest.fn(),
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
    service = module.get<AuthService>(AuthService);
  });

  describe('ValidateUser', () => {
    it('should return UserFromClaims if user and password are provided', async () => {
      jest
        .spyOn(service, 'validateUser')
        .mockImplementation((email: string, password: string) =>
          of({
            id: '12345',
            email,
          } as UserFromClaims),
        );

      const user = await strategy.validate('mock@data.com', '12345');

      expect(user.email).toEqual('mock@data.com');
      expect(user.id).toEqual('12345');
      expect(service.validateUser).toBeCalledWith('mock@data.com', '12345');
    });

    it('should throw exception if user is not valid', async () => {
      jest
        .spyOn(service, 'validateUser')
        .mockImplementation((email: string, password: string) =>
          of(null as UserFromClaims),
        );

      expect.assertions(2);
      try {
        await strategy.validate('mock@data.com', '12345');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
