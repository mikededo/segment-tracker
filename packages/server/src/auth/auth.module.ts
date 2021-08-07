import jwtConfig from '@config/jwt.config';
import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '@user/user.service';

import { AuthService } from './auth.service';
import { LoginController } from './login.controller';
import { RegisterController } from './register.controller';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      useFactory: (config: ConfigType<typeof jwtConfig>) => ({
        secret: config.secretKey,
        signOptions: { expiresIn: config.expireTime },
      }),
      inject: [jwtConfig.KEY],
    }),
  ],
  providers: [UserService, AuthService, LocalStrategy],
  controllers: [RegisterController, LoginController],
})
export class AuthModule {}
