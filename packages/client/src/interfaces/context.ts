import { User, UserToken } from './shared';

export interface AuthState {
  token?: UserToken;
  user?: User;
}

export interface UserApiCalls {
  login: (email: string, password: string) => void;
  register: (user: Partial<User>) => void;
}

export interface ApiCalls {
  user: UserApiCalls;
}

export interface ApiState {
  loading: boolean;
  error?: string;
}

export interface AppContext {
  auth: Readonly<AuthState>;
  api: Readonly<ApiState & ApiCalls>;
}
