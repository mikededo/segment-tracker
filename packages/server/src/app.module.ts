import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    RouterModule.register([{ path: 'auth', module: AuthModule }]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
