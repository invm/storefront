import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { Home, About } from './components/pages';

import StoreState from './context/store/StoreState';
import StorePage from './components/store/StorePage';
import Dashboard from './components/pages/Dashboard';
import AddStore from './components/store/AddStore';

const App = () => {
  return (
    <StoreState>
      <Router>
        <Navbar />
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
        </Switch>
      </Router>
    </StoreState>
  );
};

export default App;
