import dbConnect from '../../../lib/mongodb'
import Activity from '../../../models/Activity'

export default async function handler(req, res) {
	const {
		query: { id },
		method
	} = req

	await dbConnect()

	switch (method) {
		case 'GET':
			try {
				const activity = await Activity.findById(id)
				if (!activity) {
					return res.status(400).json({ success: false })
				}
				res.status(200).json({ success: true, data: activity })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		case 'PUT':
			try {
				const { error } = Activity.validate(req.body)
				if (error)
					return res.status(422).json({
						error: { path: error.details[0].path[0], message: error.details[0].message },
						success: false
					})

				const activity = await Activity.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true
				})
				if (!activity) {
					return res.status(404).json({ success: false })
				}
				res.status(200).json({ success: true, data: activity })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		case 'DELETE':
			try {
				const deletedActivity = await Activity.deleteOne({ _id: id })
				if (!deletedActivity) {
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
