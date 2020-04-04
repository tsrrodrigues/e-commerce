'use strict'

const mongoose = require('../database');
const User = mongoose.model('User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken (params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

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
}

exports.getOne = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id, '_id name email cpf active');
        return res.send({ user });
    } catch (err) {
        return res.status(400).send({
            error: "List One User failed",
            value: err
        })
    }
}


exports.post = async (req, res, next) => {
    const { errors } = validationResult(req);
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

        return res.send({
            user,
            token: generateToken({ id: user.id })
        });
    } catch (err) {
        return res.status(400).send({
            error: "Registration failed",
            value: err
        })
    }
}

exports.auth = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({error: "Usuario não encontrado"});
    
    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: "Senha Inválida"});

    user.password = undefined;
    user.adress = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400
    });

    res.send({
        user,
        token: generateToken({ id: user.id })
    });
}


exports.put = async (req, res, next) => {
    try {
        const { errors } = validationResult(req);
        if(errors.length > 0) {
            return res.status(400).send({message: errors})
        }

        const hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                adress: req.body.adress,
                password: req.body.password,
            }
        });

        return res.send({
            id: user.id, 
            message: "Usuário editado com sucesso",
            token: req.headers.authorization
        });
    } catch (err) {
        return res.status(400).send({
            error: "Edit failed",
            value: err
        })
    }
}

exports.patch = async (req, res, next) => {
    try {
        const id = req.params.id;
        const active = req.query.active;
        const user = await User.findByIdAndUpdate(id, {active: active});
        return res.send({ message: "Active atualizado com sucesso" });
    } catch (err) {
        return res.status(400).send({
            error: "Edit failed",
            value: err
        })
    }
}


exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        return res.send({ name: user.name });
    } catch (err) {
        return res.status(400).send({
            error: "Delete failed",
            value: err
        })
    }
}