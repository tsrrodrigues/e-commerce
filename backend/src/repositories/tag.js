const mongoose = require('../database')

const Tag = mongoose.model('Tag')

exports.getAll = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }

    // PAGE
    let page = 0
    let limit = Number.MAX_SAFE_INTEGER
    let skip = 0

    if(data.query.p) {
      page = parseInt(data.query.p)
      limit = 5
      skip = limit * (page-1)
    }

    const tags =
      await Tag.find()
        .sort('name')
        .skip(skip).limit(limit)

    let pages = (await Tag.find()).length
    pages = pages % 5 == 0? pages/5 : parseInt(pages/5)+1

    return {pages, tags}
  } catch (err) {
    return { error: 'List Tags failed. ' + err }
  }
}

exports.getOne = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
    const tag = await Tag.findById(data.params.id)
    return tag
  } catch (err) {
    return { error: 'List Tag failed. ' + err }
  }
}

exports.create = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
    let tag = new Tag()
    tag.name = data.body.name
    tag = await tag.save()
    return tag
  } catch (err) {
    return { error: 'Create new Tag failed. ' + err }
  }
}

exports.edit = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
    let tag = await Tag.findById(data.params.id)
    tag.name = data.body.name
    tag = await tag.save()
    return tag
  } catch (err) {
    return { error: 'Edit Tag failed. ' + err }
  }
}

exports.delete = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
    const tag = await Tag.findByIdAndDelete(data.params.id)
    return tag
  } catch (err) {
    return { error: 'Delete Tag failed. ' + err }
  }
}
