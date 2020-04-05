const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Importando Middlewares
const registerProductMiddleware = require('../middlewares/registerProduct');

router.get('/', productController.getAvailables);
router.get('/admin', productController.getAll);
router.get('/:id', productController.getOne);

router.post('/', registerProductMiddleware, productController.register);

router.put('/:id', registerProductMiddleware, productController.edit);
router.patch('/:id', productController.editQuantity);

router.delete('/:id', productController.delete);

module.exports = router;