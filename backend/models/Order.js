const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: String,
      quantity: Number,
      price: Number,
      image: String
    }
  ],
  subtotal: { type: Number, required: true },
  serviceCharge: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
  orderType: { type: String, enum: ['pickup', 'takeaway', 'delivery'], default: 'pickup' },
  deliveryZone: { type: String, enum: ['Centre', 'Banlieue', 'Autre', 'Aucun'], default: 'Aucun' },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out for delivery', 'delivered'],
    default: 'pending'
  },
  paymentMethod: { type: String, default: 'Mobile Money' },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  promoCode: { type: String, default: null },
  discount: { type: Number, default: 0 },
  deliveryAddress: { type: String, default: 'Retrait / Emporté' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
