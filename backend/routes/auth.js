const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser.js");

// JWT Secret (use .env in production)
const JWT_SECRET = 'shhhhh';

// Route 1: Create a user
router.post('/createUser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('username', 'Enter a valid username').isLength({ min: 3 }),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    // Check if email or username already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ success: false, error: 'Email already exists' });

    user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).json({ success: false, error: 'Username already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user with additional fields
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      passwordHash: hashedPassword,
      telegramId: req.body.telegramId || null,
      xpTotal: 0,
      currentStreakDays: 0,
      longestStreakDays: 0,
      lastAccessedAt: Date.now()
    });

    // Generate JWT
    const data = { user: { id: newUser.id } };
    const authToken = jwt.sign(data, JWT_SECRET);

    res.json({ success: true, authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Route 2: Login
router.post('/login', [
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, error: 'Invalid credentials' });

    const passwordCompare = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCompare) return res.status(400).json({ success: false, error: 'Invalid credentials' });

    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, JWT_SECRET);

    res.json({ success: true, authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Route 3: Get logged-in user
router.post('/getUser', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-passwordHash");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
