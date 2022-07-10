const Product = require('../models/product')

exports.getAll = (req, res) => {
    res.json(Product.getAll());
};

exports.purchase = (req, res) => {
    res.json(Product.purchase(req.body));
}