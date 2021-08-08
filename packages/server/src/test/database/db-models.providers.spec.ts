import { Connection, Model } from 'mongoose';

import { dbModelsProviders } from '@database/db-models.providers';
import { User } from '@models/user.model';
import { Test, TestingModule } from '@nestjs/testing';
import { PROVIDERS } from '@shared/constants';

describe('dbModelsProviders', () => {
  let connection: Connection;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...dbModelsProviders,
        {
          provide: PROVIDERS.DB,
          useValue: {
            model: jest.fn().mockReturnValue({} as Model<User>),
          },
        },
      ],
    }).compile();

    connection = module.get<Connection>(PROVIDERS.DB);
    userModel = module.get<Model<User>>(PROVIDERS.MODELS.USER);
  });

  it(`${PROVIDERS.DB} should be defined`, () => {
    expect(connection).toBeDefined();
  });

  it(`${PROVIDERS.MODELS.USER} should be defined`, () => {
    expect(userModel).toBeDefined();
  });
});
