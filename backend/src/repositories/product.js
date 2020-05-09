const mongoose = require('../database')
const fs = require('fs')

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
    
    // PAGE
    let page = 0
    let limit = Number.MAX_SAFE_INTEGER
    let skip = 0

    if(data.query.p) {
      page = parseInt(data.query.p)
      limit = 5
      skip = limit * (page-1)
    }

    let products = (
      await Product.find(
        params,
        '_id name description quantity price createdAt tag images'
      )
      .sort(sort)
      .skip(skip).limit(limit)
      ).filter((product) => product.quantity > 0)

    let pages = (await Product.find(params)).length
    pages = pages % 5 == 0? pages/5 : parseInt(pages/5)+1

    for (let index = 0; index < products.length; index++) {
      products[index].price /= 100
      products[index].tag = await Tag.findById(products[index].tag)
    }

    return {pages, products}
  } catch (err) {
    return { error: 'List Availables Products failed images' }
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

    // PAGE
    let page = 0
    let limit = Number.MAX_SAFE_INTEGER
    let skip = 0

    if(data.query.p) {
      page = parseInt(data.query.p)
      limit = 5
      skip = limit * (page-1)
    }

    let products =
      await Product.find(
        params,
        '_id name description quantity price createdAt tag images'
      )
      .sort(sort)
      .skip(skip).limit(limit)

    let pages = (await Product.find(params)).length
    pages = pages % 5 == 0? pages/5 : parseInt(pages/5)+1

    for (let index = 0; index < products.length; index++) {
      products[index].price /= 100
      products[index].tag = await Tag.findById(products[index].tag)
    }

    return {pages, products}
  } catch (err) {
    return { error: 'List All Products failed' }
  }
}

exports.getOne = async (data) => {
  try {
    let product = await Product.findById(
      data.params.id,
      '_id name description quantity price createdAt tag images'
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
    return { error: 'Product already exists', status: 409}
  try {

    let product = new Product()

    product.name = data.body.name
    product.description = data.body.description
    product.price = parseInt(data.body.price * 100)
    product.quantity = data.body.quantity
    product.images = []

    // IMAGE
    for (let i = 0; i < data.body.images.length; i++) {
      const image = data.body.images[i]
      let type = ""
      if(image.charAt(0)=='/'){
        type = ".jpeg";
      }else if(image.charAt(0)=='i'){
        type =".png";
      }
      const count = i + 1
      const filename = product.id + '_' + count + type
      fs.writeFile('./static/images/products/' + filename, image, 'base64', function(err) {
        if (err) {
          return {message: "Save Image Failed", error: err}
        }
      });
      product.images[i] = '/images/products/' + filename
    }

    // TAG
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
    return { error: 'Registration failed ', status: err}
  }
}

exports.edit = async (data) => {
  if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
  
  try {
    let params = {}
    
    const tag = await Tag.findOne({name: data.body.tag})
    params.tag = tag.id
    
    let product = await Product.findById(data.params.id)

    //IMAGES
    let images = []
    const imgs_length = data.body.images.length
    let product_id = data.params.id

    for (let i = 0; i < imgs_length; i++) {
      const url = data.body.images[i] ? data.body.images[i] : "url"

      if (url.charAt(0) === '/') {
        fs.rename('./static' + url, './static' + url + i, function(err) {
          if (err) {
            return {message: "Rename temp images failed", error: err}
          }
        })

      } 
      else if (url.charAt(0) === 'd') {
        const image = data.body.images[i].split(',')[1]
        let type = ""
        
        if (image.charAt(0) === '/') {
          type = ".jpeg";
        } 
        else if (image.charAt(0) === 'i') {
          type = ".png";
        }

        const count = i + 1
        const filename = product_id + '_' + count + type

        fs.writeFile('./static/images/products/' + filename, image, 'base64', function(err) {
          if (err) {
            return {message: "Save images failed", error: err}
          }
        })

        images[i] = '/images/products/' + filename
      }
    }
    
    for (let i = 0; i < imgs_length; i++) {
      const url = data.body.images[i] ? data.body.images[i] : "url"

      if (url.charAt(0) === '/') {
        const name = url.split('_')[0]
        const count = i + 1
        const type = url.split('.')[1]

        const path = name + '_' + count + '.' + type

        fs.rename('./static' + url + i, './static' + path, function(err) {
          if (err) {
            return {message: "Rename images failed", error: err}
          }
        })

        images[i] = path
      }
    }

    params.images = images
    
    if (data.body.name)
    params.name = data.body.name
    if (data.body.description)
    params.description = data.body.description
    if (data.body.price)
    params.price = data.body.price * 100
    
    product = await Product.findByIdAndUpdate(data.params.id, params)
    product.tag = tag
    return product
  } catch (err) {
    return { error: 'Edit failed. ' + err }
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
    let product = await Product.findByIdAndDelete(data.params.id)
    for (let i = 0; i < product.images.length; i++) {
      const count = i + 1
      fs.unlinkSync('../' + product.images[i])
    }
    product.price /= 100
    product.tag = await Tag.findById(product.tag)
    return product
  } catch (err) {
    return { error: 'Delete failed' }
  }
}
