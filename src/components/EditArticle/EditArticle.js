import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogServicesContext from '../BlogServicesContext/BlogServicesContext';
import ModalArticle from '../ModalArticle';
import Loader from '../Loader';

const EditArticle = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const blog = useContext(BlogServicesContext);
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    blog
      .getArticle(slug)
      .then((data) => {
        setArticle(data.article);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [blog, slug]);

  if (isLoading) {
    return <Loader />;
  }

  const onSubmit = (data) => {
    setIsError(false);
    const tags = [];
    for (const key in data) {
      if (key.includes('tag')) {
        tags.push(data[key]);
      }
    }
    return blog
      .updateArticle(article.slug, {
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: tags.filter((tag) => tag.trim() !== ''),
        },
      })
      .then(() => {
        message.success('The article is updated');
        navigate(`/articles/${article.slug}`);
      })
      .catch(() => setIsError(true));
  };

  if (!Object.keys(article).length) {
    return <Loader />;
  }

  return <ModalArticle onSubmit={onSubmit} name="Edit article" isError={isError} defaultValues={article} />;
};

export default EditArticle;
