import jwtConfig from '@config/jwt.config';
import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@user/user.module';

import { AuthService } from './auth.service';
import { LoginController } from './login.controller';
import { RegisterController } from './register.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    DatabaseModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      useFactory: (config: ConfigType<typeof jwtConfig>) =>
        ({
          secret: config.secretKey,
          signOptions: { expiresIn: config.expireTime }
        } as JwtModuleOptions),
      inject: [jwtConfig.KEY]
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [RegisterController, LoginController],
  exports: [AuthService]
})
export class AuthModule {}
