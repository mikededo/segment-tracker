import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import { PROVIDERS } from '../shared/constants';
import { User } from '../database/model/user.model';
import { firstValueFrom } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PROVIDERS.MODELS.USER,
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn(),
            exists: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(PROVIDERS.MODELS.USER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save an user', async () => {
    const data = {
      email: 'mock@data.com',
      password: 'mockpassword',
      firstName: 'Mock',
      lastName: 'Data',
    };

    const createSpy = jest
      .spyOn(model, 'create')
      .mockImplementation(() => Promise.resolve({ ...data } as any));

    const result = await firstValueFrom(service.register(data));
    expect(createSpy).toBeCalledWith({ ...data });
  });

  it('findByUsername should return the user of the current username', async () => {
    // Mock schema findOne
    jest.spyOn(model, 'findOne').mockImplementation((conditions: any) => {
      return {
        exec: jest.fn().mockResolvedValue({
          email: 'mock@data.com',
          firstName: 'Mock',
          lastName: 'Data',
        } as User),
      } as any;
    });

    const found = await firstValueFrom(service.findByEmail('mock@data.com'));

    expect(found).toEqual({
      email: 'mock@data.com',
      firstName: 'Mock',
      lastName: 'Data',
    });
    expect(model.findOne).lastCalledWith({ email: 'mock@data.com' });
    expect(model.findOne).toBeCalledTimes(1);
  });

  it('findByid should return the user of the current _id', async () => {
    // Mock schema findById
    jest.spyOn(model, 'findById').mockImplementation((id: any) => {
      return {
        exec: jest.fn().mockResolvedValue({
          email: 'mock@data.com',
          firstName: 'Mock',
          lastName: 'Data',
        } as User),
      } as any;
    });

    const found = await firstValueFrom(service.findById('123'));

    expect(found).toEqual({
      email: 'mock@data.com',
      firstName: 'Mock',
      lastName: 'Data',
    });
    expect(model.findById).lastCalledWith('123');
    expect(model.findById).toBeCalledTimes(1);
  });

  describe('existingEmail', () => {
    it('should return true if email exists', async () => {
      const existsSpy = jest
        .spyOn(model, 'exists')
        .mockImplementation(() => Promise.resolve(true));
      const result = await firstValueFrom(
        service.existingEmail('mock@data.com'),
      );

      expect(existsSpy).toBeCalledWith({ email: 'mock@data.com' });
      expect(existsSpy).toBeCalledTimes(1);
      expect(result).toBeTruthy();
    });

    it('should return true if email does not exists', async () => {
      const existsSpy = jest
        .spyOn(model, 'exists')
        .mockImplementation(() => Promise.resolve(false));
      const result = await firstValueFrom(
        service.existingEmail('invalid@email.com'),
      );

      expect(existsSpy).toBeCalledWith({ email: 'invalid@email.com' });
      expect(existsSpy).toBeCalledTimes(1);
      expect(result).toBeFalsy();
    });
  });
});
