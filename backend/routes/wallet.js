const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

// ดูข้อมูล Wallet และยอดเงินของตัวเอง
router.get('/me', auth, async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.id });
    const transactions = await Transaction.find({ walletId: wallet._id }).sort({ createdAt: -1 });
    res.json({ wallet, transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// เติมเงินจำลอง (Mock Top-up) สำหรับ Buyer
router.post('/topup', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: 'Amount must be greater than 0' });

    const wallet = await Wallet.findOne({ userId: req.user.id });
    wallet.balance += amount;
    await wallet.save();

    // บันทึกประวัติการเติมเงิน
    const transaction = new Transaction({
      walletId: wallet._id,
      type: 'TOPUP',
      amount
    });
    await transaction.save();

    res.json({ message: 'Top-up successful', balance: wallet.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;