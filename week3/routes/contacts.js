const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getOne);

router.post('/', contactsController.addCon);

router.put('/:id', contactsController.updateCon);

router.delete('/:id', contactsController.deleteCon);

module.exports = router;