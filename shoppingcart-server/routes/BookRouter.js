const express = require('express');
const router = express.Router();

const bookController = require('../controllers/BookController')

router.get('/', bookController.getAll);
router.get('/:bookId', bookController.getById);
router.delete('/:bookId', bookController.deleteById);
router.delete('/', bookController.deleteAll);
router.post('/', bookController.save);
router.put('/:bookId', bookController.putById);
router.patch('/:bookId', bookController.patchById);

module.exports = router;