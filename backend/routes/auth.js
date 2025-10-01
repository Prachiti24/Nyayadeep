const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware'); // Our custom auth middleware

// @route   POST /api/auth/register
// @desc    Register a new user
//create new user
router.post('/register', authController.registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
//login
router.post('/login', authController.loginUser);

// @route   GET /api/auth/me
// @desc    Get logged in user profile (protected)
router.get('/me', auth, authController.getMe);

module.exports = router;
