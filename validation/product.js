const Validator = require('validator');
const isEmpty = require('../validation/isEmpty');


module.exports = function validateProductInput(data){
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.createdBy = !isEmpty(data.createdBy) ? data.createdBy : '';

  if(Validator.isEmpty(data.name)) {
    errors.name = 'Product name is required'
  }
  if(Validator.isEmpty(data.price)) {
    errors.price = 'Status field is required'
  }
  if(Validator.isEmpty(data.description)) {
    errors.description = 'Not a valid URL';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}
