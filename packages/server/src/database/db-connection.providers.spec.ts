import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, createConnection } from 'mongoose';

import mongoConfig from '../config/mongo.config';
import { PROVIDERS } from '../shared/constants';
import { dbConnectionProviders } from './db-connection.providers';

jest.mock('mongoose', () => ({
  createConnection: jest
    .fn()
    .mockImplementation((uri: any, options: any) => ({} as any)),
  Connection: jest.fn(),
}));

describe('dbConnectionProviders', () => {
  let connection: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(mongoConfig)],
      providers: [...dbConnectionProviders],
    }).compile();

    connection = module.get<Connection>(PROVIDERS.DB);
  });

  it(`${PROVIDERS.DB} should be defined`, () => {
    expect(connection).toBeDefined();
  });

  it('connect should be called', () => {
    expect(createConnection).toHaveBeenCalledWith('mongodb://localhost', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
  });
});
