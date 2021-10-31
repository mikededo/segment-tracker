import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secretKey: 'thisisarandomkey',
  expireTime: '36000s',
}));
