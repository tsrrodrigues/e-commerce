const express = require('express')

const router = express.Router()
const orderController = require('../controllers/order')

// Importando Middlewares
const authMiddleware = require('../middlewares/auth')

router.get('/', authMiddleware, orderController.getAll)
router.get('/:id', authMiddleware, orderController.getOne)

router.post('/:id', authMiddleware, orderController.create)

router.patch('/:id', orderController.editStatus)

router.delete('/:id', authMiddleware, orderController.delete)

module.exports = router
