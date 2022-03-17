import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

const FormInput = ({ name, label, placeholder, rules, type, ...props }) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <label className="label">
      {label && label}
      <input
        type={type}
        className={classNames('input', { 'input--error': errors[name] })}
        placeholder={placeholder}
        {...register(name, rules)}
        control={control}
        {...props}
      />
      {errors[name] && <p className="error">{errors[name]?.message}</p>}
    </label>
  );
};

FormInput.defaultProps = {
  label: '',
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  rules: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default FormInput;
