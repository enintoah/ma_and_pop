import { model, models } from "mongoose";

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  reviewerId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reviewerName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true 
  }
}, {
  timestamps: true
})

module.exports = models.Review = mongoose.model('review', ReviewSchema)
