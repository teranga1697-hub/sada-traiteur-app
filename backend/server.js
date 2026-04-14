const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const openingHoursRoutes = require('./routes/openingHours');
const { notFound, errorHandler } = require('./middleware/error');

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.warn('⚠️ ATTENTION : JWT_SECRET n’est pas défini. Le backend utilisera la clé par défaut. Créez un fichier backend/.env avec JWT_SECRET=...');
}

connectDB().catch((err) => console.error(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l’API SADA TRAITEUR' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/opening-hours', openingHoursRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend lancé sur http://localhost:${PORT}`);
});
