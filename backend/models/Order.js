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
  orderType: { type: String, enum: ['pickup'], default: 'pickup' },
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'delivered'], default: 'pending' },
  paymentMethod: { type: String, default: 'Mobile Money' },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  deliveryAddress: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
