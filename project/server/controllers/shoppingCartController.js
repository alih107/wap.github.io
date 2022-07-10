const ShoppingCart = require('../models/shoppingCart')

exports.getByUserName = (req, res) => {
    res.json(ShoppingCart.getByUsername(req.user));
};

exports.purchase = (req, res) => {
    res.json(ShoppingCart.purchase(req.user));
}

exports.updateCart = (req, res) => {
    res.json(ShoppingCart.updateCart(req.user, req.body));
}