const { validationResult } = require('express-validator');

// Importando Repositórios
const repository = require('../repositories/cartRepository');


exports.get = async (req, res, next) => {
  const data = await repository.get(req);
  res.status(200).send(data);
}

exports.create = async (req, res, next) => {
  const data = await repository.create(req);
  res.status(200).send(data);
}

exports.addItem = async (req, res, next) => {
  const data = await repository.addItem(req);
  res.status(200).send(data);
}

exports.removeItem = async (req, res, next) => {
  const data = await repository.removeItem(req);
  res.status(200).send(data);
}