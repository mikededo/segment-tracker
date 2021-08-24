import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  uri: 'mongodb://localhost',
}));
