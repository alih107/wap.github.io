const User = require('../models/user')

exports.checkAuth = (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token !== 'null') {
        let username = token.split('-')[0];
        if (!User.doesUserExist(username)) {
            res.status(401).json({
                "error": "Such user does not exist"
            });
        }
        req.user = username;
        next();
    } else {
        res.status(401).json({
            "error": "Not authorized, no access token"
        });
    }
}