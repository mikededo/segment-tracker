import { User } from '@database/model/user.model';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterDto } from '@shared/dto';
import { UserService } from '@user/user.service';
import { firstValueFrom, of } from 'rxjs';
import { RegisterController } from './register.controller';

describe('RegisterController', () => {
  let controller: RegisterController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            existingEmail: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    const genApiResponseMock = () => ({
      location: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    });

    it('should register a user when user data is valid', async () => {
      const existingEmailSpy = jest
        .spyOn(service, 'existingEmail')
        .mockReturnValue(of(false));
      const registerSpy = jest
        .spyOn(service, 'register')
        .mockReturnValue(of({ _id: '123' } as User));

      // Mock express response
      const apiResponseMock = genApiResponseMock() as any;

      const responseSpy = {
        location: jest.spyOn(apiResponseMock, 'location'),
        status: jest.spyOn(apiResponseMock, 'status'),
        send: jest.spyOn(apiResponseMock, 'send'),
      };

      const registerData: RegisterDto = {
        email: 'mock@data.com',
        password: '12345',
        firstName: 'Jest',
        lastName: 'Test',
        // Other fields are optional
      };

      // Execute register call
      await firstValueFrom(controller.register(registerData, apiResponseMock));

      expect(existingEmailSpy).toBeCalledWith('mock@data.com');
      expect(registerSpy).toBeCalledTimes(1);
      expect(responseSpy.location).toBeCalled();
      expect(responseSpy.status).toBeCalled();
      expect(responseSpy.send).toBeCalled();
    });

    it('should thorw an error if email already exists', async () => {
      const existingEmailSpy = jest
        .spyOn(service, 'existingEmail')
        .mockReturnValue(of(true));
      const registerSpy = jest
        .spyOn(service, 'register')
        .mockReturnValue(of({} as User));
      const apiResponseMock = genApiResponseMock() as any;

      // try-catch block to handle the ConflictException
      try {
        await firstValueFrom(
          controller.register(
            { email: 'mock@data.com' } as any,
            apiResponseMock,
          ),
        );
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(ConflictException);

        expect(error.message).toBeDefined();
        expect(error.message).toBe('Existing email: mock@data.com');

        expect(existingEmailSpy).toBeCalledWith('mock@data.com');
        expect(existingEmailSpy).toBeCalledTimes(1);
        expect(registerSpy).toBeCalledTimes(0);
      }
    });
  });
});
