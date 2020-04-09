const mongoose = require('mongoose')

const Product = mongoose.model('Product')

exports.getAvailables = async (data) => {
  try {
    // TAG
    let params = {}
    if (data.query.tag) params = { tags: data.query.tag }
    // SORT
    let sort = ''
    if (data.query.sort) sort = data.query.sort

    let products = (
      await Product.find(
        params,
        '_id name description quantity price createdAt tags'
      ).sort(sort)
    ).filter((product) => product.quantity > 0)
    products.map((prod) => {
      prod.price /= 100
    })
    return products
  } catch (err) {
    return { error: 'List Availables Products failed' }
  }
}

exports.getAll = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }

    // TAG
    let params = {}
    if (data.query.tag) params = { tags: data.query.tag }
    // SORT
    let sort = ''
    if (data.query.sort) sort = data.query.sort

    const products = await Product.find(
      params,
      '_id name description quantity price createdAt tags'
    ).sort(sort)
    products.map((prod) => {
      prod.price /= 100
    })
    return products
  } catch (err) {
    return { error: 'List All Products failed' }
  }
}

exports.getOne = async (data) => {
  try {
    let product = await Product.findById(
      data.params.id,
      '_id name description quantity price createdAt tags'
    )
    product.price /= 100
    return product
  } catch (err) {
    return { error: 'List One Products failed' }
  }
}

exports.getByTag = async (data) => {
  try {
    let products = await Product.find(
      { tags: data.body.tags },
      '_id name description quantity price createdAt tags'
    )
    // products.map((prod) => {
    //   prod.price /= 100
    // })
    return products
  } catch (err) {
    return { error: 'List Products By tag failed' }
  }
}

exports.register = async (data) => {
  if (data.userAccessLevel < 2) return { error: 'Unauthorized' }

  const { name } = data.body
  try {
    if (await Product.findOne({ name }))
      return { error: 'Product already exists' }

    let product = new Product()

    product.name = data.body.name
    product.description = data.body.description
    product.price = data.body.price * 100
    product.quantity = data.body.quantity
    product.tags = data.body.tags

    product = await product.save()

    return product
  } catch (err) {
    return { error: 'Registration failed' }
  }
}

exports.edit = async (data) => {
  if (data.userAccessLevel < 2) return { error: 'Unauthorized' }

  try {
    await Product.findByIdAndUpdate(data.params.id, {
      $set: {
        name: data.body.name,
        description: data.body.description,
        price: data.body.price * 100,
        tags: data.body.tags,
      },
    })

    return { message: 'Produto editado com sucesso' }
  } catch (err) {
    return { error: 'Edit failed' }
  }
}

exports.editQuantity = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }

    const { id } = data.params
    const { quantity } = data.query
    await Product.findByIdAndUpdate(id, { quantity })
    return { message: 'Quantidade atualizada com sucesso' }
  } catch (err) {
    return { error: 'Edit failed' }
  }
}

exports.delete = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
    const product = await Product.findByIdAndDelete(data.params.id)
    return product
  } catch (err) {
    return { error: 'Delete failed' }
  }
}
