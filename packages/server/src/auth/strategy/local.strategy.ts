import { Strategy } from 'passport-local';
import { lastValueFrom } from 'rxjs';

import { AuthService } from '@auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserFromClaims } from '@shared/interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(email: string, password: string): Promise<UserFromClaims> {
    const user: UserFromClaims = await lastValueFrom(
      this.authService.validateUser(email, password)
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
