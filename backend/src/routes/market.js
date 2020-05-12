const express = require('express')

const router = express.Router()
const marketController = require('../controllers/market')

// Importando Middlewares
const registerMarketMiddleware = require('../middlewares/registerMarket')
const authMiddleware = require('../middlewares/auth')

router.get('/', authMiddleware, marketController.get) // Access Level = 2

router.post('/', [authMiddleware, registerMarketMiddleware], marketController.register) // Access Level = 3

router.put('/', authMiddleware, marketController.edit) // Access Level = 2

router.delete('/', authMiddleware, marketController.delete) // Access Level = 3

module.exports = router
