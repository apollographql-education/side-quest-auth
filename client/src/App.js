import PropTypes from 'prop-types';
import React from 'react';
import {
  CreateListing,
  EditListing,
  Home,
  HostBookings,
  HostPastBookings,
  Listing,
  Listings,
  Login,
  PastTrips,
  Profile,
  Search,
  Trips,
  Wallet
} from './pages';
import {useUser} from './utils';

import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

export default function App() {
  const {user} = useUser();

  return (
    <Router>
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/listings">
          <Listings />
        </Route>
        <Route path="/listings/create">
          <CreateListing />
        </Route>
        <Route exact path="/listing/:id">
          <Listing />
        </Route>
        <Route path="/listing/:id/edit">
          <EditListing />
        </Route>
        <Route path="/listing/:id/bookings">
          <HostBookings />
        </Route>
        <Route path="/listing/:id/past-bookings">
          <HostPastBookings />
        </Route>
        <Route path="/trips">
          <Trips />
        </Route>
        <Route path="/past-trips">
          <PastTrips />
        </Route>
        <Route user={user} path="/profile">
          <Profile />
        </Route>
        <Route user={user} path="/wallet">
          <Wallet />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

function PrivateRoute({children, user, ...rest}) {
  return (
    <Route
      {...rest}
      render={({location}) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: location}
            }}
          />
        )
      }
    />
  );
}
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object
};
