import { Response } from 'express';
import { lastValueFrom, of } from 'rxjs';

import { Test, TestingModule } from '@nestjs/testing';
import { AccessToken } from '@shared/interfaces';

import { AuthService } from './auth.service';
import { LoginController } from './login.controller';
import { createMock } from '@golevelup/ts-jest';

describe('LoginController', () => {
  let controller: LoginController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            contructor: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Login', () => {
    it('should return token on correct access', async () => {
      jest
        .spyOn(authService, 'login')
        .mockImplementation((user: any) =>
          of({ token: 'mock_token' } as AccessToken),
        );

      const responseMock = createMock<Response>({
        header: jest.fn().mockReturnValue({
          json: jest.fn().mockReturnValue({
            send: jest.fn().mockReturnValue({
              header: { Authorization: 'Bearer mock_token' },
            }),
          }),
        }),
      });

      const response = await lastValueFrom(
        controller.login({} as any, responseMock),
      );

      expect(response).toBeTruthy();
      expect(authService.login).toBeCalled();
    });
  });
});
