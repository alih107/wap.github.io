const authUtils = require('../utils/auth')
const User = require("../models/user");

exports.checkAuth = (req, res, next) => {
    let username = authUtils.extractUser(req.headers.authorization);
    if (User.doesUserExist(username)) {
        req.user = username;
        next();
    } else {
        res.status(401).json({
            "error": "Not authorized"
        });
    }
}