const Sale = require('../models/salesModel');
const Purchase = require('../models/purchaseModel');
const Chemical = require('../models/chemicalModel');

const getDetailedReport = async (req, res) => {
  try {
    // Fetch all sales details
    const salesDetails = await Sale.find()
      .populate('chemical', 'name batchNumber')
      .select('chemical quantity customerName saleDate soldBy payment');

    // Fetch all purchases details
    const purchaseDetails = await Purchase.find()
      .populate('chemical', 'name batchNumber')
      .select('chemical quantity price supplierName purchaseDate purchasedBy payment');

    // Fetch all chemical details
    const chemicalDetails = await Chemical.find()
      .select('name batchNumber quantity intakeDate expirationDate addedBy');

    // Calculate total sales value
    const totalSalesValue = salesDetails.reduce((total, sale) => {
      return total + (sale.quantity * (sale.chemical.price || 0));
    }, 0);

    // Calculate total purchase cost
    const totalPurchaseCost = purchaseDetails.reduce((total, purchase) => {
      return total + (purchase.quantity * purchase.price);
    }, 0);

    // Calculate total payment received for sales
    const totalPaymentReceived = salesDetails.reduce((total, sale) => {
      return total + sale.payment.amountPaid;
    }, 0);

    // Calculate total payment made for purchases
    const totalPaymentMade = purchaseDetails.reduce((total, purchase) => {
      return total + purchase.payment.amountPaid;
    }, 0);

    // Prepare detailed report
    const report = {
      salesCount: salesDetails.length,
      totalSalesValue,
      totalPaymentReceived,
      salesDetails,
      purchaseCount: purchaseDetails.length,
      totalPurchaseCost,
      totalPaymentMade,
      purchaseDetails,
      totalChemicals: chemicalDetails.length,
      chemicalDetails,
    };

    // Send the report
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate detailed report' });
  }
};

module.exports = { getDetailedReport };
