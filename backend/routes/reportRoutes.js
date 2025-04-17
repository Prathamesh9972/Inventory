const express = require('express');
const router = express.Router();
const { getDetailedReport } = require('../controllers/reportController');

router.get('/detailed', getDetailedReport);

module.exports = router;
