import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AccessToken,
  JwtUserPayload,
  UserFromClaims,
} from '@shared/interfaces';
import { UserService } from '@user/user.service';
import { EMPTY, map, mergeMap, Observable, throwIfEmpty, of, from } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  /**
   * Validates if the user data exists in the database. If so, checks
   * if the user password matches the entered password
   */
  validateUser(email: string, password: string): Observable<UserFromClaims> {
    return this.userService.findByEmail(email).pipe(
      mergeMap((user) => (user ? of(user) : EMPTY)),
      throwIfEmpty(
        () => new UnauthorizedException(`username or password not matched`),
      ),
      mergeMap((user) =>
        user.comparePassword(password).pipe(
          map((valid) => {
            if (valid) {
              return {
                id: user.id,
                email: user.email,
              } as UserFromClaims;
            } else {
              throw new UnauthorizedException(
                `username or password not matched`,
              );
            }
          }),
        ),
      ),
    );
  }

  /**
   * Once the user has been validated, returns the token key
   * to be used as the beare token
   */
  login(user: UserFromClaims): Observable<AccessToken> {
    console.log(user);
    const claimsPayload: JwtUserPayload = {
      ui: user.id,
      ue: user.email,
    };

    return from(this.jwtService.signAsync(claimsPayload)).pipe(
      map((token) => ({ token } as AccessToken)),
    );
  }
}
