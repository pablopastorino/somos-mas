import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	name: String,
	email: String
})

module.exports = mongoose.models.User || mongoose.model('User', schema)
