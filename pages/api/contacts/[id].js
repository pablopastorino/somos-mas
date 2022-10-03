import dbConnect from '../../../lib/mongodb'
import Contact from '../../../models/Contact'

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const contact = await Contact.findById(id)
        if (!contact) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: contact })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        // const { error } = Contact.validate(req.body)
        // if (error)
        //   return res.status(422).json({
        //     error: { path: error.details[0].path[0], message: error.details[0].message },
        //     success: false
        //   })

        const Contact = await Contact.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!Contact) {
          return res.status(404).json({ success: false })
        }
        res.status(200).json({ success: true, data: Contact })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE':
      try {
        const deletedContact = await Contact.deleteOne({ _id: id })
        if (!deletedContact) {
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
