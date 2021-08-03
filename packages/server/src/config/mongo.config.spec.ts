import { ConfigModule, ConfigType } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import mongodbConfig from './mongo.config';

describe('mongodbConfig', () => {
  let config: ConfigType<typeof mongodbConfig>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(mongodbConfig)],
    }).compile();

    config = module.get<ConfigType<typeof mongodbConfig>>(mongodbConfig.KEY);
  });

  it('should be defined', () => {
    expect(config).toBeDefined();
  });

  it('should contain a uri', () => {
    expect(config.uri).toBe('mongodb://localhost');
  });
});
