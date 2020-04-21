const mongoose = require('../database')

const { Schema } = mongoose

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    }
  },
  { timestamps: true }
)

const Tag = mongoose.model('Tag', TagSchema)
module.exports = Tag
