const express = require('express');
const { User } = require('../../models');
const authenticateToken = require('../../middleware/auth');

const router = express.Router();

router.put('/:id',authenticateToken,  async (req, res) => {
  const userId = req.params.id;

  if (req.user.id !== userId) {
    return res.status(403).json({ message: 'Та зөвхөн өөрийнхөө мэдээллийг засах эрхтэй' });
  }

  try {
    const userId = req.params.id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
    }

    res.status(200).json({
      user: {
        ...updatedUser.toJSON(),
        password: undefined
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
