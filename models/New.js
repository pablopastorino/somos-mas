import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minLength: [2, 'Mínimo 2 caracteres']
  },
  content: { type: String, minLength: [10, 'Mínimo 10 caracteres'] },
  image: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: String
})

export default mongoose.models.New || mongoose.model('New', schema)
