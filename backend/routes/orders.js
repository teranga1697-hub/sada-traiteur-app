const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/admin', protect, admin, getAllOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id', protect, admin, updateOrderStatus);

module.exports = router;
