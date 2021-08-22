import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import mongoConfig from '@config/mongo.config';
import { dbConnectionProviders } from './db-connection.providers';
import { dbModelsProviders } from './db-models.providers';

@Module({
  imports: [ConfigModule.forFeature(mongoConfig)],
  providers: [...dbConnectionProviders, ...dbModelsProviders],
  exports: [...dbConnectionProviders, ...dbModelsProviders],
})
export class DatabaseModule {}
