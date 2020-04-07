const mongoose = require('mongoose');
const User = mongoose.model('User');

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const bcrypt = require('bcrypt');


function generateToken (params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

exports.getAll = async (data) => {
    try {
        if (data.userAccessLevel < 3)
            return { error: "Unauthorized " }
        const users = await User.find({}, '_id name email cpf active access_level');
        return users
    } catch (err) {
        return { error: "List All Users failed" }
    }
}

exports.getActives = async (data) => {
    try {
        if (data.userAccessLevel < 2)
            return { error: "Unauthorized" }
        const users = await User.find({active: true}, '_id name email cpf adress active access_level');
        return users
    } catch (err) {
        return { error: "List Actives Users failed" }
    }
}

exports.getOne = async (data) => {
    try {
        if (data.userAccessLevel < 2)
            return { error: "Unauthorized" }
        const user = await User.findById(data.params.id, '_id name email cpf adress active access_level');
        return user
    } catch (err) {
        return { error: "List One User failed" }
    }
}

exports.register = async (data) => {
    const { email, cpf } = data.body;
    try {
        if (await User.findOne({ email }))
            return { error: 'E-mail is already registred'}
        else if (await User.findOne({ cpf }))
            return { error: 'CPF is already registred'}

        let user = new User();

        user.name = data.body.name;
        user.cpf = data.body.cpf;
        user.email = data.body.email;
        user.password = data.body.password;
        user.adress.cep = data.body.adress.cep;
        user.adress.logradouro = data.body.adress.logradouro;
        user.adress.complemento = data.body.adress.complemento;
        user.adress.bairro = data.body.adress.bairro;
        user.adress.localidade = data.body.adress.localidade;
        user.adress.uf = data.body.adress.uf;
        user.access_level = data.body.access_level;

        user = await user.save();

        user.password = undefined;
        user.cpf = undefined;

        return {
            user,
            token: generateToken({ id: user.id, access_level: user.access_level })
        }
    } catch (err) {
        return { error: "Registration failed" }
    }
}

exports.auth = async (data) => {
    try {
        const { email, password } = data.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return {error: "Usuario não encontrado"}
        
        if (!await bcrypt.compare(password, user.password))
            return {error: "Senha Inválida"}

        user.password = undefined;
        user.adress = undefined;

        const token = jwt.sign({ id: user.id, access_level: user.access_level }, authConfig.secret, {
            expiresIn: 86400
        });

        return {
            user,
            token: generateToken({ id: user.id, access_level: user.access_level })
        }
    } catch (err) {
        return { error: "Login failed" }
    }
}

exports.edit = async (data) => {
    try {
        const hash = await bcrypt.hash(data.body.password, 10);
        data.body.password = hash;

        const id = data.params.id;

        const user = await User.findByIdAndUpdate(id, {
            $set: {
                name: data.body.name,
                email: data.body.email,
                adress: data.body.adress,
                password: data.body.password,
            }
        });

        return {
            message: "Usuário editado com sucesso",
            token: data.headers.authorization
        }
    } catch (err) {
        return { error: "Edit failed"  }
    }
}

exports.editActive = async (data) => {
    try {
        if (data.userAccessLevel < 3)
            return { error: "Unauthorized" }
        await User.findByIdAndUpdate(data.params.id, {active: data.query.active});
        return { message: "Active atualizado com sucesso" };
    } catch (err) {
        return { error: "Edit failed" }
    }
}

exports.delete = async (data) => {
    try {
        if (data.userAccessLevel < 3)
            return { error: "Unauthorized" }
        const user = await User.findByIdAndDelete(data.params.id);
        return user
    } catch (err) {
        return { error: "Delete failed" }
    }
}