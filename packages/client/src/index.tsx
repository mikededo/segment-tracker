import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch } from 'react-router-dom';

import AppTheme from '@config/Theme';
import { AppContextProvider } from '@context/AppContext';
import { ThemeProvider } from '@mui/material';
import NotFoundRoute from '@routes/NotFoundRoute';
import PrivateRoute from '@routes/PrivateRoute';
import PublicRoute from '@routes/PublicRoute';
import Home from '@views/Home';
import Login from '@views/Login';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={AppTheme}>
      <AppContextProvider>
        <Router>
          <Switch>
            <PrivateRoute path="/home" component={Home} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/" component={NotFoundRoute} />
          </Switch>
        </Router>
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
