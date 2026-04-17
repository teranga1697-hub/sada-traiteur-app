
 const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Finance = require('../models/Finance');
const OpeningHour = require('../models/OpeningHours');

const DEFAULT_OPENING_HOURS = [
  { day: 'Lundi', dayIndex: 0, open: '09:00', close: '20:00', closed: false },
  { day: 'Mardi', dayIndex: 1, open: '09:00', close: '20:00', closed: false },
  { day: 'Mercredi', dayIndex: 2, open: '09:00', close: '20:00', closed: false },
  { day: 'Jeudi', dayIndex: 3, open: '09:00', close: '20:00', closed: false },
  { day: 'Vendredi', dayIndex: 4, open: '09:00', close: '22:00', closed: false },
  { day: 'Samedi', dayIndex: 5, open: '10:00', close: '22:00', closed: false },
  { day: 'Dimanche', dayIndex: 6, open: '10:00', close: '18:00', closed: false }
];

const getDashboardStats = async (req, res) => {
  const orders = await Order.find();
  const totalOrders = orders.length;
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pending = orders.filter((order) => order.status === 'pending').length;
  const confirmed = orders.filter((order) => order.status === 'confirmed').length;
  const delivered = orders.filter((order) => order.status === 'delivered').length;
  const monthly = orders.reduce((stats, order) => {
    const month = new Date(order.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
    stats[month] = (stats[month] || 0) + order.total;
    return stats;
  }, {});
  const products = await Product.countDocuments();
  const clients = await User.countDocuments();
  res.json({ totalOrders, revenue, pending, confirmed, delivered, monthly, products, clients });
};

const getClients = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

const getFinancialOverview = async (req, res) => {
  const orders = await Order.find();
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const expenses = orders.length * 2.5;
  const profits = revenue - expenses;
  res.json({ revenue, expenses, profits });
};

const getFinanceOverview = async (req, res) => {
  const entries = await Finance.find().sort({ date: -1 });
  const totalRevenue = entries.filter((entry) => entry.type === 'revenue').reduce((sum, entry) => sum + entry.amount, 0);
  const totalExpenses = entries.filter((entry) => entry.type === 'expense').reduce((sum, entry) => sum + entry.amount, 0);
  const profit = totalRevenue - totalExpenses;
  const categoryBreakdown = entries.reduce((acc, entry) => {
    const category = entry.category || 'Général';
    if (!acc[category]) acc[category] = { revenue: 0, expense: 0 };
    acc[category][entry.type] += entry.amount;
    return acc;
  }, {});
  res.json({ totalRevenue, totalExpenses, profit, entries, categoryBreakdown });
};

const getOpeningHours = async (req, res) => {
  const hours = await OpeningHour.find().sort({ dayIndex: 1 });
  if (!hours.length) {
    return res.json(DEFAULT_OPENING_HOURS);
  }
  res.json(hours);
};

const updateOpeningHours = async (req, res) => {
  const { hours } = req.body;
  if (!Array.isArray(hours) || hours.length === 0) {
    return res.status(400).json({ message: 'Données d’horaires invalides.' });
  }

  const updatedHours = [];
  for (const item of hours) {
    const { day, dayIndex, open, close, closed } = item;
    if (!day || dayIndex === undefined || !open || !close) {
      return res.status(400).json({ message: 'Chaque jour doit avoir un nom, un ordre et des horaires valides.' });
    }
    const hourDoc = await OpeningHour.findOneAndUpdate(
      { day },
      { dayIndex, open, close, closed: Boolean(closed) },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    updatedHours.push(hourDoc);
  }

  const result = updatedHours.sort((a, b) => a.dayIndex - b.dayIndex);
  res.json(result);
};

const addFinanceEntry = async (req, res) => {
  const { title, amount, type, category, note, date } = req.body;
  if (!title || amount === undefined || !type) {
    return res.status(400).json({ message: 'Titre, montant et type sont requis.' });
  }
  const entry = await Finance.create({
    title,
    amount,
    type,
    category: category || 'Général',
    note,
    date: date ? new Date(date) : new Date()
  });
  res.status(201).json(entry);
};

const deleteFinanceEntry = async (req, res) => {
  const { id } = req.params;
  const entry = await Finance.findById(id);
  if (!entry) {
    return res.status(404).json({ message: 'Entrée financière introuvable' });
  }
  await entry.remove();
  res.json({ message: 'Entrée financière supprimée' });
};

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const createProduct = async (req, res) => {
  const { name, category, description, price, image, featured, available, menuDay } = req.body;

  const product = new Product({
    name,
    category,
    description,
    price,
    image,
    featured: featured || false,
    available: available !== undefined ? available : true,
    menuDay: menuDay || 'Aucun'
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, description, price, image, featured, available, menuDay } = req.body;

  const product = await Product.findById(id);

  if (product) {
    product.name = name || product.name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;
    product.featured = featured !== undefined ? featured : product.featured;
    product.available = available !== undefined ? available : product.available;
    product.menuDay = menuDay || product.menuDay;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Produit non trouvé' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (product) {
    await product.remove();
    res.json({ message: 'Produit supprimé' });
  } else {
    res.status(404).json({ message: 'Produit non trouvé' });
  }
};

module.exports = {
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
};
