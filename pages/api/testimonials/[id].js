import dbConnect from '../../../lib/mongodb'
import Testimonial from '../../../models/Testimonial'

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const testimonial = await Testimonial.findById(id)
        if (!testimonial) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: testimonial })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        const { error } = Testimonial.validate(req.body)
        if (error)
          return res.status(422).json({
            error: { path: error.details[0].path[0], message: error.details[0].message },
            success: false
          })

        const testimonial = await Testimonial.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!testimonial) {
          return res.status(404).json({ success: false })
        }
        res.status(200).json({ success: true, data: testimonial })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE':
      try {
        const testimonial = await Testimonial.deleteOne({ _id: id })
        if (!testimonial) {
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
