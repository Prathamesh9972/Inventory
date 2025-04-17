const Purchase = require('../models/purchaseModel')

// Validate incoming request data
const validatePurchase = (data) => {
  const { chemical, supplierName, quantity, purchasedBy } = data
  if (!chemical || !supplierName || !quantity || !purchasedBy) {
    return false
  }
  return true
}

// Create a new purchase
const addPurchase = async (req, res) => {
  try {
    // Validate incoming request data
    if (!validatePurchase(req.body)) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const purchase = await Purchase.create(req.body)
    res.status(201).json(purchase)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to log purchase' })
  }
}

// Get all purchases
const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate('chemical')
    res.status(200).json(purchases)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch purchases' })
  }
}

// Get a single purchase by ID
const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id).populate('chemical')
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' })
    }
    res.status(200).json(purchase)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch purchase' })
  }
}

// Update a purchase
const updatePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' })
    }
    res.status(200).json(purchase)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update purchase' })
  }
}

// Delete a purchase
const deletePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndDelete(req.params.id)
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' })
    }
    res.status(200).json({ message: 'Purchase deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete purchase' })
  }
}

module.exports = { addPurchase, getAllPurchases, getPurchaseById, updatePurchase, deletePurchase }
