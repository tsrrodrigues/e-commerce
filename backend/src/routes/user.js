const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Importando Middlewares
const registerUserMiddleware = require('../middlewares/registerUser');
const authMiddleware = require('../middlewares/auth');

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);

router.post('/', registerUserMiddleware, userController.register);
router.post('/authenticate', userController.auth);

router.put('/:id', [authMiddleware, registerUserMiddleware], userController.edit);
router.patch('/:id', authMiddleware, userController.editActive);

router.delete('/:id', userController.delete);

module.exports = router;