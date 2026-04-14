const express = require('express');
const router = express.Router();
const { getOpeningHours } = require('../controllers/adminController');

router.get('/', getOpeningHours);

module.exports = router;
