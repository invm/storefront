import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import setAuthToken from './utils/setAuthToken';

import AppNavbar from './components/layout/AppNavbar';
import Alerts from './components/layout/Alerts';

import StoreState from './context/store/StoreState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {
  Home,
  About,
  StorePage,
  Dashboard,
  AddStore,
  AddOrderPage
} from './components/pages';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <StoreState>
        <AlertState>
          <Router>
            <AppNavbar />
            <Alerts />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/addstore' component={AddStore} />
              <PrivateRoute exact path='/store/:id' component={StorePage} />} />
              <PrivateRoute
                exact
                path='/addorder/:storeId'
                component={AddOrderPage}
              />
              } /> />
            </Switch>
          </Router>
        </AlertState>
      </StoreState>
    </AuthState>
  );
};

export default App;
