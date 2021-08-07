import { User } from '@database/model/user.model';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@user/user.service';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            constructor: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            constructor: jest.fn(),
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('ValidateUser', () => {
    const onError = (error: any) => {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.message).toBe('username or password not matched');
    };

    it('should work if user email is found', async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockImplementation((email: string) =>
          of({
            email,
            password: 'password',
            comparePassword: (password: string) => of(true),
          } as User),
        );

      authService
        .validateUser('mock@data.com', 'password')
        .subscribe((data) => {
          expect(data.email).toBe('mock@data.com');
        });
    });

    it('should throw an exception if user email is found but password does not match', async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockImplementation((email: string) =>
          of({
            email,
            password: 'password',
            comparePassword: (password: string) => of(false),
          } as User),
        );

      authService.validateUser('mock@data.com', 'password').subscribe({
        error: onError,
      });
    });

    it('should throw an exception if user emails is not found', async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockImplementation((email: string) => of(null as User));

      authService.validateUser('mock@data.com', 'password').subscribe({
        error: onError,
      });
    });
  });

  describe('JwtToken login', () => {
    it('should return signed token', async () => {
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('test_token');

      authService
        .login({
          id: '12345',
          email: 'mock@data.com',
        })
        .subscribe({
          next: (data) => {
            expect(data.token).toBe('test_token');
            expect(jwtService.signAsync).toBeCalledTimes(1);
            expect(jwtService.signAsync).toBeCalledWith({
              ui: '12345',
              ue: 'mock@data.com',
            });
          },
        });
    });
  });
});
