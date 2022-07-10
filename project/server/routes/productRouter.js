const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/', productController.getAll);
router.post('/purchase', productController.purchase);

module.exports = router;