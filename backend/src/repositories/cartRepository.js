const mongoose = require('mongoose')

const Cart = mongoose.model('Cart')
const Product = mongoose.model('Product')

exports.getAll = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
    const carts = await Cart.find()
    return carts
  } catch (err) {
    return { error: 'List Carts failed' }
  }
}

exports.getOne = async (data) => {
  try {
    const cart = await Cart.findById(data.params.id)
    return cart
  } catch (err) {
    return { error: 'List Cart failed' }
  }
}

exports.create = async () => {
  try {
    await Cart.findOneAndDelete({ user: '5e8e309792644039b8aedaeb' })
    let cart = new Cart()
    cart = await cart.save()
    return cart
  } catch (err) {
    return { error: 'Create new Cart failed' }
  }
}

exports.edit = async (data) => {
  try {
    let cart = await Cart.findById(data.params.id)
    const qtd = data.query.qtd ? data.query.qtd : 1

    let index = -1
    for (let i = 0; i < cart.items.length; i += 1) {
      if (data.headers.product_id === cart.items[i].item) {
        index = i
        break
      }
    }
    if (index > -1) {
      if (qtd === 0) cart.items.splice(index, 1)
      else cart.items[index].quantity = qtd
    } else {
      const product = await Product.findById(data.headers.product_id)
      cart.items.push({
        item: product.id,
        quantity: qtd,
        price: product.price,
      })
    }
    cart = await cart.save()
    return cart
  } catch (err) {
    return { error: 'Edit Cart failed' }
  }
}

exports.assignUser = async (data) => {
  try {
    if (data.userAccessLevel !== 1) return { message: 'Unauthorized' }
    let cart = await Cart.findById(data.params.id)
    cart.user = data.userId
    cart = await cart.save()
    return cart
  } catch (err) {
    return { error: 'Assign User to Cart failed' }
  }
}

exports.delete = async (data) => {
  try {
    const cart = await Cart.findByIdAndDelete(data.params.id)
    return cart
  } catch (err) {
    return { error: 'Delete Cart failed' }
  }
}
