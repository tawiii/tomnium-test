const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const keys = require('../../config/keys');
const passport = require('passport')
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')


router.post('/register', (req,res) => {
  const {errors, isValid} = validateRegisterInput(req.body);
  if(!isValid) {
    return res.status(400)
    .json(errors)
  }

  User.findOne({name: req.body.name})
  .then(user => {
    if(user){
      errors.name =  "Name already exists"
      return res.status(400)
      .json(errors)
    } else {
      const newUser = new User({
        name: req.body.name,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw new Error(err);
          newUser.password = hash;
          newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err))
        })
      })
    }
  });
});

router.post('/login', (req, res) => {

  const {errors, isValid} = validateLoginInput(req.body);
  if(!isValid) {
    return res.status(400)
    .json(errors)
  }

  const name = req.body.name;
  const password = req.body.password;

  User.findOne({name})
  .then(user => {
    if(!user) {
      errors.name = 'User not found';
      return res.status(404)
      .json(errors)
    }
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => (
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          )
        )
      } else {
        errors.password = 'Password incorrect'
        return res.status(400)
        .json(errors)
      }
    })
  })
});

module.exports = router;
