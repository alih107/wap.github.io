const authUtils = require('../utils/auth')

exports.checkAuth = (req, res, next) => {
    let username = authUtils.extractUser(req.headers.authorization);
    if (username) {
        req.user = username;
        next();
    } else {
        res.status(401).json({
            "error": "Not authorized"
        });
    }
}