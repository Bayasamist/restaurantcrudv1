const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'incorrect password' });
    }

    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    

    res.status(200).json({ accessToken:  accessToken, user: {
      ...user.toJSON(),
      password: undefined
    } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
