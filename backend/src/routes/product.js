const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Importando Middlewares
const registerProductMiddleware = require('../middlewares/registerProduct');
const authMiddleware = require('../middlewares/auth');

router.get('/', productController.getAvailables); // Access Level = All
router.get('/admin', authMiddleware, productController.getAll); // Access Level = 2
router.get('/:id', productController.getOne); // Access Level = All

router.post('/', [authMiddleware, registerProductMiddleware], productController.register); // Access Level = 2

router.put('/:id', [authMiddleware, registerProductMiddleware], productController.edit); // Access Level = 2
router.patch('/:id', authMiddleware, productController.editQuantity); // Access Level = 2

router.delete('/:id', authMiddleware, productController.delete); // Access Level = 2

module.exports = router;