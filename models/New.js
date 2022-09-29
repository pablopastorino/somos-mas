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
		content: { type: String, minLength: [10, 'Mínimo 10 caracteres'] },
		image: { type: String, required: true },
		categoryId: { type: mongoose.Schema.Types.ObjectId, required: true },
		type: String,
		createdAt: Date,
		updatedAt: { type: Date, default: Date.now },
		deletedAt: Date
	},
	{
		statics: {
			validate(newObject) {
				const schema = Joi.object({
					name: Joi.string().min(2).max(45).required(),
					content: Joi.string().min(10).required(),
					image: Joi.string().required(),
					categoryId: Joi.string().required(),
					type: Joi.string().required()
				})

				return schema.validate(newObject)
			}
		}
	}
)

export default mongoose.models.New || mongoose.model('New', schema)
