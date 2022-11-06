const Validator = require('validator');
import { validText } from '../valid-text'

type errorsObject = {
  email?: String
  password?: String 
}

type loginObject = {
  email: String
  password: String
}

module.exports = function validateLoginInput(data: loginObject) {
  let errors: errorsObject = {};

  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
