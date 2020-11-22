const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const Mongoose = require('mongoose');


const validateOrgRegister = require('../../validation/org/register');
const validateOrgLogin = require('../../validation/org/login');

const Org = require('../../models/Orgs').Org;

router.post('/register', (req, res) => {
    const { errors, isValid } = validateOrgRegister(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Org.findOne({ email: req.body.email }).then(org => {
        if (org) {
            return res.status(400).json({ err: "Teacher email already exists" })
        } else {
            const newOrg = new Org({
                _id: new Mongoose.Types.ObjectId(),
                teacherName: req.body.teacherName,
                email: req.body.email,
                password: req.body.password,
                vision: req.body.vision,
                course: req.body.course
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newOrg.password, salt, (err, hash) => {
                    if (err) throw errl
                    newOrg.password = hash;
                    newOrg
                        .save()
                        .then(org => res.json(org));
                })
            })
        }
    });

})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateOrgLogin(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    Org.findOne({ email }).then(org => {

        if (!org) {
            return res.status(400).json({ err: 'Email Id not found' });
        }

        bcrypt.compare(password, org.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    teacherName: org.teacherName,
                    email: org.email,
                    _id: org._id,
                    vision: org.vision,
                    course: org.course
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: '12h'
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
        })
    })

})

module.exports = router;