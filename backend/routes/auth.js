const express = require('express');
const authController = require('../controllers/authController')
const router = express.Router();
router.post('/verifySignupEmailOTP', authController.verifyOtp);

router.post('/register', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/getUser', authController.protect, authController.getUserData);


module.exports = router;