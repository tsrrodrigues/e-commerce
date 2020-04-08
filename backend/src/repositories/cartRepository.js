const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');
const Product = mongoose.model('Product');

exports.get = async (data) => {
  try {
    const cart = await Cart.find({ user: data.userId });
    return cart
  } catch (err) {
    return { error: "List Items on Cart failed" }
  }
}

exports.create = async (data) => {
  try {
    let cart = new Cart();

    cart.user = data.userId;

    cart = await cart.save();

    return cart
  } catch (err) {
    return { error: "Create new Cart failed" }
  }
}

exports.addItem = async (data) => {
  try {
    let cart = await Cart.findOne({ user: data.userId });
    let qtd = data.query.qtd? data.query.qtd : 1
    
    let index = -1;
    for (let i = 0; i < cart.items.length; i++) {
      if (data.params.id == cart.items[i].item) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      cart.items[index].quantity = qtd;
    }
    else {
      const product = await Product.findById(data.params.id);
      cart.items.push({
        item: product.id,
        quantity: qtd,
        price: product.price
      });
    }

    cart = await cart.save();
    return cart
  } catch (err) {
    return { error: "Add Item on Cart failed" }
  }
}

exports.removeItem = async (data) => {
  try {
    let cart = await Cart.findOne({ user: data.userId });
    for (let i = 0; i < cart.items.length; i++) {
      if (data.params.id == cart.items[i].item) {
        cart.items.splice(i, 1);
      }
    }
    cart = await cart.save();
    return cart
  } catch (err) {
    return { error: "Remove Item from Cart failed" }
  }
}