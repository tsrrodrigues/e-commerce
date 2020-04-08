const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Importando Middlewares
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, cartController.get);

router.post('/', authMiddleware, cartController.create);

router.patch('/:id', authMiddleware, cartController.addItem);

router.delete('/:id', authMiddleware, cartController.removeItem);

module.exports = router;