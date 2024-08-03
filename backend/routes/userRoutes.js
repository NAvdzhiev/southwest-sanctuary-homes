const express = require('express');
const {
	registerUser,
	loginUser,
	getUserProfile,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');
const {
	trimBody,
	registerValidation,
	validate,
} = require('../middleware/validation');
const router = express.Router();

// Register User
router.post(
	'/register',
	protect,
	admin,
	trimBody,
	registerValidation,
	validate,
	registerUser,
);

// Login User
router.post('/login', loginUser);

// Get User Profile
router.post('/proflie', protect, getUserProfile);

module.exports = router;
