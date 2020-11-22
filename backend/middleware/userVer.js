const User = require('../models/User').User
const Org = require('../models/Orgs').Org
const jwt = require('jsonwebtoken')
const secretkey = require('../config/keys').secretOrKey


function verify(req, res, next) {
    if (req.body.token == null) res.status(401).json({ err: "Token Not present" })
    // verify token
    jwt.verify(req.body.token, secretkey, (err, data) => {
        if (err) {
            next(err);
        }
        else next()
    })
}

module.exports = [verify]