const express = require('express')

const router = express.Router()
const orderController = require('../controllers/order')

// Importando Middlewares
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

router.get('/', orderController.getAll)
router.get('/:id', orderController.getOne)

router.post('/:id', orderController.create)

router.patch('/:id', orderController.editStatus)

router.delete('/:id', orderController.delete)

module.exports = router
