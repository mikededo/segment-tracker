import axios from '@api/axios';
import { ApiCalls, ApiState, AppContext, AuthState } from '@interfaces/context';
import { User, UserToken } from '@interfaces/shared';
import jwtDecode from 'jwt-decode';
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
} from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppStateContext = createContext<AppContext>({} as any);
AppStateContext.displayName = 'AppStateContext';

export const useAppContext = (): AppContext => {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppStatecontext');
  }

  return context;
};

const loadContext = (): AppContext => {
  // Api state
  const [apiState, setApiState] = useState<ApiState>({ loading: false });
  // Auth state
  const [authState, setAuthState] = useState<AuthState>({});

  const api: ApiCalls = {
    user: {
      login: async (email: string, password: string) => {
        setApiState((prev) => ({ ...prev, loading: true }));

        try {
          const login = await axios.post('/auth/login', { email, password });
          const token: UserToken = jwtDecode(login.data);

          const get = await axios.get(`/users/${token.ui}`);
          setApiState((prev) => ({ ...prev, loading: false }));
          setAuthState({ token, user: get.data });
        } catch (e) {
          setApiState({ error: e, loading: false });
        }
      },
      register: async (data: Partial<User>) => {
        setApiState((prev) => ({ ...prev, loading: true }));

        try {
          const register = await axios.post('/auth/register', data);

          setApiState((prev) => ({ ...prev, loading: false }));
          setAuthState({ user: register.data });
        } catch (e) {
          setApiState({ error: e, loading: false });
        }
      },
    },
  };

  return {
    api: { ...api, ...apiState },
    auth: authState,
  };
};

export const AppContextProvider: FunctionComponent = ({ children }) => {
  const context = loadContext();

  return (
    <AppStateContext.Provider value={context}>
      {children}
    </AppStateContext.Provider>
  );
};
