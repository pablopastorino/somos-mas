import dbConnect from '../../../lib/mongodb'
import User from '../../../models/User'
import { createHash } from '../../../utils/bcrypt'
import { createToken } from '../../../utils/token'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({})
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const user = await User.create({ ...req.body, password: createHash(req.body.password) })
        const token = createToken({ ...user._doc, password: '' })
        res.status(201).json({ success: true, data: token })
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
