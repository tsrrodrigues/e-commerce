const mongoose = require('mongoose')

const Order = mongoose.model('Order')
const User = mongoose.model('User')

exports.getAll = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
    const orders = await Order.find()
    return orders
  } catch (err) {
    return { error: 'List Orders failed' }
  }
}

exports.getOne = async (data) => {
  try {
    const order = await Order.findById(data.params.id)
    return order
  } catch (err) {
    return { error: 'List Order failed' }
  }
}

exports.create = async (data) => {
  try {
    let order = new Order()
    const user = await User.findById(data.userId)

    order.user = data.userId
    order.payment = data.body.payment
    order.cart = data.params.id
    order.adress = user.adress

    order = await order.save()
    return order
  } catch (err) {
    return { error: 'Create Order failed' }
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
