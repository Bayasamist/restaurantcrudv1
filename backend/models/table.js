const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  status: {
    type: String,
    enum: ['idle', 'occupied', 'reserved'],
    default: 'idle'
  }
}, { timestamps: true });

module.exports = mongoose.model('Table', tableSchema);
