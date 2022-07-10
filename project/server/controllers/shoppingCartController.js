const ShoppingCart = require('../models/shoppingCart')

exports.getByUserName = (req, res) => {
    res.json(ShoppingCart.getByUsername(req.user));
};

exports.purchase = (req, res) => {
    let status = 200;
    let result = ShoppingCart.purchase(req.user);
    if (result.error) {
        status = 400;
    }
    res.status(status).json(result);
}

exports.updateCart = (req, res) => {
    res.json(ShoppingCart.updateCart(req.user, req.body));
}

exports.clearCart = (req, res) => {
    ShoppingCart.clearCart(req.user);
    res.status(200).send();
}