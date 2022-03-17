import isEmail from 'validator/lib/isEmail';
import isUrlValid from 'url-validation';

const validation = {
  email: {
    required: { value: true, message: 'Please fill in your email' },
    validate: { emailValidator: (value) => isEmail(value) || 'Invalid email address' },
  },
  password: {
    required: { value: true, message: 'Enter password' },
    minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
    maxLength: { value: 40, message: 'Your password needs to be no more 40 characters.' },
  },
  username: {
    required: { value: true, message: 'Please fill in your username' },
    maxLength: { value: 20, message: 'Your username needs to be no more 20 characters.' },
    minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
  },
  image: {
    required: { value: false },
    validate: {
      urlValidator: (value) => isUrlValid(value) || value === '' || 'Invalid url',
    },
  },
  title: {
    required: { value: true, message: 'Please fill in this field' },
  },
  description: {
    required: { value: true, message: 'Please fill in this field' },
  },
  body: {
    required: { value: true, message: 'Please fill in this field' },
  },
  tag: {
    required: { value: false },
  },
};

export default validation;
