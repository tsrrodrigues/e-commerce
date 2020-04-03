'use strict'

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

router.get('/', userController.getAll);
router.post('/', [

    // Middleware validations
    // Nome
    check('name')
        .notEmpty().withMessage("O campo Nome deve ser preenchido")
        .isLength({min: 7}).withMessage("O campo Nome deve ter no mínimo 7 caracteres")
        .matches(/^[a-z ]+$/i).withMessage("O nome deve conter apenas letras"),
    // E-mail
    check('email').isEmail().withMessage("O email não é  válido"),
    // CPF
    check('cpf').isNumeric().withMessage("O campo CPF deve conter apenas números"),
    // Adress
        // CEP
    check('adress.cep').isNumeric().withMessage("O campo CEP deve conter apenas números"),
        // UF
    check('adress.uf').matches(/^[a-z ]+$/i),
    check('adress.uf').isLength({min: 2, max: 2}),
    // Password
    check('password').isLength({min: 8}).withMessage("A senha deve conter no mínimo 8 caracteres")

    
], userController.post);
router.delete('/:id', userController.delete);

module.exports = router;