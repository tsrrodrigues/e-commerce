const express = require('express')

const router = express.Router()
const userController = require('../controllers/user')

// Importando Middlewares
const registerUserMiddleware = require('../middlewares/registerUser')
const authMiddleware = require('../middlewares/auth')

router.get('/', authMiddleware, userController.getAll) // Access Level = 2
router.get('/:id', authMiddleware, userController.getOne) // Access Level = 2

router.post('/', registerUserMiddleware, userController.register) // Access Level = All
router.post('/authenticate', userController.auth) // Access Level = All

router.put(
  '/:id',
  [authMiddleware, registerUserMiddleware],
  userController.edit
) // Access Level = All
router.patch('/:id', authMiddleware, userController.editActive) // Access Level = 3

router.delete('/:id', authMiddleware, userController.delete) // Access Level = 3

module.exports = router
