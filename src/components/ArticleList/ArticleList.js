import React from 'react';
import PropTypes from 'prop-types';
import './ArticleList.scss';
import Article from '../Article';

const ArticleList = ({ articles, user }) => (
  <div className="posts">
    {articles.map((article) => (
      <Article key={article.id} article={article} isShort user={user} />
    ))}
  </div>
);

ArticleList.defaultProps = {
  user: null,
};

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    image: PropTypes.string,
    username: PropTypes.string,
  }),
};

export default ArticleList;
