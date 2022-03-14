import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { getToken, removeToken, setToken } from '../utils/getToken';
import BlogServicesContext from './BlogServicesContext/BlogServicesContext';
import { AuthContext } from './useAuth';

const AuthProvider = ({ children }) => {
  const blog = useContext(BlogServicesContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const setCurrentUser = useCallback(() => {
    if (getToken()) {
      blog
        .getCurrentUser()
        .then((data) => {
          setUser(data.user);
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, [blog]);

  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  const signUp = useCallback(
    (data) =>
      blog
        .registerUser({
          user: {
            username: data.username,
            email: data.email,
            password: data.password,
          },
        })
        .then((response) => {
          setToken(response.user.token);
          navigate('/articles');
          setCurrentUser();
        }),
    [blog, navigate, setCurrentUser]
  );

  const signIn = useCallback(
    (data) =>
      blog.loginUser({ user: { ...data } }).then((response) => {
        setUser(response.user);
        setToken(response.user.token);
        const origin = location.state?.from?.pathname || '/articles';
        navigate(origin);
      }),
    [blog, location, navigate]
  );

  const logOut = useCallback(() => {
    setUser(null);
    removeToken();
  }, []);

  const editUser = useCallback(
    (data) =>
      blog
        .updateUser({
          user: {
            username: data.username,
            email: data.email,
            image: data?.image,
            token: getToken(),
          },
        })
        .then(({ user: profile }) => {
          setUser({
            username: profile.username,
            email: profile.email,
            image: profile.image,
          });
          const origin = location.state?.from?.pathname || '/articles';
          navigate(origin);
        }),
    [blog, navigate, location]
  );

  const value = useMemo(
    () => ({
      user,
      signIn,
      logOut,
      signUp,
      editUser,
    }),
    [user, signIn, logOut, signUp, editUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
