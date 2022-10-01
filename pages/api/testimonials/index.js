import dbConnect from '../../../lib/mongodb'
import Testimonial from '../../../models/Testimonial'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const testimonials = await Testimonial.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: testimonials })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const { error } = Testimonial.validate(req.body)
        if (error)
          return res.status(422).json({
            error: { path: error.details[0].path[0], message: error.details[0].message },
            success: false
          })

        const testimonial = await Testimonial.create({
          ...req.body,
          createdAt: new Date()
        })
        res.status(201).json({ success: true, data: testimonial })
      } catch (error) {
        console.log(error.message)
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
