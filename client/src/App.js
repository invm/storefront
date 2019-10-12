import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import { Home, About } from './components/pages';

import StoreState from './context/store/StoreState';
import StorePage from './components/pages/StorePage';
import Dashboard from './components/pages/Dashboard';
import AddStore from './components/pages/AddStore';
import AddOrderPage from './components/pages/AddOrderPage';

const App = () => {
  return (
    <StoreState>
      <Router>
        <AppNavbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route
            exact
            path='/dashboard'
            render={props => <Dashboard props={props} />}
          />
          <Route
            exact
            path='/store/:id'
            render={props => <StorePage props={props} />}
          />
          <Route
            exact
            path='/addstore'
            render={props => <AddStore props={props} />}
          />
          <Route
            exact
            path='/addorder/:storeId'
            render={props => <AddOrderPage props={props} />}
          />
        </Switch>
      </Router>
    </StoreState>
  );
};

export default App;
