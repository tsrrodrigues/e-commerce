const mongoose = require('../database')

const { Schema } = mongoose

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    payment: {
      type: String,
      required: true
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
      required: true
    },
    status: {
      type: String,
      trim: true,
      default: "Aguardando Entrega"
    },
    date: {
      type: String,
      trim: true
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
      }
    }
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order
