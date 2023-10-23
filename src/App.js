import React from 'react';
import { 
  BrowserRouter as Router,
  Route, 
  Redirect, 
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import Navlinks from './NavLinks';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

import './App.css';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to ="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider 
      value={{
        isLoggedIn: !!token,
        token: token, 
        userId: userId, 
        login: login, 
        logout: logout 
      }}
    >
      <React.Fragment>
      <Router>
        <header className="header-outer">
          <div className="header-inner responsive-wrapper">
            <div className="header-logo">
              <img src="images.jpg" />
            </div>
            <nav className="header-navigation">
              <Navlinks />
            </nav>
          </div>
        </header>

        <main className="main">
          <div className="main-content responsive-wrapper">
            <article className="widget">
              {routes}
            </article>
          </div>
        </main>
      </Router>
      </React.Fragment>
    </AuthContext.Provider>
  );
};

export default App;