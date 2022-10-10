import dbConnect from '../../../lib/mongodb'
import User from '../../../models/User'
import { createToken } from '../../../utils/token'

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(id)
        if (!user) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!user) {
          return res.status(404).json({ success: false })
        }

        const token = createToken({ ...user._doc, password: '' })
        res.status(200).json({ success: true, data: token })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE':
      try {
        const user = await User.deleteOne({ _id: id })
        if (!user) {
          return res.status(400).json({ success: false })
        }
        res.status(204).end()
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
