const Validator = require('validator');
const isEmpty = require('../validation/isEmpty');


module.exports = function validateRegisterInput(data){
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if(!Validator.isLength(data.name, {min:2, max:30})) {
    errors.name = "name must be between 2 and 30 characters"
  }
  if(Validator.isEmpty(data.name)) {
    errors.name = "Name field is empty"
  }

  if(Validator.isEmpty(data.password)) {
    errors.password="Password field is empty"
  }
  if(!Validator.isLength(data.password, {min:3, max:12})) {
    errors.password="Password must be at least 3 characters"
  }

  if(Validator.isEmpty(data.password2)) {
    errors.password2="Confirm password"
  }

  if(!Validator.equals(data.password, data.password2)) {
    errors.password="Passwords must match"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
