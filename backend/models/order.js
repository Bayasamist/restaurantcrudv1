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

  // waiter
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // chef cook
  cookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // delivered by waiter
  servedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  status: {
    type: String,
    enum: ['ordered', 'cooking', 'ready', 'served', 'cancelled'],
    default: 'ordered'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
