const { validationResult } = require('express-validator')

// Importando Repositórios
const repository = require('../repositories/productRepository')

exports.getAvailables = async (req, res, next) => {
  const data = await repository.getAvailables(req)
  res.status(200).send(data)
}

exports.getAll = async (req, res, next) => {
  const data = await repository.getAll(req)
  res.status(200).send(data)
}

exports.getOne = async (req, res, next) => {
  const data = await repository.getOne(req)
  res.status(200).send(data)
}

exports.getByTag = async (req, res, next) => {
  const data = await repository.getByTag(req)
  return res.status(200).send(data)
}

exports.register = async (req, res, next) => {
  const { errors } = validationResult(req)
  if (errors.length > 0) {
    return res.status(400).send({ message: errors })
  }

  const data = await repository.register(req)
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

exports.editQuantity = async (req, res, next) => {
  const data = await repository.editQuantity(req)
  res.status(200).send(data)
}

exports.delete = async (req, res, next) => {
  const data = await repository.delete(req)
  res.status(200).send(data)
}
