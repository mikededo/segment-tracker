import { Module } from '@nestjs/common';
import { DbModels } from './db-models';

@Module({
  providers: [DbModels],
})
export class DatabaseModule {}
