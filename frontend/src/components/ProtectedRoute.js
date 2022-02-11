import React  from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({Component, ...props}) => {
  return (
    <Route>
      {
        () => { return (props.loggedIn ? Component : <Redirect to="./sign-in" />)}
      }
    </Route>
  )
}

export default ProtectedRoute;
