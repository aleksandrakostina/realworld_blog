import React from 'react';
import PropTypes from 'prop-types';
import './ArticleList.scss';
import Article from '../Article';

const ArticleList = ({ articles }) => (
  <div className="posts">
    {articles.map((article) => (
      <Article key={article.id} article={article} isShort />
    ))}
  </div>
);

ArticleList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ArticleList;
