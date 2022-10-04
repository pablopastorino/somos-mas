import dbConnect from '../../../lib/mongodb'
import User from '../../../models/User'

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
        // const { error } = User.validate(req.body)
        // if (error)
        //   return res.status(422).json({
        //     error: { path: error.details[0].path[0], message: error.details[0].message },
        //     success: false
        //   })

        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!user) {
          return res.status(404).json({ success: false })
        }
        res.status(200).json({ success: true, data: user })
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
