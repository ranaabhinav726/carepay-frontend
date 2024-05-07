import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const accessToken = localStorage.getItem('access_token');

  return (
    <Route
      {...rest}
      element={accessToken ? <Element /> : <Navigate to="/" replace />}
    />
  );
};

export default PrivateRoute;
