const mongoose = require('../database')

const { Schema } = mongoose

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'O nome é obrigatório'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'O preco é obrigatório'],
    },
    quantity: {
      type: Number,
      required: [true, 'A quantidade do produto no estoque é obrigatória'],
    },
    tag: {
      type: Schema.Types.ObjectId,
      ref: 'Tag',
      required: [true, 'É necessário adicionar a categoria do produto'],
    },
    images: [{
      type: String,
      trim: true,
      required: true,
      unique: true
    }]
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
