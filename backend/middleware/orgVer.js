// here will be middleware for org token verification
const jwt = require('jsonwebtoken')
const Org = require('../models/Orgs').Org
const secretKey = require('../config/keys').secretOrKey
function verify(req, res, next) {

    if (req.body.token == null) res.status(401).json({ err: "Token Not present" })
    // verify token

    jwt.verify(req.body.token, secretKey, (err, data) => {
        if (err) {
            next(err);
        }
        else next()
    })

}

module.exports = { verify }