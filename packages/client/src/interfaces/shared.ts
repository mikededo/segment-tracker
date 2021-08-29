import { Gender, Level } from './enums';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  weight: number;
  height: number;
  gender: Gender;
  level: Level;
}

export interface UserToken {
  ui: string;
  ue: string;
  iat: Date;
  exp: Date;
}
