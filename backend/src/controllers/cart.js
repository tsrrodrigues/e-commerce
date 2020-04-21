// Importando Repositórios
const repository = require('../repositories/cart')

exports.getAll = async (req, res, next) => {
  const data = await repository.getAll(req)
  res.status(200).send(data)
}

exports.getOne = async (req, res, next) => {
  const data = await repository.getOne(req)
  res.status(200).send(data)
}

exports.create = async (req, res, next) => {
  const data = await repository.create()
  res.status(200).send(data)
}

exports.edit = async (req, res, next) => {
  const data = await repository.edit(req)
  res.status(200).send(data)
}

exports.delete = async (req, res, next) => {
  const data = await repository.delete(req)
  res.status(200).send(data)
}
