const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  //table
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true
  },

  //order
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    required: true
  },
  // chef cook
  cooked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },

  // delivered by waiter
  served: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },

  status: {
    type: String,
    enum: ['ordered', 'cooking', 'ready', 'served', 'cancelled'],
    default: 'ordered'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
