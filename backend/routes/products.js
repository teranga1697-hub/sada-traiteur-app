const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  seedProducts,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.get('/seed', seedProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
