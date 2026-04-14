const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: ['revenue', 'expense'],
    required: true
  },
  category: { type: String, default: 'Général' },
  note: { type: String },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Finance', financeSchema);
