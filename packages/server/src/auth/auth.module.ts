import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { RegisterController } from './register.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService],
  controllers: [RegisterController],
})
export class AuthModule {}
