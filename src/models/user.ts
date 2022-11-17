import { model, models } from "mongoose";

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = models.User = mongoose.model('user', UserSchema)


