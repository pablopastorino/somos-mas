import dbConnect from '../../../lib/mongodb'
import Contact from '../../../models/Contact'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const contacts = await Contact.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: contacts })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        // const { error } = Contact.validate(req.body)
        // if (error)
        //   return res.status(422).json({
        //     error: { path: error.details[0].path[0], message: error.details[0].message },
        //     success: false
        //   })

        const contact = await Contact.create({ ...req.body })
        res.status(201).json({ success: true, data: contact })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
