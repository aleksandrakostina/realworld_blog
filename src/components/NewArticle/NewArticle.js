import React, { useContext, useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import BlogServicesContext from '../BlogServicesContext/BlogServicesContext';
import ModalArticle from '../ModalArticle';
import './NewArticle.scss';

const NewArticle = () => {
  const [isError, setIsError] = useState(false);
  const blog = useContext(BlogServicesContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsError(false);
    const tags = [];
    for (const key in data) {
      if (key.includes('tag')) {
        tags.push(data[key]);
      }
    }
    return blog
      .createArticle({
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: tags.filter((tag) => tag.trim() !== ''),
        },
      })
      .then(() => {
        message.success('The article is created');
        navigate('/articles');
      })
      .catch(() => setIsError(true));
  };

  return <ModalArticle onSubmit={onSubmit} name="Create new article" isError={isError} />;
};

export default NewArticle;
