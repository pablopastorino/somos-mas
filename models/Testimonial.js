import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, 'Mínimo dos caracteres.']
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, 'Mínimo dos caracteres.']
    },
    image: { type: String, required: true },
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: [10, 'Mínimo diez caracteres..']
    }
  }
  // {
  // 	statics: {
  // 		validate(testimonial) {
  // 			const schema = Joi.object({
  // 				name: Joi.string().min(2).max(45).required(),
  // 				image: Joi.string().uri(),
  // 				content: Joi.string().min(2).required()
  // 			})

  // 			return schema.validate(testimonial)
  // 		}
  // 	}
  // }
)

export default mongoose.models.Testimonial || mongoose.model('Testimonial', schema)
