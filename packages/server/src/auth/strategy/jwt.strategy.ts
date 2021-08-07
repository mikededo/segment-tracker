import { ExtractJwt, Strategy } from 'passport-jwt';

import jwtConfig from '@config/jwt.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtUserPayload, UserFromClaims } from '@shared/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(jwtConfig.KEY) config: ConfigType<typeof jwtConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secretKey,
    });
  }

  /**
   * Parses the JwtClaims
   */
  parse(payload: JwtUserPayload): UserFromClaims {
    return { id: payload.ui, email: payload.ue };
  }
}
