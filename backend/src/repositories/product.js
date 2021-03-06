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
    return { error: 'List Availables Products failed images. ' + err }
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
    return { error: 'List All Products failed. ' + err }
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
    return { error: 'List One Products failed. ' + err }
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
      const image = data.body.images[i].split(',')[1]
      let type = ""
      if(image.charAt(0)=='/'){
        type = ".jpeg";
      }else if(image.charAt(0)=='i'){
        type =".png";
      }
      const id = Math.floor((Math.random() * 10000))
      const filename = product.id + '_' + id + type
      fs.writeFile('./static/images/products/' + filename, image, 'base64', (err) => {
        if (err) {
          return {error: "Save image failed. " + err}
        }
      })
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
    return { error: 'Registration failed. ' + err}
  }
}

exports.edit = async (data) => {
  if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
  
  try {
    let params = {}
    
    const tag = await Tag.findOne({name: data.body.tag})
    params.tag = tag.id
    
    let product = await Product.findById(data.params.id)

    //IMAGES (RELOAD FRONTEND REQUIRED AFTER REQUEST)
    let images = []
    const imgs_length = data.body.images.length

    let product_id = data.params.id

    for (let i = 0; i < imgs_length; i++) {
      const url = data.body.images[i] ? data.body.images[i] : "url"

      // if image already exists, rename with a new id
      if (url.charAt(0) === '/') {
        const old_path = './static' + url

        const name = url.split('_')[0]
        const type = url.split('.')[1]
        const id = Math.floor((Math.random() * 10000))

        const new_path = name + '_' + id + '.' + type

        fs.renameSync(old_path, './static' + new_path, (err) => {
          if (err) {
            return {error: "Rename image failed. " + err}
          }
        })

        images[i] = new_path
      }

      // if image doesn't exist, save with a id
      if (url.charAt(0) === 'd') {
        const image = data.body.images[i].split(',')[1]
        
        let type = ""
        
        if (image.charAt(0) === '/') {
          type = ".jpeg";
        } 
        else if (image.charAt(0) === 'i') {
          type = ".png";
        }

        const id = Math.floor((Math.random() * 10000))
        const filename = product_id + '_' + id + type

        fs.writeFile('./static/images/products/' + filename, image, 'base64', (err) => {
          if (err) {
            return {error: "Save image failed. " + err}
          }
        })

        images[i] = '/images/products/' + filename
      }
    }

    for (let i = 0; i < product.images.length; i++) {
      const old_image = './static' + product.images[i]

      // remove any old images from product
      try {
        fs.unlinkSync(old_image)
      } catch (err) {
        console.log("No image with this path to delete: " + old_image)
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
    return { error: 'Edit failed. ' + err }
  }
}

exports.delete = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
    let product = await Product.findByIdAndDelete(data.params.id)
    for (let i = 0; i < product.images.length; i++) {
      const old_image = './static' + product.images[i]
      
      try {
        fs.unlinkSync(old_image)
      } catch (err) {
        console.log("No image with this path to delete: " + old_image)
      }
    }
    product.price /= 100
    product.tag = await Tag.findById(product.tag)
    return product
  } catch (err) {
    return { error: 'Delete failed. ' + err}
  }
}
