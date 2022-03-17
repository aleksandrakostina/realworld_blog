import React, { useContext } from 'react';
import './Article.scss';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { message, Popconfirm } from 'antd';
import BlogServicesContext from '../BlogServicesContext/BlogServicesContext';

const Article = ({ article, isShort, user }) => {
  const blog = useContext(BlogServicesContext);
  const navigate = useNavigate();

  const confirm = () =>
    blog
      .deleteArticle(article.slug)
      .then(() => {
        navigate('articles');
        message.success('The article is deleted successefully!');
      })
      .catch(() => {
        message.error('Error! The article was not deleted.');
      });

  return (
    <article className="post">
      <div className="post__header">
        <div className="post__header-left">
          {isShort ? (
            <Link to={`${article.slug}`} className="post__link">
              <h3 className="post__title">{article.title}</h3>
            </Link>
          ) : (
            <h3 className="post__title">{article.title}</h3>
          )}
          <button className="post__btn-like btn-like" type="button">
            <HeartOutlined />
            <span className="btn-like__text">{article.favoritesCount}</span>
          </button>
          <ul className="post__tags">
            {[...new Set(article.tagList)].map(
              (tag) =>
                tag && (
                  <li key={tag} className="post__tag">
                    {tag}
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="post__header-right">
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
      </div>
      <div className="post__body">
        <div className="post__content">
          <p className="post__text">{article.description}</p>
          {!isShort && article.author.username === user?.username && (
            <div className="post__btns">
              <Popconfirm
                placement="rightTop"
                title="Are you sure to delete this article?"
                onConfirm={confirm}
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
        {!isShort && <ReactMarkdown>{article.body}</ReactMarkdown>}
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
  }).isRequired,
  isShort: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    image: PropTypes.string,
    username: PropTypes.string,
  }),
};

export default Article;
