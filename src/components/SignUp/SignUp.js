import React, { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Alert, Checkbox, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import FormInput from '../FormInput';
import { useAuth } from '../useAuth';
import Modal from '../Modal';
import validation from '../../utils/validation';

const SignUp = () => {
  const { signUp } = useAuth();

  const methods = useForm({
    defaultValues: {
      agreement: true,
    },
  });
  const {
    handleSubmit,
    getValues,
    watch,
    control,
    formState: { isSubmitting },
  } = methods;
  const agreement = watch('agreement');

  const [isError, setIsError] = useState(false);

  const onSubmit = async (data) => {
    setIsError(false);
    return signUp(data).catch(() => setIsError(true));
  };

  return (
    <Modal title="Create new account" className="modal modal--size-s">
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
              label="Repeat Password"
              type="password"
              name="passwordConfirmation"
              placeholder="Password"
              rules={{
                required: true,
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return password === value || 'Passwords must match';
                  },
                },
              }}
            />
          </div>
          <div className="form__checkbox">
            <Controller
              control={control}
              name="agreement"
              render={({ field: { value, onChange } }) => (
                <Checkbox checked={value} onChange={(event) => onChange(event.target.checked)}>
                  I agree to the processing of my personal information
                </Checkbox>
              )}
            />
          </div>
          {isError && <Alert closable message="Faild to create user" type="error" showIcon />}
          <button type="submit" disabled={isSubmitting || !agreement} className="form__submit">
            {isSubmitting ? <Spin indicator={<LoadingOutlined style={{ color: 'white' }} />} /> : 'Create'}
          </button>
          <p className="form__text">
            Already have an account?{' '}
            <Link to="/sign-in" className="form__link">
              Sign In
            </Link>
            .
          </p>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default SignUp;
