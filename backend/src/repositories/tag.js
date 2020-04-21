const mongoose = require('../database')

const Tag = mongoose.model('Tag')

exports.getAll = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
    const tags = await Tag.find().sort('name')
    return tags
  } catch (err) {
    return { error: 'List Tags failed' }
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
    return { error: 'Create new Tag failed' }
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
    return { error: 'Edit Tag failed' }
  }
}

exports.delete = async (data) => {
  try {
    if (data.userAccessLevel < 2) return { error: 'Unauthorized' }
    const tag = await Tag.findByIdAndDelete(data.params.id)
    return tag
  } catch (err) {
    return { error: 'Delete Tag failed' }
  }
}