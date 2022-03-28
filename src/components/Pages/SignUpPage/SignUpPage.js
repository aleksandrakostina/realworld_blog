import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Checkbox, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import FormInput from '../../FormInput';
import { useAuth } from '../../../hooks/useAuth';
import Modal from '../../Modal';
import validation from '../../../utils/validation';

const SignUpPage = () => {
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
    setError,
  } = methods;

  const agreement = watch('agreement');

  const onSubmit = async (data) =>
    signUp(data).catch((err) => {
      const errors = JSON.parse(err.message);
      const errorsKeys = Object.keys(errors);
      errorsKeys.map((key) => setError(key, { type: 'server', message: `${key} ${errors[key]}` }));
    });

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
          <button type="submit" disabled={isSubmitting || !agreement} className="btn-submit form__btn-submit">
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

export default SignUpPage;
