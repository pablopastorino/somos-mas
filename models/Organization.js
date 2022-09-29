import mongoose from 'mongoose'
import Joi from 'joi'

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, 'Mínimo 2 caracteres']
    },
    phone: String,
    address: String,
    welcomeText: String,
    facebook: { type: String },
    linkedin: String,
    instagram: String,
    image: { type: String, required: true },
    createdAt: Date,
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date
  },
  {
    statics: {
      validate(organization) {
        const schema = Joi.object({
          name: Joi.string().min(2).max(45).required(),
          image: Joi.string().required()
        })

        return schema.validate(organization)
      }
    }
  }
)

export default mongoose.models.Organization || mongoose.model('Organization', schema)
