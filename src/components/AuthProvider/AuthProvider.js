import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import TokenServices from '../../services/TokenServices';
import { AuthContext } from '../../hooks/useAuth';
import { useBlogServices } from '../../hooks/useBlogServices';

const token = new TokenServices();

const AuthProvider = ({ children }) => {
  const { getCurrentUser, registerUser, loginUser, updateUser } = useBlogServices();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const setCurrentUser = useCallback(() => {
    if (token.getToken()) {
      getCurrentUser().then((data) => {
        setUser(data.user);
      });
    }
  }, [getCurrentUser]);

  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  const signUp = useCallback(
    (data) =>
      registerUser({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }).then((response) => {
        if (response.errors) {
          throw new Error(JSON.stringify(response.errors));
        }
        token.setToken(response.user.token);
        navigate('/articles');
        setCurrentUser();
      }),
    [registerUser, navigate, setCurrentUser]
  );

  const signIn = useCallback(
    (data) =>
      loginUser({ user: { ...data } }).then((response) => {
        if (response.errors) {
          const keys = Object.keys(response.errors);
          const message = keys.map((key) => `${key} ${response.errors[key]}`).join(' ');
          throw new Error(message);
        }
        setUser(response.user);
        token.setToken(response.user.token);
        const origin = location.state?.from?.pathname || '/articles';
        navigate(origin);
      }),
    [loginUser, location, navigate]
  );

  const logOut = useCallback(() => {
    setUser(null);
    token.removeToken();
  }, []);

  const editUser = useCallback(
    (data) =>
      updateUser({
        user: {
          username: data.username,
          email: data.email,
          image: data?.image,
          token: token.getToken(),
        },
      }).then(({ user: profile }) => {
        setUser({
          username: profile.username,
          email: profile.email,
          image: profile.image,
        });
        const origin = location.state?.from?.pathname || '/articles';
        navigate(origin);
      }),
    [updateUser, navigate, location]
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
