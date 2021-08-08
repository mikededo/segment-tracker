import jwtConfig from '@config/jwt.config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('jwtConfig', () => {
  let config: ConfigType<typeof jwtConfig>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(jwtConfig)],
    }).compile();

    config = module.get<ConfigType<typeof jwtConfig>>(jwtConfig.KEY);
  });

  it('should be defined', () => {
    expect(config).toBeDefined();
  });

  it('should contain expire time and secret key', () => {
    expect(config.expireTime).toBeDefined();
    expect(config.secretKey).toBeDefined();
  });
});
