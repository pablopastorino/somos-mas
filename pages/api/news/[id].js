import dbConnect from '../../../lib/mongodb'
import New from '../../../models/New'

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const newDoc = await New.findById(id)
        if (!newDoc) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: newDoc })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        // const { error } = New.validate(req.body)
        // if (error)
        //   return res.status(422).json({
        //     error: { path: error.details[0].path[0], message: error.details[0].message },
        //     success: false
        //   })

        const newDoc = await New.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!newDoc) {
          return res.status(404).json({ success: false })
        }
        res.status(200).json({ success: true, data: newDoc })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE':
      try {
        const deletedNew = await New.deleteOne({ _id: id })
        if (!deletedNew) {
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
