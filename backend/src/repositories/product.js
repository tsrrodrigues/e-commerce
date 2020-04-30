const mongoose = require('../database')

const tagController = require('../controllers/tag')

const Product = mongoose.model('Product')
const Tag = mongoose.model('Tag')

exports.getAvailables = async (data) => {
  try {
    // TAG
    let params = {}
    if (data.query.tag) {
      const tag = await Tag.findOne({ name: data.query.tag })
      params = { tag: tag.id }
    }
    // SORT
    let sort = ''
    if (data.query.sort) sort = data.query.sort

    let products = (
      await Product.find(
        params,
        '_id name description quantity price createdAt tag'
      ).sort(sort)
    ).filter((product) => product.quantity > 0)
    for (let index = 0; index < products.length; index++) {
      products[index].price /= 100
      products[index].tag = await Tag.findById(products[index].tag)
    }
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
    if (data.query.tag) {
      const tag = await Tag.findOne({ name: data.query.tag })
      params = { tag: tag.id }
    }
    // SORT
    let sort = ''
    if (data.query.sort) sort = data.query.sort

    const page = data.query.p? parseInt(data.query.p) : 1
    const limit = 5
    const skip = limit * (page-1)

    let products =
      await Product.find(
        params,
        '_id name description quantity price createdAt tag'
      )
      .skip(skip).limit(limit)
      .sort(sort)

    for (let index = 0; index < products.length; index++) {
      products[index].price /= 100
      products[index].tag = await Tag.findById(products[index].tag)
    }
    return products
  } catch (err) {
    return { error: 'List All Products failed' }
  }
}

exports.getOne = async (data) => {
  try {
    let product = await Product.findById(
      data.params.id,
      '_id name description quantity price createdAt tag'
    )
    product.price /= 100
    product.tag = await Tag.findById(product.tag)
    return product
  } catch (err) {
    return { error: 'List One Products failed' }
  }
}

exports.register = async (data) => {  
  if (data.userAccessLevel < 2) return { error: 'Unauthorized' }

  const { name } = data.body
  if (await Product.findOne({ name }))
    return { error: 'Product already exists' }
  try {

    let product = new Product()

    product.name = data.body.name
    product.description = data.body.description
    product.price = parseInt(data.body.price * 100)
    product.quantity = data.body.quantity

    
    const tag = await Tag.findOne({ name: data.body.tag })
    if (tag) {
      product.tag = tag.id
    } else {
      let new_tag = new Tag()
      new_tag.name = data.body.tag
      new_tag = await new_tag.save()
      product.tag = new_tag.id
    }

    product = await product.save()

    return product
  } catch (err) {
    return { error: 'Registration failed' }
  }
}

exports.edit = async (data) => {
  if (data.userAccessLevel < 2) return { error: 'Unauthorized' }

  try {
    const tag = await Tag.findOne({name: data.body.tag})

    let product = await Product.findByIdAndUpdate(data.params.id, {
      $set: {
        name: data.body.name,
        description: data.body.description,
        price: data.body.price * 100,
        tag: tag.id
      },
    })
    product.tag = tag
    return product
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
    product.price /= 100
    product.tag = await Tag.findById(product.tag)
    return product
  } catch (err) {
    return { error: 'Delete failed' }
  }
}
