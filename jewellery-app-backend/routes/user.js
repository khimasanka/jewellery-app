const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
    }

    const token = jwt.sign({ username }, 'kavee');

    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
