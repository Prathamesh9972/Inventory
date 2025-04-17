const express = require('express')
const router = express.Router()
const { addPurchase, getAllPurchases, getPurchaseById, updatePurchase, deletePurchase } = require('../controllers/purchaseController')

router.post('/', addPurchase)

router.get('/', getAllPurchases)

router.get('/:id', getPurchaseById)

router.put('/:id', updatePurchase)

router.delete('/:id', deletePurchase)

module.exports = router
