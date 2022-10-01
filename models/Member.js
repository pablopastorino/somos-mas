import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, 'Mínimo 2 caracteres']
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, 'Mínimo 2 caracteres']
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true,
      trim: true
    }
  }
  // {
  //   statics: {
  //     validate(member) {
  //       const schema = Joi.object({
  //         name: Joi.string().min(2).max(45).required(),
  //         image: Joi.string().required()
  //       })

  //       return schema.validate(member)
  //     }
  //   }
  // }
)

export default mongoose.models.Member || mongoose.model('Member', schema)
