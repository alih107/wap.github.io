const User = require('../models/user')

exports.login = (req, res) => {
    let result = User.login(req.body.user, req.body.pass);
    if (result.accessToken) {
        res.status(200).send(result);
    } else {
        res.status(401).send(result);
    }
};

exports.logout = (req, res) => {
    User.logout();
    res.status(200).send();
}

exports.getCurrentUser = (req, res) => {
    res.status(200).json(User.getCurrentUser());
};