import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@auth/auth.module';
import { UserService } from '@user/user.service';
import { UserModule } from './user/user.module';
import { SegmentModule } from './segment/segment.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    RouterModule.register([{ path: 'auth', module: AuthModule }]),
    AuthModule,
    UserModule,
    SegmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
