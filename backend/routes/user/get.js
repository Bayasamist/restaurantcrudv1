const express = require('express');
const { User } = require('../../models');
const authenticateToken = require('../../middleware/auth');

const router = express.Router();

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'Та зөвхөн өөрийн мэдээллийг л үзэх боломжтой' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
