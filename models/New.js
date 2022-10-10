import mongoose from 'mongoose'
import { stringifyQuery } from 'next/dist/server/server-route-utils'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: [2, 'Mínimo 2 caracteres']
  },
  content: { type: String, minLength: [10, 'Mínimo 10 caracteres'] },
  image: String
  // categoryId: { type: mongoose.Schema.Types.ObjectId, required: true },
  // type: String
})

export default mongoose.models.New || mongoose.model('New', schema)
