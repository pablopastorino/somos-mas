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
		description: { type: String, minLength: [10, 'Mínimo 10 caracteres'] },
		createdAt: Date,
		updatedAt: { type: Date, default: Date.now },
		deletedAt: Date
	},
	{
		statics: {
			validate(category) {
				const schema = Joi.object({
					name: Joi.string().min(2).max(45).required(),
					description: Joi.string().min(10).required()
				})

				return schema.validate(category)
			}
		}
		// query: {
		// 	byName(name) {
		// 		return this.where({ name: new RegExp(name, 'i') })
		// 	}
		// }
	}
)

export default mongoose.models.Category || mongoose.model('Category', schema)
