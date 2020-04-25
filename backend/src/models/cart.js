const mongoose = require('../database')

const { Schema } = mongoose

const CartSchema = new Schema(
  {
    total: {
      type: Number,
      default: 0,
    },
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
        },
        name: {
          type: String,
          trim: true,
          lowercase: true
        }
      }
    ],
    order: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart
