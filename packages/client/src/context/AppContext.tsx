import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';

import jwtDecode from 'jwt-decode';

import { ApiCalls, ApiState, AppContext, AuthState } from '@interfaces/context';
import { User, UserToken } from '@interfaces/shared';
import axios from '@services/axios';
import ls from '@services/localStorage';
import { LS, USER_API } from '@utils/constants';
import { AxiosResponse } from 'axios';

// Context
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
  const [apiState, setApiState] = useState<ApiState>({
    loading: false,
    errorDismised: true,
  });
  // Auth state
  const [authState, setAuthState] = useState<AuthState>({});

  // General helpers
  const callHandler = async (promise: Promise<any>) => {
    try {
      return await promise;
    } catch (err) {
      setApiState({ error: err, errorDismised: false, loading: false });
    }

    return undefined;
  };

  /**
   * Sets the error prop as undefined in the `ApiState`
   */
  const onClearError = () => {
    setApiState((prev) => ({ ...prev, errorDismised: true }));
  };

  // User helpers
  const getUser = async (token: UserToken) => {
    const get: AxiosResponse = await callHandler(
      axios.get(`${USER_API.GET}${token.ui}`),
    );

    if (get) {
      setApiState((prev) => ({ ...prev, loading: false }));
      setAuthState({ token, user: get.data });
    }
  };

  const api: ApiCalls = {
    user: {
      login: async (email: string, password: string) => {
        setApiState((prev) => ({ ...prev, loading: true }));

        const login: AxiosResponse = await callHandler(
          axios.post(USER_API.LOGIN, { email, password }),
        );

        if (login) {
          const token: UserToken = jwtDecode(login.data);

          getUser(token);
          ls.set(LS.JWT, login.data);
        }
      },
      register: async (data: Partial<User>) => {
        setApiState((prev) => ({ ...prev, loading: true }));

        const register: AxiosResponse = await callHandler(
          axios.post(USER_API.REGISTER, data),
        );

        if (register) {
          setApiState((prev) => ({ ...prev, loading: false }));
          setAuthState({ user: register.data });
        }
      },
    },
  };

  // Check if user has active token
  useEffect(() => {
    const value = ls.get(LS.JWT);

    if (value) {
      // If there's an existing token, use
      const token: UserToken = jwtDecode(value);

      if (token.exp < new Date()) {
        // If date not expired, use the token to log the user in
        getUser(token);
      }
    }
  }, []);

  return {
    api: { ...api, ...apiState, clearError: onClearError },
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
