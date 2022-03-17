import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Spin } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import validation from '../../utils/validation';
import FormInput from '../FormInput';
import Modal from '../Modal';

const ModalArticle = ({ onSubmit, defaultValues, isError, name }) => {
  const { body, title, description, tagList } = defaultValues;
  const methods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting },
    unregister,
  } = methods;
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (Object.keys(defaultValues).length) {
      if (tagList.length) {
        setTags(tagList.map((tag, idx) => ({ id: idx, title: tag })));
      } else {
        setTags([{ id: 1, title: '' }]);
      }
    } else {
      setTags([{ id: 1, title: '' }]);
    }
  }, [tagList, defaultValues]);

  const addTag = () => {
    setTags((prevTag) => [...prevTag, { id: prevTag[prevTag.length - 1].id + 1, title: '' }]);
  };

  const deleteTag = (id) => {
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
          onClick={() => deleteTag(item.id)}
        >
          Delete
        </button>
        {idx === tags.length - 1 && (
          <button type="button" className="button button--size-m button--info fieldset-tags__button" onClick={addTag}>
            Add tag
          </button>
        )}
      </div>
    </div>
  ));

  return (
    <Modal title={name} className="modal modal--size-l">
      <FormProvider {...methods}>
        <form className="form-article" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-article__group">
            <FormInput
              label="Title"
              type="text"
              name="title"
              placeholder="Title"
              defaultValue={title}
              rules={validation.title}
            />
          </div>
          <div className="form-article__group">
            <FormInput
              label="Short description"
              type="text"
              name="description"
              placeholder="Title"
              defaultValue={description}
              rules={validation.description}
            />
          </div>
          <div className="form-article__group">
            <FormInput
              label="Text"
              type="text"
              name="body"
              defaultValue={body}
              placeholder="Text"
              rules={validation.body}
            />
          </div>
          <div className="form-article__group">
            <fieldset className="fieldset-tags">
              <legend className="label">Tags</legend>
              {tagsArr}
            </fieldset>
          </div>
          {isError && <Alert closable message="Failed to create article" type="error" showIcon />}
          <button type="submit" className="btn form-article__submit" disabled={isSubmitting}>
            {isSubmitting ? <Spin indicator={<LoadingOutlined style={{ color: 'white' }} />} /> : 'Send'}
          </button>
        </form>
      </FormProvider>
    </Modal>
  );
};

ModalArticle.defaultProps = {
  defaultValues: {},
};

ModalArticle.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    body: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
  }),
  isError: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default ModalArticle;
