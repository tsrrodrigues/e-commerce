const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const fs = require('fs')

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

    // PAGE
    let page = 0
    let limit = Number.MAX_SAFE_INTEGER
    let skip = 0

    if(data.query.p) {
      page = parseInt(data.query.p)
      limit = 5
      skip = limit * (page-1)
    }

    const users =
      await User.find(
        params,
        '_id name email cpf adress active access_level phone image'
      )
      .skip(skip).limit(limit)

    let pages = (await User.find(params)).length
    pages = pages % 5 == 0? pages/5 : parseInt(pages/5)+1

    return {pages, users}
  } catch (err) {
    return { error: 'List All Users failed' }
  }
}

exports.getOne = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
    const user = await User.findById(
      data.params.id,
      '_id name email cpf adress active access_level phone image'
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

    if (data.body.image) {
      const image = data.body.images[i].split(',')[1]
      let type = ""
      if (image.charAt(0) === '/') {
        type = ".jpeg";
      } 
      else if (image.charAt(0) === 'i') {
        type = ".png";
      }
      const filename = user.id + type
      fs.writeFile('./static/images/products/' + filename, image, 'base64', (err) => {
        if (err) {
          return {message: "Save image failed", error: err}
        }
      })
      user.image = '/images/users/' + filename
    }
    else {
      user.image = '/images/users/default.svg'
    }
    
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

    let user = await User.findById(data.params.id)

    //IMAGES
    if (data.body.image) {
      const image = data.body.image.split(',')[1]
      
      let type = ""
      if(image.charAt(0)=='/'){
        type = ".jpeg";
      }else if(image.charAt(0)=='i'){
        type =".png";
      }
      const filename = user.id + type

      fs.writeFile('./static/images/users/' + filename, image, 'base64', (err) => {
        if (err) {
          return {message: "Save Image Failed", error: err}
        }
      })
      params.image = '/images/users/' + filename
    }
    
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
    
    user = await User.findByIdAndUpdate(id, params)

    return {
      user,
      token: data.headers.authorization,
    }
  } catch (err) {
    return { error: 'Edit failed. ' + err }
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
    const old_image = './static' + user.image
    if (old_image !== '/images/users/default.svg') { 
      try {
        fs.unlinkSync(old_image)
      } catch (err) {
        console.log("No image with this path to delete: " + old_image)
      }
    }
    return user
  } catch (err) {
    return { error: 'Delete failed' }
  }
}
