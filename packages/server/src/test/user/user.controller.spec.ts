import { lastValueFrom, of } from 'rxjs';

import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: { findById: jest.fn() } }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get', () => {
    it('should return the user given their id', async () => {
      jest.spyOn(service, 'findById').mockImplementationOnce((id: string) =>
        of({
          email: 'mock@data.com',
          password: '12345',
          firstName: 'Jest',
          lastName: 'Test',
        } as any),
      );

      const user = await lastValueFrom(controller.getUser('00000'));

      expect(user).toEqual({
        email: 'mock@data.com',
        password: '12345',
        firstName: 'Jest',
        lastName: 'Test',
      });
      expect(service.findById).toBeCalledWith('00000');
    });
  });

  describe('Put', () => {
    it('should return the updated user if id is valid', async () => {
      //jest.spyOn()
    });
  });
});
