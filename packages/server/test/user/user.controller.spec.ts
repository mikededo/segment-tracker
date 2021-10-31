import { firstValueFrom, lastValueFrom, Observable, of } from 'rxjs';

import { User } from '@database/model/user.model';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserDto } from '@shared/dto/update.users';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  let apiResponseMock: any;
  let responseSpy: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: { findById: jest.fn(), update: jest.fn() }
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);

    apiResponseMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    } as any;
    responseSpy = {
      status: jest.spyOn(apiResponseMock, 'status'),
      send: jest.spyOn(apiResponseMock, 'send')
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUser', () => {
    it('should return the user given their id', async () => {
      const findByIdSpy = jest
        .spyOn(service, 'findById')
        .mockImplementationOnce((id: string) =>
          of({
            email: 'mock@data.com',
            password: '12345',
            firstName: 'Jest',
            lastName: 'Test'
          } as any)
        );

      const user = await lastValueFrom(
        controller.getUser('00000', apiResponseMock)
      );

      expect(user).toBeDefined();
      expect(findByIdSpy).toBeCalledWith('00000');

      expect(responseSpy.status).toBeCalled();
      expect(responseSpy.send).toBeCalled();
    });
  });

  describe('updateUser', () => {
    const updatedData: UpdateUserDto = {
      firstName: 'ModifiedJest',
      lastName: 'ModifiedTest',
      password: 'modifiedPassword'
    };
    let updateSpy: jest.SpyInstance<Observable<User>>;

    beforeEach(() => {
      updateSpy = jest.spyOn(service, 'update');
    });

    it('should return the updated user if id is valid', async () => {
      updateSpy.mockImplementationOnce((id: string, user: UpdateUserDto) =>
        of({
          id: '00000',
          email: 'modified.mock@data.com',
          firstName: 'ModifiedJest',
          lastName: 'ModifiedTest',
          password: 'modifiedPassword'
        } as User)
      );

      const updated = await firstValueFrom(
        controller.updateUser('00000', updatedData, apiResponseMock)
      );

      expect(updateSpy).toBeCalledTimes(1);
      expect(updateSpy).toBeCalledWith('00000', updatedData);

      expect(responseSpy.status).toBeCalled();
      expect(responseSpy.send).toBeCalled();
      // Should return id & email but not be called with it
      expect(responseSpy.send).toBeCalledWith({
        id: '00000',
        email: 'modified.mock@data.com',
        firstName: 'ModifiedJest',
        lastName: 'ModifiedTest',
        password: 'modifiedPassword'
      });

      expect(updated).toBeDefined();
    });
  });
});
