import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import FormInput from '../../FormInput';
import { useAuth } from '../../../hooks/useAuth';
import validation from '../../../utils/validation';
import Modal from '../../Modal';

const ProfilePage = () => {
  const { user, editUser } = useAuth();

  const methods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = methods;

  useEffect(() => {
    setValue('username', user?.username);
    setValue('email', user?.email);
    setValue('image', user?.image);
  }, [user, setValue]);

  const onSubmit = async (data) => editUser(data).catch(() => message.error('Faild to edit user'));

  return (
    <Modal title="Edit Profile" className="modal modal--size-s">
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
              rules={validation.passwordOptional}
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
          <button type="submit" className="btn-submit form__btn-submit" disabled={isSubmitting}>
            {isSubmitting ? <Spin indicator={<LoadingOutlined style={{ color: 'white' }} />} /> : 'Save'}
          </button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ProfilePage;
