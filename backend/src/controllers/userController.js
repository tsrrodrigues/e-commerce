'use strict'

const mongoose = require('../database');
const User = mongoose.model('User');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find({}, '_id name email cpf active');
        return res.send({ users });
    } catch (err) {
        return res.status(400).send({
            error: "List All Users failed",
            value: err
        })
    }
};

exports.post = async (req, res, next) => {
    const {errors} = validationResult(req);
    if(errors.length > 0) {
        return res.status(400).send({message: errors})
    }


    const { email, cpf } = req.body;
    try {
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'E-mail is already registred'})
        else if (await User.findOne({ cpf }))
            return res.status(400).send({ error: 'CPF is already registred'})

        let user = new User();

        user.name = req.body.name;
        user.cpf = req.body.cpf;
        user.email = req.body.email;
        user.password = req.body.password;
        user.adress.cep = req.body.adress.cep;
        user.adress.logradouro = req.body.adress.logradouro;
        user.adress.complemento = req.body.adress.complemento;
        user.adress.bairro = req.body.adress.bairro;
        user.adress.localidade = req.body.adress.localidade;
        user.adress.uf = req.body.adress.uf;

        user = await user.save();

        user.password = undefined; 

        return res.send({ user });
    } catch (err) {
        return res.status(400).send({
            error: "Registration failed",
            value: err
        })
    }
};

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        res.send({ name: user.name });
    } catch (err) {
        return res.status(400).send({
            error: "Delete failed",
            value: err
        })
    }
}