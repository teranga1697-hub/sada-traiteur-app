const Order = require('../models/Order');

const createOrder = async (req, res) => {
  const { items, subtotal, paymentMethod, orderType, deliveryZone, deliveryAddress, promoCode } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Le panier est vide' });
  }

  const serviceCharge = 200;
  const zoneFees = {
    Centre: 300,
    Banlieue: 500,
    Autre: 700,
    Aucun: 0
  };
  const promoRules = {
    SADA10: 0.1,
    WAVE5: 0.05,
    ORANGE20: 0.2
  };
  const normalizedPromo = promoCode ? promoCode.toString().trim().toUpperCase() : '';
  let discount = 0;
  if (normalizedPromo) {
    if (!promoRules[normalizedPromo]) {
      return res.status(400).json({ message: 'Code promo invalide.' });
    }
    discount = ((typeof subtotal === 'number' ? subtotal : 0) * promoRules[normalizedPromo]);
  }

  const deliveryFee = orderType === 'delivery' ? zoneFees[deliveryZone] || 500 : 0;
  const resolvedAddress = orderType === 'delivery' ? deliveryAddress || 'Adresse non fournie' : 'Retrait / Emporté';
  const subtotalValue = typeof subtotal === 'number' ? subtotal : 0;
  const total = Math.max(subtotalValue + serviceCharge + deliveryFee - discount, 0);

  const order = await Order.create({
    user: req.user._id,
    items,
    subtotal: subtotalValue,
    serviceCharge,
    deliveryFee,
    orderType: orderType || 'pickup',
    deliveryZone: orderType === 'delivery' ? deliveryZone || 'Centre' : 'Aucun',
    total,
    paymentMethod,
    promoCode: normalizedPromo || null,
    discount,
    deliveryAddress: resolvedAddress,
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
