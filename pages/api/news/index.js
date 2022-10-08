import dbConnect from '../../../lib/mongodb'
import New from '../../../models/New'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const news = await New.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: news })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const newDocument = await New.create({
          ...req.body
        })
        res.status(201).json({ success: true, data: newDocument })
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
