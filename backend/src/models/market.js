const mongoose = require('../database')

const { Schema } = mongoose

const MarketSchema = new Schema(
  {
    name: {
        type: String,
        required: [true, 'O Nome do Mercado é obrigatório'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'A Descrição do Mercado é obrigatório'],
        trim: true,
    },
    cnpj: {
      type: String,
      required: [true, 'O CNPJ é obrigatório'],
      trim: true,
      unique: true,
    },
    email: {
        type: String,
        required: [true, 'O Email é obrigatório'],
        trim: true,
        unique: true,
        lowercase: true,
    },
    adress: {
      cep: {
        type: String,
        required: [true, 'O CEP é obrigatório'],
        trim: true,
      },
      logradouro: {
        type: String,
        required: [true, 'O Logradouro é obrigatório'],
        trim: true,
      },
      complemento: {
        type: String,
        trim: true,
      },
      bairro: {
        type: String,
        required: [true, 'O Bairro é obrigatório'],
        trim: true,
      },
      localidade: {
        type: String,
        required: [true, 'A Cidade é obrigatória'],
        trim: true,
      },
      uf: {
        type: String,
        required: [true, 'O UF é obrigatório'],
        trim: true,
        len: 2,
        uppercase: true,
      },
    },
  },
  { timestamps: true }
)

const Market = mongoose.model('Market', MarketSchema)

module.exports = Market
