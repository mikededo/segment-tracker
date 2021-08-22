import { mock } from 'jest-mock-extended';

import { JwtStrategy } from '@auth/strategy/jwt.strategy';
import jwtConfig from '@config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let config: ConfigType<typeof jwtConfig>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: jwtConfig.KEY,
          useValue: {
            secretKey: 'test_key',
            expireTime: '1s',
          },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    config = module.get<ConfigType<typeof jwtConfig>>(jwtConfig.KEY);
  });

  it('should decode the claims payload to a user', async () => {
    expect(config.expireTime).toBeDefined();
    expect(config.secretKey).toBeDefined();

    const user = strategy.validate({
      ui: 'testid',
      ue: 'mock@data.com',
    });

    expect(user.id).toEqual('testid');
    expect(user.email).toEqual('mock@data.com');
  });

  describe('JwtStrategy', () => {
    let local: any;
    let parentMock: any;

    beforeEach(() => {
      local = Object.getPrototypeOf(JwtStrategy);
      parentMock = jest.fn();
      Object.setPrototypeOf(JwtStrategy, parentMock);
    });

    afterEach(() => {
      Object.setPrototypeOf(JwtStrategy, local);
    });

    it('should call super()', () => {
      const config = mock<ConfigType<typeof jwtConfig>>();
      config.secretKey = 'test_key';

      new JwtStrategy(config);
      expect(parentMock.mock.calls.length).toBe(1);

      expect(parentMock.mock.calls[0][0].jwtFromRequest).toBeDefined();
      expect(parentMock.mock.calls[0][0].ignoreExpiration).toBeFalsy();
      expect(parentMock.mock.calls[0][0].secretOrKey).toEqual('test_key');
    });
  });
});
