import { model, models } from "mongoose";

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  ownerId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  cityAndState: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  photos: {
    type: Array
  },
  averageStarRating: {
    type: Number,
    required: true
  },
  starRatings: {
    type: Array,
    required: true
  },
  hoursOpen: {
    type: Object
  }
}, {
  timestamps: true
})

module.exports = models.Post = mongoose.model('post', PostSchema)


