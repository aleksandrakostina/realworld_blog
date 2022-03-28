import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import TokenServices from '../../services/TokenServices';
import { useAuth } from '../../hooks/useAuth';

const token = new TokenServices();

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user && !token.getToken()) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
