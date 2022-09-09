import dbConnect from '../../../lib/mongodb'
import Member from '../../../models/Member'

export default async function handler(req, res) {
	const {
		query: { id },
		method
	} = req

	await dbConnect()

	switch (method) {
		case 'GET':
			try {
				const member = await Member.findById(id)
				if (!member) {
					return res.status(400).json({ success: false })
				}
				res.status(200).json({ success: true, data: member })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		case 'PUT':
			try {
				const { error } = Member.validate(req.body)
				if (error)
					return res.status(422).json({
						error: { path: error.details[0].path[0], message: error.details[0].message },
						success: false
					})

				const member = await Member.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true
				})
				if (!member) {
					return res.status(404).json({ success: false })
				}
				res.status(200).json({ success: true, data: member })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break

		case 'DELETE':
			try {
				const deletedMember = await Member.deleteOne({ _id: id })
				if (!deletedMember) {
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
