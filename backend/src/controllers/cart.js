// Importando Repositórios
const repository = require('../repositories/cart')

exports.getAll = async (req, res, next) => {
  const data = await repository.getAll(req)
  if (data.error) {
    res.status(400).send(data.error)
  }
  res.status(200).send(data)
}

exports.getOne = async (req, res, next) => {
  const data = await repository.getOne(req)
  if (data.error) {
    res.status(400).send(data.error)
  }
  res.status(200).send(data)
}

exports.create = async (req, res, next) => {
  const data = await repository.create()
  if (data.error) {
    res.status(400).send(data.error)
  }
  res.status(200).send(data)
}

exports.edit = async (req, res, next) => {
  const data = await repository.edit(req)
  if (data.error) {
    res.status(400).send(data.error)
  }
  res.status(200).send(data)
}

exports.delete = async (req, res, next) => {
  const data = await repository.delete(req)
  if (data.error) {
    res.status(400).send(data.error)
  }
  res.status(200).send(data)
}
