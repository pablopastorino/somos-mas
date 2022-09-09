import mongoose from 'mongoose'
import Joi from 'joi'

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			minLength: [2, 'Mínimo 2 caracteres']
		},
		image: String,
		createdAt: Date,
		updatedAt: { type: Date, default: Date.now },
		deletedAt: Date
	},
	{
		statics: {
			validate(category) {
				const schema = Joi.object({
					name: Joi.string().min(2).max(45).required(),
					image: Joi.string().url().required()
				})

				return schema.validate(category)
			}
		}
	}
)

export default mongoose.models.Category || mongoose.model('Category', schema)
