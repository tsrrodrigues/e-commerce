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

exports.getAll = async () => {
    try {
        const users = await User.find({}, '_id name email cpf active');
        return { users };
    } catch (err) {
        return {
            error: "List All Users failed",
            value: err
        }
    }
}

exports.getOne = async (id) => {
    try {
        const user = await User.findById(id, '_id name email cpf adress active');
        return { user };
    } catch (err) {
        return {
            error: "List One User failed",
            value: err
        }
    }
}

exports.register = async (data) => {
    const { email, cpf } = data;
    try {
        if (await User.findOne({ email }))
            return { error: 'E-mail is already registred'}
        else if (await User.findOne({ cpf }))
            return { error: 'CPF is already registred'}

        let user = new User();

        user.name = data.name;
        user.cpf = data.cpf;
        user.email = data.email;
        user.password = data.password;
        user.adress.cep = data.adress.cep;
        user.adress.logradouro = data.adress.logradouro;
        user.adress.complemento = data.adress.complemento;
        user.adress.bairro = data.adress.bairro;
        user.adress.localidade = data.adress.localidade;
        user.adress.uf = data.adress.uf;

        user = await user.save();

        user.password = undefined; 

        return {
            user,
            token: generateToken({ id: user.id })
        }
    } catch (err) {
        return {
            error: "Registration failed",
            value: err
        }
    }
}

exports.auth = async (data) => {
    const { email, password } = data;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return {error: "Usuario não encontrado"}
    
    if (!await bcrypt.compare(password, user.password))
        return {error: "Senha Inválida"}

    user.password = undefined;
    user.adress = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400
    });

    return {
        user,
        token: generateToken({ id: user.id })
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
            id: user.id, 
            message: "Usuário editado com sucesso",
            token: data.headers.authorization
        }
    } catch (err) {
        return {
            error: "Edit failed",
            value: err
        }
    }
}

exports.editActive = async (data) => {
    try {
        const id = data.params.id;
        const active = data.query.active;
        await User.findByIdAndUpdate(id, {active: active});
        return { message: "Active atualizado com sucesso" };
    } catch (err) {
        return {
            error: "Edit failed",
            value: err
        }
    }
}

exports.delete = async (data) => {
    try {
        const id = data.id;
        const user = await User.findByIdAndDelete(id);
        return { name: user.name }
    } catch (err) {
        return {
            error: "Delete failed",
            value: err
        }
    }
}