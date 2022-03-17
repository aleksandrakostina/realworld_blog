import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../useAuth';
import './Header.scss';

const Header = () => {
  const { user, logOut } = useAuth();

  return (
    <header className="header app__header">
      <Link to="articles" className="header__link">
        <h1 className="header__title">Realworld Blog</h1>
      </Link>
      {user ? (
        <div className="header__btns">
          <Link to="new-article" className="button button--success button--size-s header__create-post">
            Create article
          </Link>
          <div className="header__profile">
            <div className="header__username">
              <Link to="profile" className="button button--size-l button--unbordered">
                {user.username}
              </Link>
            </div>
            <Link className="header__avatar" to="profile">
              {user.image ? (
                <Avatar src={user.image} size={46} alt="avatar" />
              ) : (
                <Avatar icon={<UserOutlined />} size={46} alt="avatar" />
              )}
            </Link>
          </div>
          <button
            type="button"
            className="header__btn btn-logout button button--size-l button--neutral"
            onClick={logOut}
          >
            Log Out
          </button>
          <LogoutOutlined className="header__logout-icon" onClick={logOut} />
        </div>
      ) : (
        <div className="header__btns">
          <Link className="header__btn button button--size-l button--unbordered" to="sign-in">
            Sign In
          </Link>
          <Link className="header__btn button button--size-l button--success" to="sign-up">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
