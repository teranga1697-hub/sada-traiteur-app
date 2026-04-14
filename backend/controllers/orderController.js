const Order = require('../models/Order');

const createOrder = async (req, res) => {
  const { items, subtotal, paymentMethod } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Le panier est vide' });
  }
  const serviceCharge = 200;
  const order = await Order.create({
    user: req.user._id,
    items,
    subtotal: typeof subtotal === 'number' ? subtotal : 0,
    serviceCharge,
    orderType: 'pickup',
    total: (typeof subtotal === 'number' ? subtotal : 0) + serviceCharge,
    paymentMethod,
    deliveryAddress: 'Retrait / Emporté',
    status: 'pending',
    paymentStatus: 'pending'
  });
  res.status(201).json(order);
};

const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('user', 'name email');
  res.json(orders);
};

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ message: 'Commande introuvable' });
  if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    return res.status(403).json({ message: 'Accès refusé' });
  }
  res.json(order);
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');
  res.json(orders);
};

const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Commande introuvable' });
  order.status = req.body.status || order.status;
  if (req.body.paymentStatus) order.paymentStatus = req.body.paymentStatus;
  await order.save();
  res.json(order);
};

module.exports = { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus };
