const { validationResult } = require('express-validator')

// Importando Repositórios
const repository = require('../repositories/user')

exports.getAll = async (req, res, next) => {
  const data = await repository.getAll(req)
  if (data.error) {
    res.status(400).send(data)
  }
  res.status(200).send(data)
}

exports.getOne = async (req, res, next) => {
  const data = await repository.getOne(req)
  if (data.error) {
    res.status(400).send(data)
  }
  res.status(200).send(data)
}

exports.register = async (req, res, next) => {
  const { errors } = validationResult(req)
  if (errors.length > 0) {
    return res.status(400).send({ error: errors })
  }

  const data = await repository.register(req)
  if (data.error) {
    res.status(400).send(data)
  }
  return res.status(200).send(data)
}

exports.auth = async (req, res, next) => {
  const data = await repository.auth(req)
  if (data.error) {
    res.status(400).send(data)
  }
  res.status(200).send(data)
}

exports.edit = async (req, res, next) => {
  const { errors } = validationResult(req)
  if (errors.length > 0) {
    return res.status(400).send({ error: errors })
  }

  const data = await repository.edit(req)
  if (data.error) {
    res.status(400).send(data)
  }
  return res.status(200).send(data)
}

exports.editActive = async (req, res, next) => {
  const data = await repository.editActive(req)
  if (data.error) {
    res.status(400).send(data)
  }
  res.status(200).send(data)
}

exports.delete = async (req, res, next) => {
  const data = await repository.delete(req)
  if (data.error) {
    res.status(400).send(data)
  }
  res.status(200).send(data)
}
