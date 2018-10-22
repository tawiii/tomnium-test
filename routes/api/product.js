const express = require('express');
const router = express.Router();
const passport = require('passport');
const Product = require('../../models/Product');
const validateProductInput = require('../../validation/product');


// get Products
router.get('/', (req,res) => {
  const errors = {}
  Product.find()
  .populate('createdBy', 'name')
  .then(product => {
    if(!product) {
      errors.noproduct = "product not found"
      return res.status(404).json(errors)
    }
    res.json(product);
  })
  .catch(error => res.status(404).json(error))
});

// Create product
router.post('/', passport.authenticate('jwt', { session: false}),
(req,res) => {
  const {errors, isValid} = validateProductInput(req.body)
  if(!isValid) {
    return res.status(400)
    .json(errors)
  }

  const productFields = {};
  productFields.createdBy = req.user.id;
  if(req.body.name)  productFields.name = req.body.name;
  if(req.body.price)  productFields.price = req.body.price;
  if(req.body.description)  productFields.description = req.body.description;

    new Product(productFields)
    .save()
    .then(product => res.json(product));
});

//ProductId
router.get('/:id', (req,res) => {
  const errors = {}
  Product.findOne({_id: req.params.id})
  .populate('createdBy', 'name')
  .then(product => {
    if(!product) {
      errors.noproduct = "product not found"
      return res.status(404).json(errors)
    }
    res.json(product);
  })
  .catch(error => res.status(404).json(error))
});

module.exports = router;
