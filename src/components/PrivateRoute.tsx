import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  loggedIn: boolean;
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, loggedIn, ...rest } = props;

  return (
    <Route {...rest} render={(routeProps) => loggedIn ? (
      <Component {...routeProps }/>
    ) : (
      <Redirect to={'/login'} />
    )}
    />
  )
};

const mapStateToProps = (state: any) => ({
  loggedIn: state.authentication.loggedIn,
})

export default connect(mapStateToProps)(PrivateRoute);