const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema({
  chemical: { type: mongoose.Schema.Types.ObjectId, ref: 'Chemical', required: true },
  quantity: { type: Number, required: true },
  customerName: { type: String },
  saleDate: { type: Date, default: Date.now },
  soldBy: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Sale', salesSchema)
