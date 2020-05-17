const express = require('express')

const router = express.Router()
const tagController = require('../controllers/tag')

// Importando Middlewares
const authMiddleware = require('../middlewares/auth')

router.get('/', tagController.getAll)

router.get('/:id', tagController.getOne)

router.post('/', authMiddleware, tagController.create)

router.put('/:id', authMiddleware, tagController.edit)

router.delete('/:id', authMiddleware, tagController.delete)

module.exports = router
