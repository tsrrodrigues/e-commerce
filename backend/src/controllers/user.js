const { validationResult } = require('express-validator')

// Importando Repositórios
const repository = require('../repositories/user')

exports.getAll = async (req, res, next) => {
  const data = await repository.getAll(req)
  res.status(200).send(data)
}

exports.getOne = async (req, res, next) => {
  const data = await repository.getOne(req)
  res.status(200).send(data)
}

exports.register = async (req, res, next) => {
  const { errors } = validationResult(req)
  if (errors.length > 0) {
    return res.status(400).send({ message: errors })
  }

  const data = await repository.register(req)
  return res.status(200).send(data)
}

exports.auth = async (req, res, next) => {
  const data = await repository.auth(req)
  res.status(200).send(data)
}

exports.edit = async (req, res, next) => {
  const { errors } = validationResult(req)
  if (errors.length > 0) {
    return res.status(400).send({ message: errors })
  }

  const data = await repository.edit(req)
  return res.status(200).send(data)
}

exports.editActive = async (req, res, next) => {
  const data = await repository.editActive(req)
  res.status(200).send(data)
}

exports.delete = async (req, res, next) => {
  const data = await repository.delete(req)
  res.status(200).send(data)
}
