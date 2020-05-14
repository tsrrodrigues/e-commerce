// Importando Repositórios
const repository = require('../repositories/order')

exports.getAll = async (req, res, next) => {
  const data = await repository.getAll(req)
  if (data.error) {
    return res.status(400).send(data)
  }
  res.status(200).send(data)
}

exports.getOne = async (req, res, next) => {
  const data = await repository.getOne(req)
  if (data.error) {
    return res.status(400).send(data)
  }
  res.status(200).send(data)
}

exports.create = async (req, res, next) => {
  const data = await repository.create(req)
  if (data.error)
    return res.status(400).send(data)
  res.status(200).send(data)
}

exports.editStatus = async (req, res, next) => {
  const data = await repository.editStatus(req)
  if (data.error) {
    return res.status(400).send(data)
  }
  res.status(200).send(data)
}

exports.delete = async (req, res, next) => {
  const data = await repository.delete(req)
  if (data.error) {
    return res.status(400).send(data)
  }
  res.status(200).send(data)
}
