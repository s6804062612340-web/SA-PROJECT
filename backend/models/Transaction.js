const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  walletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet', required: true },
  type: { 
    type: String, 
    enum: ['TOPUP', 'PAYMENT', 'RECEIVE_PAYMENT', 'WITHDRAW'], 
    required: true 
  },
  amount: { type: Number, required: true },
  referenceOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);