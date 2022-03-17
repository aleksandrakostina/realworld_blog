import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import './ArticlePage.scss';
import Article from '../Article';
import Error from '../Error';
import BlogServicesContext from '../BlogServicesContext/BlogServicesContext';
import { useAuth } from '../useAuth';

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const blog = useContext(BlogServicesContext);
  const { user } = useAuth();

  useEffect(() => {
    blog
      .getArticle(slug)
      .then((data) => {
        setArticle(data.article);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [blog, slug]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return <Article article={article} isShort={false} user={user} />;
};
export default ArticlePage;
