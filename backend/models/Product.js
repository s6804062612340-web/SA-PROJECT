const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  imageUrl: { type: String, default: 'https://via.placeholder.com/150' }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);