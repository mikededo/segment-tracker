import { ConfigType } from '@nestjs/config';
import { Connection, createConnection } from 'mongoose';
import mongoConfig from '../config/mongo.config';

export const dbConnectionProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (dbConfig: ConfigType<typeof mongoConfig>): Connection =>
      createConnection(dbConfig.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      }),
    inject: [mongoConfig.KEY],
  },
];
