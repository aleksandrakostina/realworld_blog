import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { message, Spin } from 'antd';
import validation from '../../../utils/validation';
import FormInput from '../../FormInput';
import Modal from '../../Modal';
import { useAuth } from '../../../hooks/useAuth';

const SignInPage = () => {
  const { signIn } = useAuth();

  const methods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => signIn(data).catch(() => message.error('Failed to login user'));

  return (
    <Modal title="Sign In" className="modal modal--size-s">
      <FormProvider {...methods}>
        <form className="modal__form form" onSubmit={handleSubmit(onSubmit)}>
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
          <button type="submit" className="btn-submit form__btn-submit" disabled={isSubmitting}>
            {isSubmitting ? <Spin indicator={<LoadingOutlined style={{ color: 'white' }} />} /> : 'Login'}
          </button>
          <p className="form__text">
            Don`t have an account?{' '}
            <Link to="/sign-up" className="form__link">
              Sign Up
            </Link>
            .
          </p>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default SignInPage;
