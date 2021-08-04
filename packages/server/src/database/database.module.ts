import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongoConfig from '../config/mongo.config';
import { dbConnectionProviders } from './db-connection.providers';
import { DbModels } from './db-models';

@Module({
  imports: [ConfigModule.forFeature(mongoConfig)],
  providers: [...dbConnectionProviders, DbModels],
  exports: [...dbConnectionProviders, DbModels],
})
export class DatabaseModule {}
