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
      params = { tag: tag.name }
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
    if (data.query.tag) {
      const tag = await Tag.findOne({ name: data.query.tag })
      params = { tag: tag.name }
    }
    // SORT
    let sort = ''
    if (data.query.sort) sort = data.query.sort

    let products = await Product.find(
      params,
      '_id name description quantity price createdAt tag'
    ).sort(sort)

    products.map(async (prod) => {
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
      '_id name description quantity price createdAt tag'
    )
    product.price /= 100
    return product
  } catch (err) {
    return { error: 'List One Products failed' }
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
    product.price = parseInt(data.body.price * 100)
    product.quantity = data.body.quantity

    const tagName = data.body.tag
    if (await Tag.findOne({ name: tagName })) {
      product.tag = data.body.tag
    } else {
      let tag = new Tag()
      tag.name = data.body.tag
      tag = await tag.save()
      product.tag = data.body.tag
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
    const product = await Product.findByIdAndUpdate(data.params.id, {
      $set: {
        name: data.body.name,
        description: data.body.description,
        price: data.body.price * 100,
        tag: data.body.tag,
      },
    })

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
    return product
  } catch (err) {
    return { error: 'Delete failed' }
  }
}
