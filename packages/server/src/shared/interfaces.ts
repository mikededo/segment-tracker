import { Request } from 'express';

export interface UserFromClaims {
  readonly id: string;

  readonly email: string;
}

export interface JwtUserPayload {
  readonly ui: string;

  readonly ue: string;
}

export interface AccessToken {
  readonly token: string;
}

export interface AuthenticatedRequest extends Request {
  readonly user: UserFromClaims;
}
