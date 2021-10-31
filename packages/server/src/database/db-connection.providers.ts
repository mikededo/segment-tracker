import { Connection, createConnection } from 'mongoose';

import mongoConfig from '@config/mongo.config';
import { ConfigType } from '@nestjs/config';
import { PROVIDERS } from '@shared/constants';

export const dbConnectionProviders = [
  {
    provide: PROVIDERS.DB,
    useFactory: (dbConfig: ConfigType<typeof mongoConfig>): Connection =>
      createConnection(dbConfig.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }),
    inject: [mongoConfig.KEY]
  }
];
