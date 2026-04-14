const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'sada-secret';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'superadmin123';

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};

const register = async (req, res) => {
  const { name, email, password, phone, address, adminCode } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: 'Email déjà utilisé' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashed,
    phone,
    address,
    isAdmin: adminCode === ADMIN_SECRET
  });
  res.status(201).json({
    token: generateToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Identifiants invalides' });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: 'Mot de passe incorrect' });
  res.json({
    token: generateToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }
  });
};

const profile = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Utilisateur non authentifié' });
  res.json(req.user);
};

module.exports = { register, login, profile };
