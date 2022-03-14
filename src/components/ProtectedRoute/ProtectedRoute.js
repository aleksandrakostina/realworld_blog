import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../useAuth';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  if (user) {
    return children;
  }

  return <Navigate to="/sign-in" replace state={{ from: location }} />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
