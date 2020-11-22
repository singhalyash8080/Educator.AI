const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const Mongoose = require("mongoose");



const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User").User


router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ err: "Email already exists" });
    } else {
      const newUser = new User({
        _id:new Mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            // .catch(err => console.log(err));
        });
      });
    }
  });
});


router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ err: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          _id: user._id,
          name: user.name,
          email: user.email
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: '3h'
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ err: "Password incorrect" });
      }
    });
  });
});

module.exports = router;