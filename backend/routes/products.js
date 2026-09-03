const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// 1. ดึงรายการสินค้าทั้งหมด (สำหรับหน้าแรก ให้ Buyer เลือกดู)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('sellerId', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// 2. เพิ่มสินค้าใหม่ (เฉพาะ Seller ที่ล็อกอินแล้วเท่านั้น)
router.post('/', auth, async (req, res) => {
  try {
    // เช็คว่า User ที่ส่ง Request มามี role เป็น SELLER หรือไม่
    if (req.user.role !== 'SELLER') {
      return res.status(403).json({ message: 'สิทธิ์ไม่ถูกต้อง: เฉพาะผู้ขายเท่านั้นที่ลงสินค้าได้' });
    }

    const { name, description, price, stock, imageUrl } = req.body;

    const product = new Product({
      sellerId: req.user.id,
      name,
      description,
      price,
      stock,
      imageUrl
    });

    await product.save();
    res.status(201).json({ message: 'ลงขายสินค้าสำเร็จ', product });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;