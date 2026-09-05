const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Wallet = require('../models/Wallet');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

// 1. BUYER CHECKOUT (หักเงิน Buyer -> Hold ไว้ที่ Order)
router.post('/checkout', auth, async (req, res) => {
  try {
    const { items, sellerId, totalAmount } = req.body;

    // เช็ค ยอดเงิน Buyer
    const buyerWallet = await Wallet.findOne({ userId: req.user.id });
    if (buyerWallet.balance < totalAmount) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    // หักเงิน Buyer
    buyerWallet.balance -= totalAmount;
    await buyerWallet.save();

    // สร้าง Order (สถานะเริ่มต้น PENDING_SHIPMENT)
    const order = new Order({
      buyerId: req.user.id,
      sellerId,
      items,
      totalAmount,
      status: 'PENDING_SHIPMENT'
    });
    await order.save();

    // บันทึกประวัติเงินออกของ Buyer
    await new Transaction({
      walletId: buyerWallet._id,
      type: 'PAYMENT',
      amount: totalAmount,
      referenceOrderId: order._id
    }).save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. SELLER SHIP (Seller ใส่เลขพัสดุจำลอง)
router.put('/:id/ship', auth, async (req, res) => {
  try {
    const { trackingNumber } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    order.trackingNumber = trackingNumber;
    order.status = 'SHIPPED';
    await order.save();

    res.json({ message: 'Order updated to SHIPPED', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. BUYER CONFIRM RECEIPT (Buyer ยืนยันรับสินค้า -> เงินโอนเข้า Wallet ของ Seller)
router.put('/:id/complete', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.buyerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    if (order.status === 'COMPLETED') {
      return res.status(400).json({ message: 'Order already completed' });
    }

    // อัปเดตสถานะ Order
    order.status = 'COMPLETED';
    await order.save();

    // โอนเงินเข้า Wallet ของ Seller
    const sellerWallet = await Wallet.findOne({ userId: order.sellerId });
    sellerWallet.balance += order.totalAmount;
    await sellerWallet.save();

    // บันทึกประวัติเงินเข้าของ Seller
    await new Transaction({
      walletId: sellerWallet._id,
      type: 'RECEIVE_PAYMENT',
      amount: order.totalAmount,
      referenceOrderId: order._id
    }).save();

    res.json({ message: 'Order completed and payment released to seller', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;