const Sale = require('../models/salesModel')

// Add a new sale
const addSale = async (req, res) => {
  try {
    const sale = await Sale.create(req.body)
    res.status(201).json(sale)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to log sale' })
  }
}

// Get all sales
const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('chemical')
    res.status(200).json(sales)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch sales' })
  }
}

// Get a single sale by ID
const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('chemical')
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' })
    }
    res.status(200).json(sale)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch sale' })
  }
}

// Update a sale by ID
const updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' })
    }
    res.status(200).json(sale)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update sale' })
  }
}

// Delete a sale by ID
const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id)
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' })
    }
    res.status(200).json({ message: 'Sale deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete sale' })
  }
}

module.exports = { addSale, getAllSales, getSaleById, updateSale, deleteSale }
