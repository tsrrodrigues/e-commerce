const mongoose = require('mongoose')

const { Schema } = mongoose
const bcrypt = require('bcrypt')

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'O nome é obrigatório'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'O Email é obrigatório'],
      trim: true,
      unique: true,
      lowercase: true,
    },
    cpf: {
      type: String,
      required: [true, 'O CPF é obrigatório'],
      trim: true,
      unique: true,
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
    password: {
      type: String,
      required: [true, 'A senha é obrigatória'],
      min: 8,
      select: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    access_level: {
      type: Number,
      default: 1,
      min: 1,
      max: 3,
    },
  },
  { timestamps: true }
)

UserSchema.pre('save', async function encryptPassword(next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User
