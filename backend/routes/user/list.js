const express = require('express');
const { User } = require('../../models');
const authenticateToken = require('../../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      count: total,
      rows: users
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
