import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import ArticleList from '../../ArticleList';
import Error from '../../Error';
import Loader from '../../Loader';
import { useAuth } from '../../../hooks/useAuth';
import './ArticleListPage.scss';
import { useBlogServices } from '../../../hooks/useBlogServices';

const ArticleListPage = ({ currentPage, onChangePage }) => {
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { getArticles, articlesOnPage } = useBlogServices();
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    getArticles(currentPage)
      .then((data) => {
        setArticles(data.articles.map((article, id) => ({ ...article, id })));
        setTotalArticles(data.articlesCount);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [currentPage, getArticles]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <ArticleList articles={articles} user={user} />
      <Pagination
        pageSize={articlesOnPage}
        hideOnSinglePage
        size="small"
        current={currentPage}
        total={totalArticles}
        onChange={onChangePage}
        showSizeChanger={false}
        className="pagination"
      />
    </>
  );
};

ArticleListPage.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default ArticleListPage;
