const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

// 1. สมัครสมาชิก (Register) -> สร้าง Wallet อัตโนมัติ
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email นี้ถูกใช้งานในระบบแล้ว' });

    // เข้ารหัส Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // บันทึก User
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'BUYER'
    });
    await user.save();

    // สร้าง Wallet ผูกกับ User คนนี้ทันที (ยอดเงินเริ่มต้น 0 บาท)
    const wallet = new Wallet({ userId: user._id, balance: 0 });
    await wallet.save();

    res.status(201).json({ message: 'สมัครสมาชิกและสร้าง Wallet สำเร็จ' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// 2. เข้าสู่ระบบ (Login)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email หรือ Password ไม่ถูกต้อง' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Email หรือ Password ไม่ถูกต้อง' });

    // สร้าง JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;