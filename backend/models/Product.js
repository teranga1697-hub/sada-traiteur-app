const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
  menuDay: {
    type: String,
    enum: ['Aucun', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche', 'Tous les jours'],
    default: 'Aucun'
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
