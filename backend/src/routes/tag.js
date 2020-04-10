const express = require('express')

const router = express.Router()
const tagController = require('../controllers/tag')

// Importando Middlewares
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

router.get('/', tagController.getAll)

router.post('/', tagController.create)

router.put('/:id', tagController.edit)

router.delete('/:id', tagController.delete)

module.exports = router
