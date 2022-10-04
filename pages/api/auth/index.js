import { useRouter } from 'next/router'
import dbConnect from '../../../lib/mongodb'
import User from '../../../models/User'
import { validatePassword } from '../../../utils/bcrypt'
import { createToken } from '../../../utils/token'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body

        const user = await User.findOne({ email: { $eq: email } })

        if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' })

        const validPassword = validatePassword(password, user.password)
        if (!validPassword)
          return res.status(400).json({ success: false, message: 'Invalid credentials' })

        const token = createToken({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        })
        res.status(200).json({ success: true, data: token })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
