import React from 'react';

import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAppContext } from '@context/AppContext';
import { AppRouteProps } from '@interfaces/routes';

const PrivateRoute: React.FC<AppRouteProps & RouteProps> = ({
  component: Component,
  ...routeProps
}: AppRouteProps) => {
  const { auth } = useAppContext();

  return (
    <Route
      {...routeProps}
      render={(props) =>
        auth.user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
