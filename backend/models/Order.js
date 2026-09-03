const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['PENDING_SHIPMENT', 'SHIPPED', 'COMPLETED', 'CANCELLED'], 
    default: 'PENDING_SHIPMENT' 
  },
  trackingNumber: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);