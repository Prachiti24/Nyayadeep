const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/authMiddleware'); // Our custom auth middleware

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', authController.registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', authController.loginUser);

// @route   GET /api/auth/me
// @desc    Get logged in user profile (protected)
router.get('/me', auth, authController.getMe);

module.exports = router;
