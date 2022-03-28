import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../Loader';
import Article from '../../Article';
import Error from '../../Error';
import { useAuth } from '../../../hooks/useAuth';
import { useBlogServices } from '../../../hooks/useBlogServices';

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { getArticle } = useBlogServices();
  const { user } = useAuth();

  useEffect(() => {
    getArticle(slug)
      .then((data) => {
        setArticle(data.article);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [getArticle, slug]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return <Article article={article} isShort={false} user={user} />;
};
export default ArticlePage;
