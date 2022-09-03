import dbConnect from '../../../lib/mongodb'
import Category from '../../../models/Category'

export default async function handler(req, res) {
	const {
		query: { id },
		method
	} = req

	await dbConnect()

	switch (method) {
		case 'GET':
			try {
				const category = await Category.findById(id)
				if (!category) {
					return res.status(400).json({ success: false })
				}
				res.status(200).json({ success: true, data: category })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		case 'PUT':
			try {
				const { error } = Category.validate(req.body)
				if (error)
					return res.status(422).json({
						error: { path: error.details[0].path[0], message: error.details[0].message },
						success: false
					})

				const category = await Category.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true
				})
				if (!category) {
					return res.status(404).json({ success: false })
				}
				res.status(200).json({ success: true, data: category })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		case 'DELETE':
			try {
				const deletedCategory = await Category.deleteOne({ _id: id })
				if (!deletedCategory) {
					return res.status(400).json({ success: false })
				}
				res.status(204).json({ success: true, data: {} })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		default:
			res.status(400).json({ success: false })
			break
	}
}
