const express = require('express');
const { getDetailedReport } = require('../controllers/reportController'); // import the controller
const router = express.Router();

// Define the route for the detailed report
router.get('/detailed', getDetailedReport);

module.exports = router;
