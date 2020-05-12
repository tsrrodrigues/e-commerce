const { check } = require('express-validator')

module.exports = [
  // Nome
  check('name')
    .notEmpty()
    .withMessage('O campo nome deve ser preenchido'),

  // E-mail
  check('email')
    .isEmail()
    .withMessage('O email não é  válido'),

  // CNPJ
  check('cnpj')
    .isNumeric()
    .withMessage('O campo CNPJ deve conter apenas números'),

  // Adress
  // CEP
  check('adress.cep')
    .isNumeric()
    .withMessage('O campo CEP deve conter apenas números'),
  // UF
  check('adress.uf')
    .matches(/^[a-z ]+$/i)
    .isLength({ min: 2, max: 2 }),

  check('description')
    .isLength({max: 300})
    .withMessage('A descrição deve conter no máximo 300 caracteres.')
]
