const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');
const validate = require('../middleware/validation')

router.get('/', booksController.getBooks);

router.get('/:id', booksController.getOne);

router.post('/', validate.saveBook, booksController.addBook);

router.put('/:id', validate.saveBook, booksController.updateBook);

router.delete('/:id', booksController.deleteBook);

module.exports = router;