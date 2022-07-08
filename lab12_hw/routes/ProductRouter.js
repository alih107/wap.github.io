const express = require('express');
const path = require('path');
const router = express.Router()

router.get('/products', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'products.html'));
});

router.post('/products', (req, res, next) => {
    console.log(req.body);
    res.render('product_saved', req.body);
});

module.exports = router;