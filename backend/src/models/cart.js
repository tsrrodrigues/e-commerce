'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
	total: { 
    type: Number,
    default: 0
  },
	items: [{
		item: { 
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
		quantity: {
      type: Number,
      default: 1
    },
		price: {
      type: Number
    },
	}]
}, {timestamps: true});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;