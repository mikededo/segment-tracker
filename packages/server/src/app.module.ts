import { AuthModule } from '@auth/auth.module';
import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserService } from '@user/user.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SegmentModule } from './segment/segment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    RouterModule.register([{ path: 'auth', module: AuthModule }]),
    AuthModule,
    UserModule,
    SegmentModule
  ],
  controllers: [AppController],
  providers: [AppService, UserService]
})
export class AppModule {}
