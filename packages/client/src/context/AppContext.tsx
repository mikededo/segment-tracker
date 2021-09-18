import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';

import { AxiosRequestConfig, AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';

import {
  ApiCalls,
  ApiState,
  AppContext,
  AuthState,
  SegmentState,
} from '@interfaces/context';
import { Segment, UserToken } from '@interfaces/shared';
import axios from '@services/axios';
import ls from '@services/localStorage';
import { LS, SEGMENT_API, USER_API } from '@utils/constants';

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

  // Segment state
  const [segmentState, setSegmentState] = useState<SegmentState>({
    segments: [],
    active: null,
  });

  // General helpers
  const callHandler = async (promise: Promise<any>) => {
    try {
      return await promise;
    } catch (err) {
      setApiState({ error: err, errorDismised: false, loading: false });
    }

    return undefined;
  };

  const onStartCall = () => {
    setApiState((prev) => ({ ...prev, loading: true }));
  };

  const onFinishCall = () => {
    setApiState((prev) => ({ ...prev, loading: false }));
  };

  const onAuthCall = (cb: (config: AxiosRequestConfig) => void): void => {
    if (authState.token) {
      cb({ headers: { Authorization: `Bearer ${authState.token}` } });
    } else {
      setApiState({
        error: {
          error: '',
          message: 'An error occurred. Log in again.',
          statusCode: 401,
        },
        errorDismised: false,
        loading: false,
      });
      // Remove the user from the state
      setAuthState({});
      // Remove the token
      ls.rm(LS.JWT);
    }
  };

  /**
   * Sets the error prop as undefined in the `ApiState`
   */
  const onClearError = () => {
    setApiState((prev) => ({ ...prev, errorDismised: true }));
  };

  const onClearActiveSegment = () => {
    setSegmentState((prev) => ({ ...prev, active: null }));
  };

  // User helpers
  const getUser = async (token: string) => {
    const parsedToken: UserToken = jwtDecode(token);

    const get: AxiosResponse = await callHandler(
      axios.get(`${USER_API.GET}/${parsedToken.ui}`),
    );

    onFinishCall();
    setAuthState({ token, user: get.data });
  };

  const api: ApiCalls = {
    user: {
      login: async (email, password) => {
        onStartCall();

        const login: AxiosResponse = await callHandler(
          axios.post(USER_API.LOGIN, { email, password }),
        );

        getUser(login.data);
        ls.set(LS.JWT, login.data);
      },
      register: async (data) => {
        onStartCall();

        const register: AxiosResponse = await callHandler(
          axios.post(USER_API.REGISTER, data),
        );

        onFinishCall();
        setAuthState({ user: register.data });
      },
    },
    segments: {
      getAll: () => {
        onAuthCall(async (config) => {
          onStartCall();

          const res: AxiosResponse<Segment[]> = await callHandler(
            axios.get(SEGMENT_API.BASE, config),
          );

          setSegmentState({ segments: res.data, active: null });
          onFinishCall();
        });
      },
      getSingle: (id) => {
        onAuthCall(async (config) => {
          onStartCall();

          const res: AxiosResponse<Segment> = await callHandler(
            axios.get(`${SEGMENT_API.BASE}/${id}`, config),
          );

          setSegmentState((prev) => ({ ...prev, active: res.data }));
          onFinishCall();
        });
      },
      post: (segment) => {
        onAuthCall(async (config) => {
          onStartCall();

          // `res` contains the created segment data
          const res: AxiosResponse<Segment> = await callHandler(
            axios.post(SEGMENT_API.BASE, segment, config),
          );

          setSegmentState((prev) => ({ ...prev, active: res.data }));
          onFinishCall();
        });
      },
      patch: (id, segment) => {
        onAuthCall(async (config) => {
          onStartCall();

          await callHandler(
            axios.patch(`${SEGMENT_API.BASE}/${id}`, segment, config),
          );

          setSegmentState((prev) => ({
            ...prev,
            active: Object.assign(prev.active, segment),
          }));
          onFinishCall();
        });
      },
      delete: (id) => {
        onAuthCall(async (config) => {
          onStartCall();

          await callHandler(axios.delete(`${SEGMENT_API.BASE}/${id}`, config));

          setSegmentState((prev) => ({
            segments: [...prev.segments],
            active: null,
          }));
          onFinishCall();
        });
      },
    },
  };

  // Check if user has active token
  useEffect(() => {
    const value = ls.get(LS.JWT);

    if (value) {
      // If there's an existing token, use
      const token: UserToken = jwtDecode(value);

      if (token.exp * 1000 > Date.now()) {
        // If date not expired, use the token to log the user in
        getUser(value);
      }
    }
  }, []);

  return {
    api: { ...api, ...apiState, clearError: onClearError },
    auth: authState,
    segments: { ...segmentState, clearActive: onClearActiveSegment },
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
