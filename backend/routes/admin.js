const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getDashboardStats,
  getClients,
  getFinancialOverview,
  getFinanceOverview,
  addFinanceEntry,
  deleteFinanceEntry,
  getOpeningHours,
  updateOpeningHours,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/adminController');

router.get('/stats', protect, admin, getDashboardStats);
router.get('/clients', protect, admin, getClients);
router.get('/finance', protect, admin, getFinanceOverview);
router.post('/finance', protect, admin, addFinanceEntry);
router.delete('/finance/:id', protect, admin, deleteFinanceEntry);
router.get('/opening-hours', protect, admin, getOpeningHours);
router.put('/opening-hours', protect, admin, updateOpeningHours);

// Routes pour la gestion des produits
router.get('/products', protect, admin, getProducts);
router.post('/products', protect, admin, createProduct);
router.put('/products/:id', protect, admin, updateProduct);
router.delete('/products/:id', protect, admin, deleteProduct);

module.exports = router;
