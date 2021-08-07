import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { RegisterController } from './register.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, AuthService],
  controllers: [RegisterController],
})
export class AuthModule {}
