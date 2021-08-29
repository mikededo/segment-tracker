import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import AppTheme from '@config/Theme';
import { AppContextProvider } from '@context/AppContext';
import { ThemeProvider } from '@material-ui/core';
import PrivateRoute from '@routes/PrivateRoute';
import PublicRoute from '@routes/PublicRoute';
import Home from '@views/Home';
import Login from '@views/Login';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={AppTheme}>
      <AppContextProvider>
        <Router>
          <PrivateRoute component={Home} path="/home" />

          <PublicRoute exact path={['/', '/login']} component={Login} />
        </Router>
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
