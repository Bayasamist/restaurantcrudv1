const express = require('express');
const { Order } = require('../../models');
const authenticateToken = require('../../middleware/auth');
const router = express.Router();

// POST /api/orders - Create order
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const val = new Order(req.body);

    await val.save();
    res.status(200).json(val);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/orders/:id/cook - Mark as cooking
router.put('/:id/cook', authenticateToken, async (req, res) => {
  try {
    const val = await Order.findById(req.params.id);
    if (!val) return res.status(404).json({ message: 'Order not found' });

    val.status = 'cooking';
    val.cookedBy = req.user.id;
    await val.save();
    res.status(200).json(val);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/orders/:id/serve - Mark as served
router.put('/:id/serve', authenticateToken, async (req, res) => {
  try {
    const val = await Order.findById(req.params.id);
    if (!val) return res.status(404).json({ message: 'Order not found' });

    val.status = 'served';
    val.servedBy = req.user.id;
    await val.save();
    res.status(200).json(val);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders?status=ready - Get orders by status
router.get('/list', authenticateToken, async (req, res) => {
  try {
    let { currentPage = 1, pageSize = 10 } = req.query;

    currentPage = parseInt(currentPage);
    pageSize = parseInt(pageSize);

    const skip = (currentPage - 1) * pageSize;

    const totalCount = await Order.countDocuments();

    const items = await Order
    .find()
    .populate('table')
    .populate('menu')
    .populate('served')
    .populate('cooked')
    .skip(skip)
    .limit(pageSize);

    res.status(200).json({
      rows: items,
      count: totalCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const val = await Order.findById(req.params.id)
      .populate('table')
      .populate('menu')
      .populate('cooked')
      .populate('served');

    if (!val) return res.status(404).json({ message: 'Not found' });

    res.status(200).json(val);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// PUT /api/orders/:id - Update order
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const val = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('table')
      .populate('menu')
      .populate('cooked')
      .populate('served');

    if (!val) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(val);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
