const mongoose = require('../database')

const Market = mongoose.model('Market')

exports.get = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }

    const market = await Market
        .findOne({}, '_id name email cnpj adress description')

    return market
  } catch (err) {
    return { error: 'List Market failed. ' + err }
  }
}

exports.register = async (data) => {

  try {
    if (data.userAccessLevel < 3) return { error: 'Unauthorized' }
    
    let market = new Market()
    
    market.name = data.body.name
    market.description = data.body.description
    market.email = data.body.email
    market.cnpj = data.body.cnpj
    market.adress.cep = data.body.adress.cep
    market.adress.logradouro = data.body.adress.logradouro
    market.adress.complemento = data.body.adress.complemento
    market.adress.bairro = data.body.adress.bairro
    market.adress.localidade = data.body.adress.localidade
    market.adress.uf = data.body.adress.uf
    
    market = await market.save()

    market.cnpj = undefined

    return market
  } catch (err) {
    return { error: 'Registration failed. ' + err }
  }
}

exports.edit = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }

    let market = await Market.findOne()

    let params = {}
    if (data.body.name)
        params.name = data.body.name
    if (data.body.email)
        params.email = data.body.email
    if (data.body.cnpj)
        params.cnpj = data.body.cnpj
    if (data.body.adress)
        params.adress = data.body.adress
    if (data.body.description) {
      params.description = data.body.description
    }
    
    market = await Market.findByIdAndUpdate(market.id, params)

    return market
  } catch (err) {
    return { error: 'Edit failed. ' + err }
  }
}

exports.delete = async (data) => {
  try {
    if (data.userAccessLevel < 3) return { error: 'Unauthorized' }
    
    let market = await Market.findOneAndDelete()
    market.cnpj = undefined

    return market
  } catch (err) {
    return { error: 'Delete failed. ' + err}
  }
}
