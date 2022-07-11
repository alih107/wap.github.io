const User = require('../models/user')
const authUtils = require('../utils/auth')

exports.login = (req, res) => {
    let result = User.login(req.body.user, req.body.pass);
    if (result.accessToken) {
        res.status(200).send(result);
    } else {
        res.status(401).send(result);
    }
};

exports.checkUser = (req, res) => {
    let result = User.doesUserExist(authUtils.extractUser(req.headers.authorization));
    if (result) {
        res.status(200).json({
            'success': true
        });
    }  else {
        res.status(401).json({
            'error': 'Please authorize'
        })
    }
};