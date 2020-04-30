const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

const mongoose = require('../database')

const User = mongoose.model('User')

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
}

exports.getAll = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }

    // TAG
    let params = {}
    if (data.query.active) {
      params = { active: true }
    }

    const page = data.query.p? parseInt(data.query.p) : 1
    const limit = 5
    const skip = limit * (page-1)

    const users =
      await User.find(
        params,
        '_id name email cpf adress active access_level phone'
      )
      .skip(skip).limit(limit)

    return users
  } catch (err) {
    return { error: 'List All Users failed' }
  }
}

exports.getOne = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
    const user = await User.findById(
      data.params.id,
      '_id name email cpf adress active access_level phone'
    )
    return user
  } catch (err) {
    return { error: 'List One User failed' }
  }
}

exports.register = async (data) => {
  const { email, cpf } = data.body
  try {
    if (await User.findOne({ email }))
      return { error: 'E-mail is already registred' }
    if (await User.findOne({ cpf }))
      return { error: 'CPF is already registred' }

    let user = new User()

    user.name.first = data.body.name.first
    user.name.last = data.body.name.last
    user.cpf = data.body.cpf
    user.email = data.body.email
    user.phone = data.body.phone
    user.password = data.body.password
    user.adress.cep = data.body.adress.cep
    user.adress.logradouro = data.body.adress.logradouro
    user.adress.complemento = data.body.adress.complemento
    user.adress.bairro = data.body.adress.bairro
    user.adress.localidade = data.body.adress.localidade
    user.adress.uf = data.body.adress.uf
    user.access_level = data.body.access_level

    user = await user.save()

    user.password = undefined
    user.cpf = undefined

    return {
      user,
      token: generateToken({ id: user.id, access_level: user.access_level }),
    }
  } catch (err) {
    return { error: 'Registration failed' }
  }
}

exports.auth = async (data) => {
  try {
    const { email, password } = data.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) return { error: 'Usuario não encontrado' }

    if (!(await bcrypt.compare(password, user.password)))
      return { error: 'Senha Inválida' }

    user.password = undefined

    jwt.sign(
      { id: user.id, access_level: user.access_level },
      authConfig.secret,
      {
        expiresIn: 86400,
      }
    )

    return {
      user,
      token: generateToken({ id: user.id, access_level: user.access_level }),
    }
  } catch (err) {
    return { error: 'Login failed' }
  }
}

exports.edit = async (data) => {
  try {
    
    const { id } = data.params
    
    let params = {}
    
    if (data.body.name)
    params.name = data.body.name
    if (data.body.email)
    params.email = data.body.email
    if (data.body.cpf)
    params.cpf = data.body.cpf
    if (data.body.phone)
    params.phone = data.body.phone
    if (data.body.adress)
    params.adress = data.body.adress
    if (data.body.password) {
      const hash = await bcrypt.hash(data.body.password, 10)
      params.password = hash
    }
    
    const user = await User.findByIdAndUpdate(id, params)

    return {
      user,
      token: data.headers.authorization,
    }
  } catch (err) {
    return { error: 'Edit failed', err: err }
  }
}

exports.editActive = async (data) => {
  try {
    if (data.userAccessLevel < 3) return { error: 'Unauthorized' }
    await User.findByIdAndUpdate(data.params.id, { active: data.query.active })
    return { message: 'Active atualizado com sucesso' }
  } catch (err) {
    return { error: 'Edit failed' }
  }
}

exports.delete = async (data) => {
  try {
    if (data.userAccessLevel < 3) return { error: 'Unauthorized' }
    const user = await User.findByIdAndDelete(data.params.id)
    return user
  } catch (err) {
    return { error: 'Delete failed' }
  }
}
