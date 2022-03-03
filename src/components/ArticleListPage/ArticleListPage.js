import { Pagination } from "antd";
import React, { useContext, useEffect, useState } from "react";
import ArticleList from "../ArticleList";
import Error from "../Error";
import BlogServicesContext from "../BlogServicesContext/BlogServicesContext";
import Loader from "../Loader";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const blog = useContext(BlogServicesContext);

  useEffect(() => {
    setLoading(true);
    blog.getArticles(currentPage).then(data => {
      setArticles(data.articles.map((article, id) => ({...article, id})));
      setTotalArticles(data.articlesCount);
      setLoading(false);
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
  }, [currentPage, blog])

  const onChangePage = (page) => {
    setCurrentPage(page);
  }

  if(loading) {
    return <Loader />
  }

  if(error) {
    return <Error />
  }

  return (
    <>
      <ArticleList articles={articles} />
      <Pagination pageSize={blog.articlesOnPage} hideOnSinglePage size='small' current={currentPage} total={totalArticles} onChange={onChangePage} showSizeChanger={false} />
    </> 
  );
}

export default ArticleListPage;