import { Strategy } from 'passport-local';

import { AuthService } from '@auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserFromClaims } from '@shared/interfaces';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      emailField: 'email',
      passwordField: 'password',
    });
  }

  async validateUser(email: string, password: string): Promise<UserFromClaims> {
    const user: UserFromClaims = await lastValueFrom(
      this.authService.validateUser(email, password),
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
