import React, { useEffect, useState } from 'react';
import './Article.scss';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { HeartFilled, HeartOutlined, UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { message, Popconfirm } from 'antd';
import { useBlogServices } from '../../hooks/useBlogServices';

const Article = ({ article, isShort, user }) => {
  const { deleteArticle, unFavoriteArticle, favoriteArticle } = useBlogServices();
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState();
  const [favoritesCount, setFavoritesCount] = useState();

  useEffect(() => {
    setFavorited(article.favorited);
    setFavoritesCount(article.favoritesCount);
  }, [article]);

  const handleDeleteArticle = () =>
    deleteArticle(article.slug)
      .then(() => {
        navigate('articles');
        message.success('The article is deleted successefully!');
      })
      .catch(() => {
        message.error('Error! The article was not deleted.');
      });

  const handleFavoriteClick = () => {
    if (user) {
      if (favorited) {
        unFavoriteArticle(article.slug).then(() => {
          setFavorited(false);
          setFavoritesCount((prevFavoritesCount) => prevFavoritesCount - 1);
        });
      } else {
        favoriteArticle(article.slug).then(() => {
          setFavorited(true);
          setFavoritesCount((prevFavoritesCount) => prevFavoritesCount + 1);
        });
      }
    }
  };

  return (
    <article className="post">
      <div className="post__header">
        <div className="post__info-main">
          <div className="post__header-top">
            {isShort ? (
              <Link to={`${article.slug}`} className="post__link">
                <h3 className="post__title">{article.title}</h3>
              </Link>
            ) : (
              <h3 className="post__title">{article.title}</h3>
            )}
            <button className="post__btn-like btn-like" type="button" onClick={handleFavoriteClick}>
              {!favorited || !user ? (
                <HeartOutlined style={{ fontSize: '14px' }} />
              ) : (
                <HeartFilled style={{ color: '#FF0707', fontSize: '14px' }} />
              )}
              <span className="btn-like__text">{favoritesCount}</span>
            </button>
          </div>
          <ul className="post__tags tags">
            {[...new Set(article.tagList)].map(
              (tag) =>
                tag && (
                  <li key={tag} className="tags__item">
                    {tag}
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="post__info">
          <h5 className="post__author">{article.author.username}</h5>
          <p className="post__date">{format(new Date(article.createdAt), 'MMMM d, yyyy')}</p>
        </div>
        <div className="post__avatar">
          {article.author.image ? (
            <Avatar src={article.author.image} size={46} alt="avatar" />
          ) : (
            <Avatar icon={<UserOutlined />} size={46} alt="avatar" />
          )}
        </div>
      </div>
      <div className="post__content">
        <div className="post__description">
          <p className="post__text">{article.description}</p>
          {!isShort && article.author.username === user?.username && (
            <div className="post__btns">
              <Popconfirm
                placement="rightTop"
                title="Are you sure to delete this article?"
                onConfirm={handleDeleteArticle}
                okText="Yes"
                cancelText="No"
              >
                <button type="button" className="button button--size-s button--error post__button">
                  Delete
                </button>
              </Popconfirm>
              <Link
                to={`/articles/${article.slug}/edit`}
                className="button button--size-s button--success post__button"
              >
                Edit
              </Link>
            </div>
          )}
        </div>
        <div className="post__body">{!isShort && <ReactMarkdown>{article.body}</ReactMarkdown>}</div>
      </div>
    </article>
  );
};

Article.defaultProps = {
  user: null,
};

Article.propTypes = {
  article: PropTypes.shape({
    favoritesCount: PropTypes.number,
    author: PropTypes.shape({
      username: PropTypes.string,
      image: PropTypes.string,
    }),
    tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string,
    createdAt: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
    body: PropTypes.string,
    favorited: PropTypes.bool,
  }).isRequired,
  isShort: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    image: PropTypes.string,
    username: PropTypes.string,
  }),
};

export default Article;
