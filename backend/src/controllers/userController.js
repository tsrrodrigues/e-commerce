'use strict'

const mongoose = require('../database');
const User = mongoose.model('User');

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
        res.send(await User.findByIdAndDelete(id));
    } catch (err) {
        return res.status(400).send({
            error: "Delete failed",
            value: err
        })
    }
}