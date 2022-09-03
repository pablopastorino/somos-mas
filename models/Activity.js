import mongoose from 'mongoose'
import Joi from 'joi'

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			minLength: [2, 'Mínimo dos caracteres.']
		},
		image: { type: String, required: true },
		content: { type: String },
		createdAt: Date,
		updatedAt: { type: Date, default: Date.now },
		deletedAt: Date
	},
	{
		statics: {
			validate(activity) {
				const schema = Joi.object({
					name: Joi.string().min(2).max(45).required(),
					image: Joi.string().uri(),
					content: Joi.string().min(2).required()
				})

				return schema.validate(activity)
			}
		}
		// query: {
		// 	byName(name) {
		// 		return this.where({ name: new RegExp(name, 'i') })
		// 	}
		// }
	}
)

export default mongoose.models.Activity || mongoose.model('Activity', schema)
