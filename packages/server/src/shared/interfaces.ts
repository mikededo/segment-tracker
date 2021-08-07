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
