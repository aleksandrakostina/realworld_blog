import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

const FormInput = ({ name, label, placeholder, rules, type, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <label className="form__label">
      {label}
      <input
        type={type}
        className={classNames('form__input', { 'form__input--error': errors[name] })}
        placeholder={placeholder}
        {...register(name, rules)}
        {...props}
      />
      {errors[name] && <p className="form__error">{errors[name]?.message}</p>}
    </label>
  );
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  rules: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default FormInput;
