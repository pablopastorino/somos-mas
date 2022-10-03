import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, 'Mínimo dos caracteres.'],
      maxLength: [50, 'Máximo 50 caractares']
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, 'Mínimo dos caracteres.'],
      maxLength: [50, 'Máximo 50 caractares']
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minLength: [10, 'Mínimo diez caracteres..']
    }
  }
  // {
  // 	statics: {
  // 		validate(Contact) {
  // 			const schema = Joi.object({
  // 				name: Joi.string().min(2).max(45).required(),
  // 				image: Joi.string().uri(),
  // 				content: Joi.string().min(2).required()
  // 			})

  // 			return schema.validate(Contact)
  // 		}
  // 	}
  // }
)

export default mongoose.models.Contact || mongoose.model('Contact', schema)
