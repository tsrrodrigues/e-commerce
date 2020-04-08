const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Importando Middlewares
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, cartController.getAll);
router.get('/:id', cartController.getOne);

router.post('/', cartController.create);

router.patch('/:id', cartController.edit);
router.put('/:id', authMiddleware, cartController.assignUser);

router.delete('/:id', cartController.delete);

module.exports = router;