'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: '5e8e309792644039b8aedaeb' // user to hold existing carts without users sign
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