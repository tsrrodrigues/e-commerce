const { check } = require('express-validator')

module.exports = [
  // Nome
  // First
  check('name.first')
    .notEmpty()
    .withMessage('O campo Primeiro Nome deve ser preenchido')
    .matches(/^[a-z ]+$/i)
    .withMessage('O nome deve conter apenas letras'),
  
  // Last
  check('name.last')
    .notEmpty()
    .withMessage('O campo Sobrenome deve ser preenchido')
    .matches(/^[a-z ]+$/i)
    .withMessage('O nome deve conter apenas letras'),

  // E-mail
  check('email').isEmail().withMessage('O email não é  válido'),

  // CPF
  check('cpf')
    .isNumeric()
    .withMessage('O campo CPF deve conter apenas números'),

  // Phone
  check('phone')
    .isNumeric()
    .withMessage('O campo telefone deve conter apenas números.')
    .isLength({ min:10, max:12 })
    .withMessage('O campo telefone deve conter entre 10 e 12 caracteres.'),

  // Adress
  // CEP
  check('adress.cep')
    .isNumeric()
    .withMessage('O campo CEP deve conter apenas números'),
  // UF
  check('adress.uf')
    .matches(/^[a-z ]+$/i)
    .isLength({ min: 2, max: 2 }),

  // Password
  check('password')
    .isLength({ min: 8 })
    .withMessage('A senha deve conter no mínimo 8 caracteres'),
]
