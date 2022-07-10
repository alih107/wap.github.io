const express = require('express');
const router = express.Router();

const shoppingCartController = require('../controllers/shoppingCartController')

router.get('/', shoppingCartController.getByUserName);
router.patch('/', shoppingCartController.updateCart);
router.delete('/', shoppingCartController.clearCart);
router.post('/purchase', shoppingCartController.purchase)

module.exports = router;