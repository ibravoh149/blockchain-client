import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home/HomePage';
import NotFound from './components/NotFound';
import signin from './components/SigninForm';
import signup from './components/SignupForm';
import noAuth from './helpers/notAuth';
import auth from './helpers/auth';
import dashboard from './components/Home/HomePage';



const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={noAuth(signin)} />
      <Route path="/home" component={noAuth(signin)} />
      <Route path="/signin" component={noAuth(signin)} />
      <Route path="/signup" component={noAuth(signup)} />
      <Route path="/dashboard" component={auth(dashboard)} />
      <Route path="/not-found" component={NotFound} />

      <Redirect to="/" />
    </Switch>
  </div>
);

export default Routes;
