const { check } = require('express-validator')

module.exports = [
  // Nome
  check('name').notEmpty().withMessage('O campo Nome deve ser preenchido'),

  // Preco
  check('price')
    .notEmpty()
    .withMessage('O campo Preço deve ser preenchido')
    .isNumeric()
    .withMessage('O Preço deve conter apenas números'),

  // Quantidade
  check('quantity')
    .notEmpty()
    .withMessage('O campo Quantidade deve ser preenchido')
    .isNumeric()
    .withMessage('A quantidade deve conter apenas números'),
]
