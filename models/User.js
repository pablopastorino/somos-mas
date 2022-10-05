import mongoose from 'mongoose'
import * as yup from 'yup'

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 50
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  state: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  zip: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  }
})

module.exports = mongoose.models.User || mongoose.model('User', schema)
