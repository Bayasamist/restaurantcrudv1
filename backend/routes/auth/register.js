const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log("resgirter")
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Username already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword, email: email });
    await newUser.save();

    const user = await User.findOne({ email });

    const accessToken = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ 
      accessToken: accessToken,
      user: {
        ...user.toJSON(),
        password: undefined
      }
     });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
