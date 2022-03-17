import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../../utils/getToken';
import { useAuth } from '../useAuth';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user && !getToken()) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
