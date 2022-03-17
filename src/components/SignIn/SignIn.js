import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Spin } from 'antd';
import validation from '../../utils/validation';
import FormInput from '../FormInput';
import Modal from '../Modal';
import { useAuth } from '../useAuth';

const SignIn = () => {
  const { signIn } = useAuth();

  const methods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [isError, setIsError] = useState(false);

  const onSubmit = async (data) => {
    setIsError(false);
    return signIn(data).catch(() => setIsError(true));
  };

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
          {isError && <Alert closable message="Email or password is invalid" type="error" showIcon />}
          <button type="submit" className="btn form__submit" disabled={isSubmitting}>
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

export default SignIn;
