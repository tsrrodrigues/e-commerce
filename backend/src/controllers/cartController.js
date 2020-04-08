const { validationResult } = require('express-validator');

// Importando Repositórios
const repository = require('../repositories/cartRepository');


exports.getAll = async (req, res, next) => {
  const data = await repository.getAll(req);
  res.status(200).send(data);
}

exports.getOne = async (req, res, next) => {
  const data = await repository.getOne(req);
  res.status(200).send(data);
}

exports.create = async (req, res, next) => {
  const data = await repository.create(req);
  res.status(200).send(data);
}

exports.edit = async (req, res, next) => {
  const data = await repository.edit(req);
  res.status(200).send(data);
}

exports.assignUser = async (req, res, next) => {
  const data = await repository.assignUser(req);
  res.status(200).send(data);
}

exports.delete = async (req, res, next) => {
  const data = await repository.delete(req);
  res.status(200).send(data);
}