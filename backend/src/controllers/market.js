const { validationResult } = require('express-validator')

// Importando Repositórios
const repository = require('../repositories/market')

exports.get = async (req, res, next) => {
  const data = await repository.get(req)
  res.status(200).send(data)
}

exports.register = async (req, res, next) => {
  const { errors } = validationResult(req)
  if (errors.length > 0) {
    return res.status(400).send({ message: errors })
  }

  const data = await repository.register(req)
  if (data.error)
    return res.status(400).send(data)
  return res.status(200).send(data)
}

exports.edit = async (req, res, next) => {
  const { errors } = validationResult(req)
  if (errors.length > 0) {
    return res.status(400).send({ message: errors })
  }

  const data = await repository.edit(req)
  return res.status(200).send(data)
}

exports.delete = async (req, res, next) => {
  const data = await repository.delete(req)
  res.status(200).send(data)
}
