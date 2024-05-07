// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, ...rest }) => {
  const { token } = useAuth();

  return (
    <Route {...rest}>
      {token ? children : <Navigate to="/login" />}
    </Route>
  );
};

export default ProtectedRoute;
