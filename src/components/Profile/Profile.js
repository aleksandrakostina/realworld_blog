import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import FormInput from '../FormInput';
import { useAuth } from '../useAuth';
import validation from '../../utils/validation';
import Modal from '../Modal';

const Profile = () => {
  const { user, editUser } = useAuth();

  const methods = useForm();
  const { handleSubmit, formState, setValue } = methods;

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setValue('username', user?.username);
    setValue('email', user?.email);
    setValue('image', user?.image);
  }, [user, setValue]);

  const onSubmit = async (data) => {
    setIsError(false);
    try {
      await editUser(data);
    } catch {
      setIsError(true);
    }
  };

  return (
    <Modal title="Edit Profile">
      <FormProvider {...methods}>
        <form className="modal__form form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__group">
            <FormInput
              label="Username"
              type="text"
              name="username"
              placeholder="Username"
              rules={validation.username}
            />
          </div>
          <div className="form__group">
            <FormInput
              label="Email address"
              type="email"
              name="email"
              placeholder="Email address"
              rules={validation.email}
            />
          </div>
          <div className="form__group">
            <FormInput
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              rules={validation.password}
            />
          </div>
          <div className="form__group">
            <FormInput
              label="Avatar image (url)"
              type="url"
              name="image"
              placeholder="Avatar image"
              rules={validation.image}
            />
          </div>
          {isError && <Alert closable message="Faild to edit user" type="error" showIcon />}
          <button type="submit" className="btn form__submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? <Spin indicator={<LoadingOutlined style={{ color: 'white' }} />} /> : 'Save'}
          </button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default Profile;
