'use strict'

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const registerUserMiddleware = require('../middlewares/registerUser')
const authMiddleware = require('../middlewares/auth');

router.get('/', userController.getAll);
router.post('/', registerUserMiddleware, userController.post);
router.delete('/:id', userController.delete);
router.post('/authenticate', userController.auth);

router.post('/authenticate/teste', authMiddleware, userController.teste);

module.exports = router;