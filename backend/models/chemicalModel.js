const mongoose = require("mongoose");

const chemicalSchema = new mongoose.Schema(
  {
    name: String,
    batchNumber: String,
    quantity: Number,
    intakeDate: Date,
    expirationDate: Date,
    addedBy: String, // Username of admin/staff
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chemical", chemicalSchema);
