const mongoose = require('mongoose');

const openingHoursSchema = new mongoose.Schema({
  day: { type: String, required: true, unique: true },
  dayIndex: { type: Number, required: true },
  open: { type: String, required: true, default: '09:00' },
  close: { type: String, required: true, default: '20:00' },
  closed: { type: Boolean, default: false }
});

module.exports = mongoose.model('OpeningHour', openingHoursSchema);
