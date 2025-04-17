const mongoose = require('mongoose')

const safetySchema = new mongoose.Schema({
  chemical: { type: mongoose.Schema.Types.ObjectId, ref: 'Chemical', required: true },
  precautions: String,
  storageGuidelines: String,
  msdsLink: String
}, { timestamps: true })

module.exports = mongoose.model('Safety', safetySchema)
