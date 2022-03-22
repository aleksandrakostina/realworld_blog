import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

const FormTextarea = ({ name, label, placeholder, rules, type, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <label className="label">
      {label && label}
      <textarea
        type={type}
        className={classNames('textarea', { 'textarea--error': errors[name] })}
        placeholder={placeholder}
        {...register(name, rules)}
        {...props}
      />
      {errors[name] && <p className="error">{errors[name]?.message}</p>}
    </label>
  );
};

FormTextarea.defaultProps = {
  label: '',
};

FormTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  rules: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default FormTextarea;
