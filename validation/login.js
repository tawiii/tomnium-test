const Validator = require('validator');
const isEmpty = require('../validation/isEmpty');


module.exports = function validateLoginInput(data){
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if(Validator.isEmpty(data.name)) {
    errors.name="Name field is empty"
  }

  if(Validator.isEmpty(data.password)) {
    errors.password="Password field is empty"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
