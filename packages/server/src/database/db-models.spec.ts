import { Test, TestingModule } from '@nestjs/testing';
import { DbModels } from './db-models';

describe('DbModels', () => {
  let provider: DbModels;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbModels],
    }).compile();

    provider = module.get<DbModels>(DbModels);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
