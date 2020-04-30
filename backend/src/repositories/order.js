const mongoose = require('../database')
const moment = require('moment')

const Order = mongoose.model('Order')
const User = mongoose.model('User')
const Cart = mongoose.model('Cart')

exports.getAll = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
    // Actives
    let params = {}
    if (data.query.s === "waitdeliver") {
      params.status = "Aguardando Entrega"
    } else if (data.query.s === "fordeliver") {
      params.status = "Para Entrega"
    } else if (data.query.s === "finished") {
      params.status = "Finalizado"
    }

    const page = data.query.p? parseInt(data.query.p) : 1
    const limit = 5
    const skip = limit * (page-1)
    
    const orders =
      await Order
        .find(params, 'adress status id user payment cart date')
        .skip(skip).limit(limit)
    for (let index = 0; index < orders.length; index++) {
      orders[index].user = await User.findById(orders[index].user, 'name id cpf email phone')
      orders[index].cart = await Cart.findById(orders[index].cart, 'total items')
      for (let index2 = 0; index2 < orders[index].cart.items.length; index2++) {
        orders[index].cart.items[index2].price /= 100
      }
      orders[index].cart.total /= 100
    }
    return orders
  } catch (err) {
    return { error: 'List Orders failed' }
  }
}

exports.getOne = async (data) => {
  try {
    const order = await Order.findById(data.params.id, 'adress status id user payment cart date')
    order.user = await User.findById(order.user, 'name id cpf email phone')
    order.cart = await Cart.findById(order.cart, 'total items')
    for (let index = 0; index < order.cart.items.length; index++) {
      order.cart.items[index].price /= 100
    }
    order.cart.total /= 100
    return order
  } catch (err) {
    return { error: 'List Order failed' }
  }
}

exports.create = async (data) => {
  try {
    let order = new Order()
    const user = await User.findById(data.userId)
    
    let date = moment().utcOffset(-180).format();

    order.user = data.userId
    order.payment = data.body.payment
    order.cart = data.params.id
    order.adress = data.body.adress? data.body.adress : user.adress
    order.date = date
    order = await order.save()

    await Cart.findByIdAndUpdate(data.params.id, {order: true})
    await User.findByIdAndUpdate(data.userId, {active: true})
    
    return order
  } catch (err) {
    return { error: 'Create Order failed' }
  }
}

exports.editStatus = async (data) => {
  try {
    if (data.query.s) {
      const status_message = data.query.s
      const order = await Order.findByIdAndUpdate(data.params.id, {status: status_message})
      return order
    }
    return {error: 'No status message found'}
  } catch (err) {
    return { error: 'Edit Status Order failed' }
  }
}

exports.delete = async (data) => {
  try {
    const order = await Order.findByIdAndDelete(data.params.id)
    return order
  } catch (err) {
    return { error: 'Delete Order failed' }
  }
}
