const mongoose = require('../database')

const Cart = mongoose.model('Cart')
const Product = mongoose.model('Product')

exports.getAll = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
    const carts = await Cart.find()
    carts.map((cart) => {
      cart.total /= 100
      cart.items.map((item) => {
        item.price /= 100
      })
    })
    return carts
  } catch (err) {
    return { error: 'List Carts failed. ' + err }
  }
}

exports.getOne = async (data) => {
  try {
    const cart = await Cart.findById(data.params.id)
    cart.total /= 100
    cart.items.map((item) => {
      item.price /= 100
    })
    return cart
  } catch (err) {
    return { error: 'List Cart failed. ' + err }
  }
}

exports.create = async () => {
  try {
    let cart = new Cart()
    cart.total = parseInt(0)
    cart = await cart.save()
    return cart
  } catch (err) {
    return { error: 'Create new Cart failed. ' + err }
  }
}

exports.edit = async (data) => {
  try {
    let cart = await Cart.findById(data.params.id)
    const qtd = data.query.qtd ? parseInt(data.query.qtd) : 1

    let index = -1
    for (let i = 0; i < cart.items.length; i += 1) {
      if (data.headers.product_id == cart.items[i].item) {
        index = i
        break
      }
    }
    if (index > -1) {
      if (qtd === 0) {
        cart.total -= cart.items[index].price * cart.items[index].quantity
        cart.items.splice(index, 1)
      }
      else {
        cart.total -= cart.items[index].price * cart.items[index].quantity;
        cart.items[index].quantity = qtd
        cart.total += cart.items[index].price * cart.items[index].quantity;
      }
    } else {
      const product = await Product.findById(data.headers.product_id)
      cart.items.push({
        item: product.id,
        quantity: qtd,
        price: product.price,
        name: product.name
      })
      cart.total += product.price * qtd
    }
    cart = await cart.save()
    cart.items.map((item) => {
      item.price /= 100
    })
    cart.total /= 100
    return cart
  } catch (err) {
    return { error: 'Edit Cart failed. ' + err }
  }
}

exports.delete = async (data) => {
  try {
    const cart = await Cart.findByIdAndDelete(data.params.id)
    return cart
  } catch (err) {
    return { error: 'Delete Cart failed. ' + err }
  }
}
