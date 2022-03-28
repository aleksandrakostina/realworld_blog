import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { message, Spin } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import validation from '../../../utils/validation';
import FormInput from '../../FormInput';
import FormTextArea from '../../FormTextarea';
import Modal from '../../Modal';
import { useBlogServices } from '../../../hooks/useBlogServices';
import { useAuth } from '../../../hooks/useAuth';
import Loader from '../../Loader';
import NotFoundPage from '../NotFoundPage';
import './FormArticlePage.scss';

const FormArticlePage = () => {
  const methods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting },
    unregister,
    setValue,
  } = methods;
  const { createArticle, getArticle, updateArticle } = useBlogServices();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { user } = useAuth();
  const [tags, setTags] = useState([]);
  const [article, setArticle] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const editMode = !!slug;

  useEffect(() => {
    if (Object.keys(article).length && article.tagList.length) {
      setTags(article.tagList.map((tag, idx) => ({ id: idx, title: tag })));
    } else {
      setTags([{ id: 1, title: '' }]);
    }
  }, [article]);

  useEffect(() => {
    setIsError(false);
    if (editMode) {
      setIsLoading(true);
      getArticle(slug)
        .then((data) => {
          setArticle(data.article);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setIsError(true);
        });
    } else {
      setArticle({});
    }
  }, [getArticle, slug, editMode, navigate]);

  useEffect(() => {
    setValue('title', article?.title);
    setValue('description', article?.description);
    setValue('body', article?.body);
  }, [article, setValue, editMode]);

  if (isLoading || !user) {
    return <Loader />;
  }

  if ((isError || article?.author?.username !== user.username) && editMode) {
    return <NotFoundPage />;
  }

  const onAddTag = () => {
    setTags((prevTag) => [...prevTag, { id: prevTag[prevTag.length - 1].id + 1, title: '' }]);
  };

  const onDeleteTag = (id) => {
    if (tags.length !== 1) {
      setTags((prevTags) => prevTags.filter((item) => item.id !== id));
    } else {
      setTags([{ id, title: '' }]);
    }
    unregister(`tag${id}`);
  };

  const onChangeTag = (event, id) => {
    setTags((prevTags) =>
      prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, title: event.target.value };
        }
        return tag;
      })
    );
  };

  const handleCreateArticle = (data) =>
    createArticle(data)
      .then(() => {
        message.success('The article is created');
        navigate('/articles');
      })
      .catch(() => {
        message.error('The article was not created!');
      });

  const handleEditArticle = (data) =>
    updateArticle(article.slug, data)
      .then(() => {
        message.success('The article is updated');
        navigate(`/articles/${article.slug}`);
      })
      .catch(() => {
        message.error('The article was not updated!');
      });

  const onSubmit = async (data) => {
    const tagList = [];
    for (const key in data) {
      if (key.includes('tag')) {
        tagList.push(data[key]);
      }
    }
    const newArticle = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: tagList.filter((tag) => tag.trim() !== ''),
      },
    };
    return editMode ? handleEditArticle(newArticle) : handleCreateArticle(newArticle);
  };

  const tagsArr = tags.map((item, idx) => (
    <div className="fieldset-tags__item" key={item.id}>
      <FormInput
        name={`tag${item.id}`}
        type="text"
        className="input fieldset-tags__input"
        placeholder="Tag"
        rules={validation.tag}
        value={item.title}
        onChange={(event) => onChangeTag(event, item.id)}
      />
      <div className="fieldset-tags__btns">
        <button
          type="button"
          className="button button--size-m button--error fieldset-tags__button"
          onClick={() => onDeleteTag(item.id)}
        >
          Delete
        </button>
        {idx === tags.length - 1 && (
          <button type="button" className="button button--size-m button--info fieldset-tags__button" onClick={onAddTag}>
            Add tag
          </button>
        )}
      </div>
    </div>
  ));

  const title = editMode ? 'Edit article' : 'Create new article';

  return (
    <Modal title={title} className="modal modal--size-l">
      <FormProvider {...methods}>
        <form className="form-article" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-article__group">
            <FormInput label="Title" type="text" name="title" placeholder="Title" rules={validation.title} />
          </div>
          <div className="form-article__group">
            <FormInput
              label="Short description"
              type="text"
              name="description"
              placeholder="Title"
              rules={validation.description}
            />
          </div>
          <div className="form-article__group">
            <FormTextArea label="Text" type="text" name="body" placeholder="Text" rules={validation.body} />
          </div>
          <div className="form-article__group">
            <fieldset className="fieldset-tags">
              <legend className="label">Tags</legend>
              {tagsArr}
            </fieldset>
          </div>
          <button type="submit" className="btn-submit form-article__btn-submit" disabled={isSubmitting}>
            {isSubmitting ? <Spin indicator={<LoadingOutlined style={{ color: 'white' }} />} /> : 'Send'}
          </button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default FormArticlePage;
